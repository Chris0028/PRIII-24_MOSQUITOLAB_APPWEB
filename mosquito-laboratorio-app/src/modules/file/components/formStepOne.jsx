import { useSelector, useDispatch } from 'react-redux';
import { Form, DatePicker, FlexboxGrid, InputPicker } from 'rsuite';
import { FormControl, FormGroup } from '../hooks/useForms';
import { useFetchMunicipalities, useFetchStates } from '../repositories/locationRepository';
import { caseOptions, subSectorOptions } from '../utils/pickerOptions';
import { createHandleDateChange, createHandleInputChange } from '../utils/stepOneUtil'; // Asegúrate de usar la ruta correcta
import { useFetchHospitals, useFetchNetworks } from '../repositories/hospitalRepository';

// Función para convertir la fecha almacenada (string) a un objeto Date
const parseDate = (dateString) => {
  return dateString ? new Date(dateString) : null;
};

export default function FormStepOne() {
  // Uso de REDUX
  const dispatch = useDispatch();
  // Obtener los datos del estado de Redux
  const formData = useSelector((state) => state.file.stepOne);

  // Crear las funciones para manejar los cambios utilizando la utilidad
  const handleDateChange = createHandleDateChange(dispatch);
  const handleInputChange = createHandleInputChange(dispatch);

  const municipalities = useFetchMunicipalities();
  const states = useFetchStates();
  const hospitals = useFetchHospitals();
  const networks = useFetchNetworks();

  const userSelector = useSelector((state) => state.user);

  const userInfo = userSelector.user;
  console.log(userInfo)


  return (
    <Form fluid>
      <FlexboxGrid justify="space-between">
        <FlexboxGrid.Item colspan={11}>
          <FormGroup>
            <Form.ControlLabel>Establecimiento de Salud Notificante *</Form.ControlLabel>
            <InputPicker
              name="healthEstablishment"
              value={formData.healthEstablishment || [] } // Carga los datos actuales o cadena vacía
              onChange={(value) => handleInputChange('healthEstablishment', value)}
              placeholder="Seleccione el establecimiento"
              block
              size="lg"
              style={{ width: '100%' }}
              data={ hospitals || []}
            />
          </FormGroup>
          <FormGroup>
            <Form.ControlLabel>Municipio *</Form.ControlLabel>
            <InputPicker
              name="municipality"
              value={formData.municipality || ''} // Carga los datos actuales o cadena vacía
              onChange={(value) => handleInputChange('municipality', value)}
              placeholder="Seleccione el municipio"
              block
              size="lg"
              style={{ width: '100%' }}
              data={municipalities || []}
            />
          </FormGroup>
          <FormGroup>
            <Form.ControlLabel>Red de Salud *</Form.ControlLabel>
            <InputPicker
              name="healthNetwork"
              value={formData.healthNetwork || ''} // Carga los datos actuales o cadena vacía
              onChange={(value) => handleInputChange('healthNetwork', value)}
              placeholder="Seleccione la red de salud"
              block
              size="lg"
              style={{ width: '100%' }}
              data={ networks || []} // Asegúrate de tener las opciones disponibles
            />
          </FormGroup>
          <FormGroup>
            <Form.ControlLabel>Fecha de Notificación *</Form.ControlLabel>
            <DatePicker
              name="notificationDate"
              value={parseDate(formData.notificationDate)} // Convierte la cadena almacenada en un objeto Date
              onChange={(value) => handleDateChange('notificationDate', value)}
              style={{ width: '100%' }}
            />
          </FormGroup>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={11}>
          <FormGroup>
            <Form.ControlLabel>Departamento *</Form.ControlLabel>
            <InputPicker
              name="department"
              value={formData.department || ''} // Carga los datos actuales o cadena vacía
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
              value={formData.subsector || ''} // Carga los datos actuales o cadena vacía
              onChange={(value) => handleInputChange('subsector', value)}
              placeholder="Seleccione el subsector"
              block
              size="lg"
              style={{ width: '100%' }}
              data={subSectorOptions || []}
            />
          </FormGroup>
          <FormGroup>
            <Form.ControlLabel>Cómo se Descubrió el Caso *</Form.ControlLabel>
            <InputPicker
              name="discoveryMethod"
              value={formData.discoveryMethod || ''} // Carga los datos actuales o cadena vacía
              onChange={(value) => handleInputChange('discoveryMethod', value)}
              placeholder="Seleccione el método"
              block
              size="lg"
              style={{ width: '100%' }}
              data={caseOptions || []}
            />
          </FormGroup>
          <FormGroup>
            <Form.ControlLabel>Teléfono o Correo Electrónico del Establecimiento *</Form.ControlLabel>
            <FormControl
              name="contactInfo"
              value={formData.contactInfo || ''} // Carga los datos actuales o cadena vacía
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
