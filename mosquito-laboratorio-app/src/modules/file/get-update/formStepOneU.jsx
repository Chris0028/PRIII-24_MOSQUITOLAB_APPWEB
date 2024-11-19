import { useEffect } from '../hooks/useReacts';
import { Form, DatePicker, FlexboxGrid, InputPicker } from 'rsuite';
import { FormControl, FormGroup } from '../hooks/useForms';
import { caseOptions } from '../utils/pickerOptions';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetFileDetails } from '../services/getUpdateFile';
import { updateStepOne } from '../../../redux/formStepsSlice';
import { mapPayloadToSteps } from '../utils/mapPayLoadToSteps';

export default function formStepOneU() {
  //GET-UPDATE
  const { fileID } = useParams();
  // Uso de REDUX
  const dispatch = useDispatch();

  // Obtener los datos del estado de Redux
  const formData = useSelector((state) => state.formSteps.stepOne)
  console.log('Redux state formData:', formData);

  // Crear las funciones para manejar los cambios utilizando la utilidad
  //const handleInputChange = createHandleInputChange(dispatch);

  const userSelector = useSelector((state) => state.user);

  const userInfo = userSelector.user;


  //Cargado de datos
  useEffect(() => {
    const loadData = async () => {
      const data = await GetFileDetails(fileID);
      console.log("Full data from API:", data);
      if (data) {
        mapPayloadToSteps(dispatch, data);
      }
    };

    loadData();
  }, [fileID, dispatch]);

  const handleInputChange = (name, value) => {
    console.log("Actualizando discoveryMethod a:", value);
    dispatch(updateStepOne({ ...formData, [name]: value }));
  };

  return (
    <Form fluid>
      <FlexboxGrid justify="space-between">
        <FlexboxGrid.Item colspan={11}>
          <FormGroup>
            <Form.ControlLabel>Establecimiento de Salud Notificante *</Form.ControlLabel>
            <InputPicker
              name="healthEstablishment"
              value={userInfo?.info?.hospital || []} // Carga los datos actuales o cadena vacía
              placeholder="Seleccione el establecimiento"
              block
              size="lg"
              style={{ width: '100%' }}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Form.ControlLabel>Municipio *</Form.ControlLabel>
            <InputPicker
              name="municipality"
              value={userInfo?.info?.municipality} // Carga los datos actuales o cadena vacía
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
              value={userInfo?.info?.hospitalNetwork || []} // Carga los datos actuales o cadena vacía
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
              value={new Date} // Convierte la cadena almacenada en un objeto Date
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
              value={userInfo?.info?.state} // Carga los datos actuales o cadena vacía
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
              value={formData.discoveryMethod || ''}  // Usa `value` enlazado al estado
              onChange={(value) => handleInputChange('discoveryMethod', value)}  // Sincroniza con Redux
              placeholder="Seleccione el método"
              block
              size="lg"
              style={{ width: '100%' }}
              data={caseOptions.map(c => ({ label: c.label, value: c.value }))}
            />
          </FormGroup>
          <FormGroup>
            <Form.ControlLabel>Teléfono o Correo Electrónico del Establecimiento *</Form.ControlLabel>
            <FormControl
              name="contactInfo"
              value={userInfo?.info?.hospitalContact || 'No tiene número o correo'} // Carga los datos actuales o cadena vacía
              type="text"
              placeholder="Ingrese teléfono o correo electrónico"
              style={{ width: '100%' }}
              disabled
            />
          </FormGroup>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={11}>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Form>
  );
};
