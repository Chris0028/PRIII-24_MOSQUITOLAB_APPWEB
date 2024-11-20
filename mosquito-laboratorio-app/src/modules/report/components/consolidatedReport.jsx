import { DatePicker, FlexboxGrid, Form, SelectPicker, Button, InputGroup, IconButton, Modal, Divider } from 'rsuite';
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

export default function FilterReportForm() {
  const [hospital, setHospital] = useState([])
  const [reportData, setReportData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();



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
    // try {
    //   const response = await GetReportsListAsync(requestBody);
    //   console.log('Respuesta de la API:', response);

    //   // Verifica si response es un array o un objeto
    //   if (!Array.isArray(response)) {
    //     console.error('La respuesta de la API no es un array:', response);
    //   }

    //   // Guarda los datos en localStorage
    //   localStorage.setItem('reportData', JSON.stringify(response));

    //   // Redirige al usuario a la vista de descarga
    //   navigate('/download');
    // } catch (error) {
    //   console.error('Error al generar el reporte:', error);
    // }
    try {
      const response = await GetReportsListAsync(requestBody);
      console.log('Respuesta de la API:', response);
      setReportData(response);
      setShowModal(true); // Mostrar el modal después de generar el reporte
    } catch (error) {
      console.error('Error al generar el reporte:', error);
    }
  };

  const handleExportToExcel = () => {
    exportToExcel(reportData, 'Reporte_Consolidado');
    setShowModal(false); // Cerrar el modal después de la exportación
  };

  const handleExportToCSV = () => {
    exportToCSV(reportData, 'Reporte_Consolidado');
    setShowModal(false); // Cerrar el modal después de la exportación
  };

  async function fetchHospital() {
    const data = await getNamesNIdsOfHospitals();
    setHospital(data);
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1300px', margin: '0 auto' }}>
      <h3 style={{ fontWeight: 'bold', color: '#1B3A61', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>FILTROS PARA UN REPORTE CONSOLIDADO</h3>

      <Form fluid>
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
          <Button appearance="primary" size="lg" onClick={generateReport}>
            <FaPlus style={{ marginRight: 10 }} /> Generar Reporte
          </Button>

          <Modal open={showModal} onClose={() => setShowModal(false)} size="xs">
            <Modal.Header>
              <Modal.Title>Exportar Reporte</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Seleccione el formato para exportar el reporte consolidado.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleExportToExcel} color="green">Exportar a Excel</Button>
              <Button onClick={handleExportToCSV} color="blue">Exportar a CSV</Button>
              <Button onClick={() => setShowModal(false)} appearance="subtle">Cancelar</Button>
            </Modal.Footer>
          </Modal>
        </FlexboxGridItem>
      </FlexboxGrid>

    </div>
  );
}
