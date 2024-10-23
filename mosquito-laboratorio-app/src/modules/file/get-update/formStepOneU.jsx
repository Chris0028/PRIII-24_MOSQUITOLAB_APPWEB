import { useState, useEffect } from '../hooks/useReacts';
import { Form, DatePicker, FlexboxGrid, InputPicker } from 'rsuite';
import { FormControl, FormGroup } from '../hooks/useForms';
import { useFetchMunicipalities, useFetchStates } from '../repositories/locationRepository';
import { caseOptions, subSectorOptions, healthStablishmentOptions } from '../utils/pickerOptions';
import { UpdateFile } from '../services/GetUpdateFile'; //
import { fetchFileById } from '../../../redux/updateFileSlice';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createHandleInputChange } from '../utils/stepOneUtil';

// Función para convertir la fecha almacenada (string) a un objeto Date
const parseDate = (dateString) => {
  return dateString ? new Date(dateString) : null;
};

export default function formStepOneU() {
  //GET-UPDATE
  const { fileID } = useParams();
  const dispatch = useDispatch();
  const { file, loading, error } = useSelector((state) => state.updateFile);
  //
  const municipalities = useFetchMunicipalities();
  const states = useFetchStates();
  const handleInputChange = createHandleInputChange(dispatch);

  useEffect(() => {
    if (fileID) {
      dispatch(fetchFileById(fileID)); // Llama al thunk para obtener los datos del archivo
    }
  }, [dispatch, fileID]);
  
  
  // Manejar la acción del botón para enviar la ficha epidemiológica
  const handleSave = async () => {
    try {
      await UpdateFile(formData);
      alert('Ficha epidemiológica enviada exitosamente.');
    } catch (error) {
      console.error('Error al enviar la ficha epidemiológica:', error);
      alert('Ocurrió un error al enviar la ficha epidemiológica. Inténtelo de nuevo.');
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los datos: {error}</p>;
  return (
    <Form fluid>
      <FlexboxGrid justify="space-between">
        <FlexboxGrid.Item colspan={11}>
          <FormGroup>
            <Form.ControlLabel>Establecimiento de Salud Notificante *</Form.ControlLabel>
            <InputPicker
              name="hospitalName"
              defaultValue={file?.hospitalName || ''} // Carga los datos actuales o cadena vacía
              onChange={(value) => handleInputChange('hospitalName', value)}
              placeholder="Seleccione el establecimiento"
              block
              size="lg"
              style={{ width: '100%' }}
              data={healthStablishmentOptions || []}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Form.ControlLabel>Municipio *</Form.ControlLabel>
            <InputPicker
              name="municipality"
              defaultValue={fileU.municipalityName || ''} // Carga los datos actuales o cadena vacía
              onChange={(value) => handleInputChange('municipality', value)}
              placeholder="Seleccione el municipio"
              block
              size="lg"
              style={{ width: '100%' }}
              data={municipalities || []}
            />
          </FormGroup>
          <FormGroup>
            <Form.ControlLabel>Fecha de Notificación *</Form.ControlLabel>
            <DatePicker
              name="notificationDate"
              defaultValue={parseDate(fileU.patientRegisterDate)} // Convierte la cadena almacenada en un objeto Date
              onChange={(value) => handleDateChange('notificationDate', value)}
              style={{ width: '100%' }}
            />
          </FormGroup>
          <FormGroup>
            <Form.ControlLabel>Cómo se Descubrió el Caso *</Form.ControlLabel>
            <InputPicker
              name="discoveryMethod"
              value={fileU.discoveryMethod || ''} // Carga los datos actuales o cadena vacía
              onChange={(value) => handleInputChange('discoveryMethod', value)}
              placeholder="Seleccione el método"
              block
              size="lg"
              style={{ width: '100%' }}
              data={caseOptions || []}
              defaultValue
            />
          </FormGroup>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={11}>
          <FormGroup>
            <Form.ControlLabel>Departamento *</Form.ControlLabel>
            <InputPicker
              name="department"
              value={fileU.stateName || ''} // Carga los datos actuales o cadena vacía
              onChange={(value) => handleInputChange('department', value)}
              placeholder="Seleccione el departamento"
              block
              size="lg"
              style={{ width: '100%' }}
              data={states || []}
            />
          </FormGroup>
          <FormGroup>
            <Form.ControlLabel>Subsector *</Form.ControlLabel>
            <InputPicker
              name="subsector"
              value={fileU.typeHospital || ''} // Carga los datos actuales o cadena vacía
              onChange={(value) => handleInputChange('subsector', value)}
              placeholder="Seleccione el subsector"
              block
              size="lg"
              style={{ width: '100%' }}
              data={subSectorOptions || []}
            />
          </FormGroup>
          <FormGroup>
            <Form.ControlLabel>Teléfono o Correo Electrónico del Establecimiento *</Form.ControlLabel>
            <FormControl
              name="contactInfo"
              defaultValue={fileU.hospitalContact || 'No tiene número o correo'} // Carga los datos actuales o cadena vacía
              onChange={(value) => handleInputChange('contactInfo', value)}
              type="text"
              placeholder="Ingrese teléfono o correo electrónico"
              style={{ width: '100%' }}
            />
          </FormGroup>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Form>
  );
};
