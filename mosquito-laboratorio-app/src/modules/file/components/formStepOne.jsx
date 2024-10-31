import { useSelector, useDispatch } from 'react-redux';
import { Form, DatePicker, FlexboxGrid, InputPicker } from 'rsuite';
import { FormControl, FormGroup } from '../hooks/useForms';
import { caseOptions } from '../utils/pickerOptions';
import { createHandleInputChange } from '../utils/stepOneUtil'; // Asegúrate de usar la ruta correcta

export default function FormStepOne() {
  // Uso de REDUX
  const dispatch = useDispatch();
  
  // Obtener los datos del estado de Redux
  const formData = useSelector((state) => state.file.stepOne);

  // Crear las funciones para manejar los cambios utilizando la utilidad
  const handleInputChange = createHandleInputChange(dispatch);

  const userSelector = useSelector((state) => state.user);

  const userInfo = userSelector.user;
  console.log(userInfo)

  return (
    <Form fluid>
      <FlexboxGrid justify="space-between">
        <FlexboxGrid.Item colspan={11}>
          <FormGroup>
            <Form.ControlLabel>Establecimiento de Salud Notificante *</Form.ControlLabel>
            <FormControl
              name="healthEstablishment"
              value={userInfo.info.hospital || [] } // Carga los datos actuales o cadena vacía
              placeholder="Seleccione el establecimiento"
              block
              size="lg"
              style={{ width: '100%' }}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Form.ControlLabel>Municipio *</Form.ControlLabel>
            <FormControl
              name="municipality"
              value={userInfo.info.municipality} // Carga los datos actuales o cadena vacía
              placeholder="Seleccione el municipio"
              block
              size="lg"
              style={{ width: '100%' }}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Form.ControlLabel>Red de Salud *</Form.ControlLabel>
            <FormControl
              name="healthNetwork"
              value={userInfo.info.hospitalNetwork || [] } // Carga los datos actuales o cadena vacía
              placeholder="Seleccione la red de salud"
              block
              size="lg"
              style={{ width: '100%' }}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Form.ControlLabel>Fecha de Notificación *</Form.ControlLabel>
            <DatePicker
              name="notificationDate"
              value={ new Date } // Convierte la cadena almacenada en un objeto Date
              style={{ width: '100%' }}
              disabled
            />
          </FormGroup>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={11}>
          <FormGroup>
            <Form.ControlLabel>Departamento *</Form.ControlLabel>
            <FormControl
              name="department"
              value={ userInfo.info.state } // Carga los datos actuales o cadena vacía
              placeholder="Seleccione el departamento"
              block
              size="lg"
              style={{ width: '100%' }}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Form.ControlLabel>Subsector *</Form.ControlLabel>
            <FormControl
              name="subsector"
              value={'Publico'} // Carga los datos actuales o cadena vacía
              placeholder="Seleccione el subsector"
              block
              size="lg"
              style={{ width: '100%' }}
              disabled
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
              value={ userInfo.info.hospitalContact || 'No tiene numero o correo'} // Carga los datos actuales o No tiene numero o correo
              type="text"
              placeholder="Ingrese teléfono o correo electrónico"
              style={{ width: '100%' }}
              disabled
            />
          </FormGroup>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Form>
  );
};
