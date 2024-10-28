import { useEffect } from '../hooks/useReacts';
import { Form, DatePicker, FlexboxGrid, InputPicker } from 'rsuite';
import { FormControl, FormGroup } from '../hooks/useForms';
import { caseOptions } from '../utils/pickerOptions';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createHandleInputChange } from '../utils/stepOneUtil';
import { GetFileDetails } from '../services/GetUpdateFile';
import { setUpdateFile } from '../../../redux/updateFileSlice';
import { updateStepOne } from '../../../redux/fileSlice';
import { useState } from 'react';

export default function formStepOneU() {
  //GET-UPDATE
  const { fileID } = useParams();
  //const [ stepOne, setStepOne ] = useState({ discoveryMethod: '' })
  // Inicializar el dispatch de Redux y obtener datos del estado
  const dispatch = useDispatch();
  //const { loading, error } = useSelector((state) => state.updateFile);
  //const handleInputChange = createHandleInputChange(dispatch);

  const userSelector = useSelector((state) => state.user);
  const fileSelector = useSelector((state) => state.updateFile); //
  const userInfo = userSelector.user;
  
  //hacer una peticion a la api para traer todos los discoveryMethod
  //Cargado de datos
  useEffect(() => {
    const getFile = async () => {
      if (!fileSelector.file) {  // Solo carga los datos si el estado está vacío
        const data = await GetFileDetails(fileID);
        dispatch(setUpdateFile(data));
      }
    };
    getFile();
  }, [fileID]);

  const handleInputChange = (name, value) => {
    dispatch(updateStepOne({ [name]: value }));  // Actualiza Redux con los cambios
  };

  return (
    <Form fluid>
      <FlexboxGrid justify="space-between">
        <FlexboxGrid.Item colspan={11}>
          <FormGroup>
            <Form.ControlLabel>Establecimiento de Salud Notificante *</Form.ControlLabel>
            <InputPicker
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
            <InputPicker
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
              value={ fileSelector?.file?.discoveryMethod }
              onChange={(value) => {
                handleChange(value, 'discoveryMethod') 
              }}
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
              value={ userInfo.info.hospitalContact || 'No tiene número o correo'} // Carga los datos actuales o cadena vacía
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
