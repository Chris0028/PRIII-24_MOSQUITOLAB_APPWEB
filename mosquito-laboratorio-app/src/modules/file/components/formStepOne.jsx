import { useSelector, useDispatch } from 'react-redux';
import { Form, DatePicker, FlexboxGrid, InputPicker } from 'rsuite';
import { FormControl, FormGroup } from '../hooks/useForms';
import { caseOptions } from '../utils/pickerOptions';
import { createHandleInputChange } from '../utils/stepOneUtil';

export default function FormStepOne() {
  const dispatch = useDispatch();
  
  const formData = useSelector((state) => state.file.stepOne);
  
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
              value={userInfo.info.hospital || [] } 
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
              value={userInfo.info.municipality} 
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
              value={userInfo.info.hospitalNetwork || [] } 
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
              value={ new Date } 
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
              value={ userInfo.info.state } 
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
              value={'Publico'} 
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
              value={formData.discoveryMethod || ''} 
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
              value={ userInfo.info.hospitalContact || 'No tiene numero o correo'} 
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
