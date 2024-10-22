import { useDispatch, useSelector } from 'react-redux';
import { Form, DatePicker, FlexboxGrid, RadioGroup, Radio, Panel, InputPicker } from 'rsuite';
import { FormControl, FormGroup } from '../hooks/useForms';
import { medicalDischargeOptions } from '../utils/pickerOptions';
import {
  createHandleRadioChange,
  createHandleDateChange,
  createHandleInputChange,
  createHandlePickerChange
} from '../utils/stepFiveUtil'; // Asegúrate de usar la ruta correcta
import { UpdateFile } from '../services/GetUpdateFile'; //
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const parseDate = (dateString) => {
    return dateString ? new Date(dateString) : null;
  };
  
  export default function FormStepFiveU() {
    //GET-UPDATE
    const { fileID } = useParams();
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.getFile || {});
  
    // Crear las funciones de manejo desde stepFiveUtil.js
    const handleRadioChange = createHandleRadioChange(dispatch);
    const handleDateChange = createHandleDateChange(dispatch);
    const handleInputChange = createHandleInputChange(dispatch);
    const handlePickerChange = createHandlePickerChange(dispatch);
  
    const wasHospitalized = formData.wasHospitalized === "si";
    const utiHospitalized = formData.utiHospitalized === "si";
  
    // Lógica para determinar si se debe mostrar la fecha de alta o de defunción
    const showDischargeDate = wasHospitalized || utiHospitalized;
    const isDeathDischarge = formData.medicalDischargeType === "Defuncion";
    
    const [loading, setLoading] = useState(true);
    const [fileU, setFileU] = useState(null);
    useEffect(() => {
      function fetchFileDetails() {
        const storedData = localStorage.getItem('updateFile');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setFileU(parsedData);
          console.log(parsedData); // Ahora verás las propiedades del objeto
        } else {
          console.log('No hay datos en el localStorage');
        }
        setLoading(false);
      }
        fetchFileDetails();
      }, [fileID]);
      // Manejar cambios en los campos del formulario
      const handleChange = (value, name) => {
        //dispatch(updateStepSix({ [name]: value }));
      };
  
    // Manejar la acción del botón para enviar la ficha epidemiológica
    const handleSave = async () => {
      try {
        await UpdateFile(fileU);
        alert('Ficha epidemiológica enviada exitosamente.');
      } catch (error) {
        console.error('Error al enviar la ficha epidemiológica:', error);
        alert('Ocurrió un error al enviar la ficha epidemiológica. Inténtelo de nuevo.');
      }
    };
  
    if (loading) return <p>Cargando...</p>;                   ////
    return (
      <Form fluid>
        {/* Panel de Información */}
        <Panel bordered bodyFill style={{ marginBottom: 20, padding: 10, backgroundColor: '#E0ECF8' }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>
            Historial médico o clínico, seleccionar respuesta según corresponda.
          </p>
        </Panel>
  
        {/* Hospitalización */}
        <FlexboxGrid justify="space-between" style={{ marginBottom: 20 }}>
          <FlexboxGrid.Item colspan={11}>
            <FormGroup>
              <Form.ControlLabel>¿Fue Hospitalizado/a? *</Form.ControlLabel>
              <RadioGroup
                name="hospitalized"
                inline
                value={fileU.wasHospitalized}
                onChange={(value) => handleRadioChange('wasHospitalized', value)}
              >
                <Radio value="si">SI</Radio>
                <Radio value="no">NO</Radio>
              </RadioGroup>
            </FormGroup>
          </FlexboxGrid.Item>
  
          <FlexboxGrid.Item colspan={11}>
            <FormGroup>
              <Form.ControlLabel>Fecha de Hospitalización</Form.ControlLabel>
              <DatePicker
                name="hospitalizationDate"
                format="yyyy/MM/dd"
                style={{ width: '100%' }}
                disabled={!wasHospitalized}
                value={parseDate(fileU.hospitalizationDate)}
                onChange={(value) => handleDateChange('hospitalizationDate', value)}
              />
            </FormGroup>
          </FlexboxGrid.Item>
        </FlexboxGrid>
  
        <FormGroup>
          <Form.ControlLabel>Establecimiento de Salud</Form.ControlLabel>
          <FormControl
            name="hospitalName"
            placeholder="Nombre del establecimiento de salud"
            style={{ width: '100%' }}
            disabled={!wasHospitalized}
            value={fileU.hospitalName || ''}
            onChange={(value) => handleInputChange('hospitalName', value)}
          />
        </FormGroup>
  
        {/* UTI (Unidad de Terapia Intensiva) */}
        <FlexboxGrid justify="space-between" style={{ marginTop: 30, marginBottom: 20 }}>
          <FlexboxGrid.Item colspan={11}>
            <FormGroup>
              <Form.ControlLabel>¿Hospitalizado/a en UTI?</Form.ControlLabel>
              <RadioGroup
                name="utiHospitalized"
                inline
                value={fileU.utiHospitalized}
                onChange={(value) => handleRadioChange('utiHospitalized', value)}
                disabled={!wasHospitalized} // Solo habilitado si fue hospitalizado
              >
                <Radio value="si">SI</Radio>
                <Radio value="no">NO</Radio>
              </RadioGroup>
            </FormGroup>
          </FlexboxGrid.Item>
  
          <FlexboxGrid.Item colspan={11}>
            <FormGroup>
              <Form.ControlLabel>Fecha de Hospitalización</Form.ControlLabel>
              <DatePicker
                name="utiHospitalizationDate"
                format="yyyy/MM/dd"
                style={{ width: '100%' }}
                disabled={!utiHospitalized}
                value={parseDate(fileU.utiHospitalizationDate)}
                onChange={(value) => handleDateChange('utiHospitalizationDate', value)}
              />
            </FormGroup>
          </FlexboxGrid.Item>
        </FlexboxGrid>
  
        <FormGroup>
          <Form.ControlLabel>Establecimiento de Salud</Form.ControlLabel>
          <FormControl
            name="utiHospitalName"
            placeholder="Nombre del establecimiento de salud"
            style={{ width: '100%' }}
            disabled={!utiHospitalized}
            value={fileU.utiHospitalName || ''}
            onChange={(value) => handleInputChange('utiHospitalName', value)}
          />
        </FormGroup>
  
        {/* Tipo de Alta Médica */}
        <FlexboxGrid justify="space-between" style={{ marginTop: 30 }}>
          <FlexboxGrid.Item colspan={11}>
            <FormGroup>
              <Form.ControlLabel>Tipo de Alta Médica</Form.ControlLabel>
              <InputPicker
                name="medicalDischargeType"
                data={medicalDischargeOptions}
                block
                size="lg"
                placeholder="Seleccione el tipo de alta médica"
                disabled={!wasHospitalized && !utiHospitalized}
                value={fileU.medicalDischargeType || ''}
                onChange={(value) => {
                  handlePickerChange('medicalDischargeType', value);
                  if (value !== "Defuncion") {
                    handleDateChange('dischargeDate', null);
                  }
                }}
                style={{ width: '100%' }}
              />
            </FormGroup>
          </FlexboxGrid.Item>
  
          <FlexboxGrid.Item colspan={11}>
            <FormGroup>
              <Form.ControlLabel>
                {isDeathDischarge ? "Fecha de Defunción" : "Fecha de Alta"}
              </Form.ControlLabel>
              <DatePicker
                name="dischargeDate"
                format="yyyy/MM/dd"
                style={{ width: '100%' }}
                disabled={!showDischargeDate}
                value={parseDate(fileU.dischargeDate)}
                onChange={(value) => handleDateChange('dischargeDate', value)}
              />
            </FormGroup>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Form>
    );
}