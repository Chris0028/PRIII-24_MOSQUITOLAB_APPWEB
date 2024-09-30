import { React } from '../hooks/useReacts';
import { Form, DatePicker, FlexboxGrid, InputPicker } from 'rsuite';
import { FormControl, FormGroup} from '../hooks/useForms';
import { useFetchMunicipalities, useFetchStates } from '../repositories/locationRepository';
import { caseOptions, subSectorOptions, healthStablishmentOptions } from '../utils/pickerOptions';
import { useSelector, useDispatch } from 'react-redux';
import { updateStepOne } from '../../../redux/fileSlice';

export default function FormStepOne() {
  //Uso de REDUX
  const dispatch = useDispatch();
  // Obtener los datos del estado de Redux
  const formData = useSelector((state) => state.file.stepOne);

  const municipalities = useFetchMunicipalities();
  const states = useFetchStates();

  // Manejar el cambio en los campos del formulario
  const handleChange = (value, name) => {
    // Asegúrate de que estás despachando la acción con los datos correctos
    dispatch(updateStepOne({ [name]: value }));
  };
  

  return (
    <Form fluid>
      <FlexboxGrid justify="space-between">
        <FlexboxGrid.Item colspan={11}>
          <FormGroup>
            <Form.ControlLabel>Establecimiento de Salud Notificante *</Form.ControlLabel>
            <InputPicker
              name="healthEstablishment"
              value={formData.healthEstablishment} // Carga los datos actuales
              onChange={(value) => handleChange(value, 'healthEstablishment')}
              placeholder="Seleccione el establecimiento"
              block
              size="lg"
              style={{ width: '100%' }}
              data={healthStablishmentOptions || []}
            />
          </FormGroup>
          <FormGroup>
            <Form.ControlLabel>Municipio *</Form.ControlLabel>
            <InputPicker
              name="municipality"
              value={formData.municipality} // Carga los datos actuales
              onChange={(value) => handleChange(value, 'municipality')}
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
              value={formData.notificationDate} // Carga los datos actuales
              onChange={(value) => handleChange(value, 'notificationDate')}
              style={{ width: '100%' }}
            />
          </FormGroup>
          <FormGroup>
            <Form.ControlLabel>Cómo se Descubrió el Caso *</Form.ControlLabel>
            <InputPicker
              name="discoveryMethod"
              value={formData.discoveryMethod} // Carga los datos actuales
              onChange={(value) => handleChange(value, 'discoveryMethod')}
              placeholder="Seleccione el método"
              block
              size="lg"
              style={{ width: '100%' }}
              data={caseOptions || []}
            />
          </FormGroup>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={11}>
          <FormGroup>
            <Form.ControlLabel>Departamento *</Form.ControlLabel>
            <InputPicker
              name="department"
              value={formData.department} // Carga los datos actuales
              onChange={(value) => handleChange(value, 'department')}
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
              value={formData.subsector} // Carga los datos actuales
              onChange={(value) => handleChange(value, 'subsector')}
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
              value={formData.contactInfo} // Carga los datos actuales
              onChange={(value) => handleChange(value, 'contactInfo')}
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