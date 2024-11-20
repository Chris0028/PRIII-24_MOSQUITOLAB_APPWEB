import { DatePicker, FlexboxGrid, Form, SelectPicker, Button, InputGroup, toaster, Message, Schema } from 'rsuite';
import FormGroup from 'rsuite/esm/FormGroup';
import { GetReportsListAsync } from '../services/reportServicie';
import { FaPlus } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { diagnosticMethodOptions, networkOptions, subSectorOptions, caseStatusOptions } from '../utils/pickerOptions';
import { getNamesNIdsOfHospitals } from '../../file/services/hospitalService';
import FormControl from 'rsuite/esm/FormControl';
import { useNavigate } from 'react-router-dom';
import { exportToExcel, exportToCSV } from '../../download/service/exportService';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import { regexAll } from '../../../utils/validator';

export default function FilterReportForm() {
  const [hospital, setHospital] = useState([])
  const [reportData, setReportData] = useState([]);
  const navigate = useNavigate();

  //Validation
  const [formValue, setFormValue] = useState({});
  const [formError, setFormError] = useState({});

  const { StringType } = Schema.Types;
  const model = Schema.Model({
    department: StringType()
      .pattern(regexAll, 'El departamento solo puede tener letras y numeros'),
    municipality: StringType()
      .pattern(regexAll, 'El municipio solo puede tener letras y numeros')
  });

  const disableFutureDates = (date) => {
    return date > new Date(); // Deshabilita las fechas futuras
  };

  const [filters, setFilters] = useState({
    notificationStartDate: null,
    notificationEndDate: null,
    symptomStartDate: null,
    symptomEndDate: null,
    labResultStartDate: null,
    labResultEndDate: null,
    caseStatus: null,
    diagnosticMethod: null,
    department: null,
    network: null,
    municipality: null,
    facility: null,
    subsector: null,
  });

  useEffect(() => {
    fetchHospital();

  }, []);

  const handleFilterChange = (name, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const generateReport = async () => {
    // Verificar si los filtros están vacíos
    const areFiltersEmpty = Object.values(filters).every(value => value === null || value === '' || value === undefined);

    if (areFiltersEmpty) {
      // Mostrar un mensaje de advertencia usando toaster
      toaster.push(
        <Message type="error" header="Campos Vacíos" closable showIcon>
          <p>Debe completar al menos un campo antes de generar el reporte.</p>
        </Message>,
        { placement: 'topCenter' }
      );
      return; // Detener la ejecución si los filtros están vacíos
    }
    const requestBody = {
      NotificationDateFrom: filters.notificationStartDate,
      NotificationDateTo: filters.notificationEndDate,
      SymptomsDateFrom: filters.symptomStartDate,
      SymptomsDateTo: filters.symptomEndDate,
      ResultDateFrom: filters.labResultStartDate,
      ResultDateTo: filters.labResultEndDate,
      CaseStatus: filters.caseStatus,
      DiagnosticMethod: filters.diagnosticMethod,
      Department: filters.department,
      HealthNetwork: filters.network,
      Municipality: filters.municipality,
      Establishment: filters.facility,
      Subsector: filters.subsector,
    };
    try {
      const response = await GetReportsListAsync(requestBody);

      if (!Array.isArray(response)) {
        console.error("La respuesta de la API no es una matriz válida:", response);
        return;
      }
      // Contador basado en la cantidad de reportes existentes en la tabla
      const reportCount = JSON.parse(localStorage.getItem('reports'))?.length || 0;
      const newFileName = `fichas-LABORATORIO-${String(reportCount + 1).padStart(2, "0")}`;

      const now = new Date();
      const formattedDate = now.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      const formattedTime = now.toLocaleTimeString('es-ES', { hour12: false });

      const newReport = {
        fileName: newFileName,
        reportType: 'excel-consolidado',
        filters: '-',
        level: 'LABORATORIO',
        creationDate: `${formattedDate} - ${formattedTime}`,
        data: response || [],// Incluye los datos para descarga
      };

      // Guardar el nuevo reporte en el localStorage para persistencia
      const existingReports = JSON.parse(localStorage.getItem('reports')) || [];
      localStorage.setItem('reports', JSON.stringify([...existingReports, newReport]));

      // Navegar a la vista Download y pasar el nuevo reporte
      navigate('/download', {
        state: {
          newReport,
          warningMessage: 'Cuando usted cierre su sesión los reportes generados se perderan de la tabla de descargas.',
        },
      });
    } catch (error) {
      console.error('Error al generar el reporte:', error);
    }
  };

  async function fetchHospital() {
    const data = await getNamesNIdsOfHospitals();
    setHospital(data);
  }

  const handleFormSubmit = () => {
    // Valida el formulario antes de enviar
    if (Object.keys(formError).length === 0) {
      generateReport(); // Realiza el filtro solo si no hay errores
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1300px', margin: '0 auto' }}>
      <h3 style={{ fontWeight: 'bold', color: '#1B3A61', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>FILTROS PARA UN REPORTE CONSOLIDADO</h3>

      <Form fluid model={model} formValue={formValue} onChange={setFormValue} onCheck={setFormError} >
        <FlexboxGrid justify="space-between">
          <FlexboxGrid.Item colspan={11} style={{ marginTop: 20, marginBottom: 20 }}>
            <FormGroup>
              <Form.ControlLabel>Fecha de Notificación - <strong>Desde</strong></Form.ControlLabel>
              <InputGroup inside style={{ width: '100%' }}>
                <DatePicker
                  name="notificationStartDate"
                  format="yy/MM/dd"
                  block
                  placeholder="yyyy-MM-dd"
                  style={{ width: '100%' }}
                  onChange={(value) => handleFilterChange('notificationStartDate', value)}
                  disabledDate={disableFutureDates}
                />
              </InputGroup>
            </FormGroup>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={11} style={{ marginTop: 20, marginBottom: 20 }}>
            <FormGroup>
              <Form.ControlLabel>Fecha de Notificación - <strong>Hasta</strong></Form.ControlLabel>
              <InputGroup inside style={{ width: '100%' }}>
                <DatePicker
                  name="notificationEndDate"
                  format="yy/MM/dd"
                  block
                  placeholder="yyyy-MM-dd"
                  style={{ width: '100%' }}
                  onChange={(value) => handleFilterChange('notificationEndDate', value)}
                  disabledDate={disableFutureDates}
                />

              </InputGroup>
            </FormGroup>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={11} style={{ marginBottom: 20 }}>
            <FormGroup>
              <Form.ControlLabel>Fecha de Inicio De Síntomas - <strong>Desde</strong></Form.ControlLabel>
              <InputGroup inside style={{ width: '100%' }}>
                <DatePicker
                  name="symptomStartDate"
                  format="yy/MM/dd"
                  block
                  placeholder="yyyy-MM-dd"
                  style={{ width: '100%' }}
                  onChange={(value) => handleFilterChange('symptomStartDate', value)}
                  disabledDate={disableFutureDates}
                />

              </InputGroup>
            </FormGroup>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={11} style={{ marginBottom: 20 }}>
            <FormGroup>
              <Form.ControlLabel>Fecha de Inicio De Síntomas - <strong>Hasta</strong> </Form.ControlLabel>
              <InputGroup inside style={{ width: '100%' }}>
                <DatePicker
                  name="symptomEndDate"
                  format="yy/MM/dd"
                  block
                  placeholder="yyyy-MM-dd"
                  style={{ width: '100%' }}
                  onChange={(value) => handleFilterChange('symptomEndDate', value)}
                  disabledDate={disableFutureDates}
                />

              </InputGroup>
            </FormGroup>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={11} style={{ marginBottom: 20 }}>
            <FormGroup>
              <Form.ControlLabel>Fecha de Resultado Laboratorio - <strong>Desde</strong> </Form.ControlLabel>
              <InputGroup inside style={{ width: '100%' }}>
                <DatePicker
                  name="labResultStartDate"
                  format="yy/MM/dd"
                  block
                  placeholder="yyyy-MM-dd"
                  style={{ width: '100%' }}
                  onChange={(value) => handleFilterChange('labResultStartDate', value)}
                  disabledDate={disableFutureDates}
                />

              </InputGroup>
            </FormGroup>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={11} style={{ marginBottom: 20 }}>
            <FormGroup>
              <Form.ControlLabel>Fecha de Resultado Laboratorio - <strong>Hasta</strong> </Form.ControlLabel>
              <InputGroup inside style={{ width: '100%' }}>
                <DatePicker
                  name="labResultEndDate"
                  format="yy/MM/dd"
                  block
                  placeholder="yyyy-MM-dd"
                  style={{ width: '100%' }}
                  onChange={(value) => handleFilterChange('labResultEndDate', value)}
                  disabledDate={disableFutureDates}
                />

              </InputGroup>
            </FormGroup>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={11} style={{ marginBottom: 20 }}>
            <FormGroup>
              <Form.ControlLabel>Estado del caso</Form.ControlLabel>
              <SelectPicker
                name="caseStatus"
                block
                placeholder="Seleccione el estado"
                data={caseStatusOptions.map(c => ({ label: c.label, value: c.value }))}
                onChange={(value) => handleFilterChange('caseStatus', value)}
                labelKey="label"
                valueKey="value"
              />
            </FormGroup>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={11} style={{ marginBottom: 20 }}>

          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={11} style={{ marginBottom: 20 }}>
            <FormGroup>
              <Form.ControlLabel>Método diagnóstico</Form.ControlLabel>
              <SelectPicker
                name="diagnosticMethod"
                block
                placeholder="Seleccione el método"
                data={diagnosticMethodOptions.map(c => ({ label: c.label, value: c.value }))}
                onChange={(value) => handleFilterChange('diagnosticMethod', value)}
                labelKey="label"
                valueKey="value"
              />
            </FormGroup>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={11} style={{ marginBottom: 20 }}>
            <FormGroup>
              <Form.ControlLabel>Departamento</Form.ControlLabel>
              <FormControl
                name="department"
                block
                placeholder="Seleccione el departamento"
                onChange={(value) => handleFilterChange('department', value)}

              />
            </FormGroup>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={11} style={{ marginBottom: 20 }}>
            <FormGroup>
              <Form.ControlLabel>Red</Form.ControlLabel>
              <SelectPicker
                name="network"
                block
                placeholder="Seleccione la red"
                data={networkOptions || []}
                onChange={(value) => handleFilterChange('network', value)}
                labelKey="label"
                valueKey="value"
              />
            </FormGroup>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={11} style={{ marginBottom: 20 }}>
            <FormGroup>
              <Form.ControlLabel>Municipio</Form.ControlLabel>
              <FormControl
                name="municipality"
                block
                placeholder="Seleccione el municipio"
                onChange={(value) => handleFilterChange('municipality', value)}
              />
            </FormGroup>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={11} style={{ marginBottom: 20 }}>
            <FormGroup>
              <Form.ControlLabel>Establecimiento</Form.ControlLabel>
              <SelectPicker
                name="facility"
                block
                placeholder="Seleccione el establecimiento"
                data={hospital.map(d => ({ label: d.name, value: d.name }))}
                onChange={(value) => handleFilterChange('facility', value)}
                labelKey="label"
                valueKey="value"
              />
            </FormGroup>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={11} style={{ marginBottom: 20 }}>
            <FormGroup>
              <Form.ControlLabel>Subsector</Form.ControlLabel>
              <SelectPicker
                name="subsector"
                block
                placeholder="Seleccione el subsector"
                data={subSectorOptions.map(c => ({ label: c.label, value: c.value }))}
                onChange={(value) => handleFilterChange('subsector', value)}
                labelKey="label"
                valueKey="value"
              />
            </FormGroup>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Form>
      <FlexboxGrid justify='end'>
        <FlexboxGridItem>
          <Button appearance="primary" size="lg" onClick={handleFormSubmit}>
            <FaPlus style={{ marginRight: 10 }} /> Generar Reporte
          </Button>
        </FlexboxGridItem>
      </FlexboxGrid>

    </div>
  );
}
