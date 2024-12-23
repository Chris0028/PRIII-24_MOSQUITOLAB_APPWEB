import { useDispatch, useSelector } from 'react-redux';
import { Form, DatePicker, FlexboxGrid, RadioGroup, Radio, Panel, InputPicker } from 'rsuite';
import { FormControl, FormGroup } from '../hooks/useForms';
import { medicalDischargeOptions } from '../utils/pickerOptions';
import {
  createHandleRadioChange, createHandleDateChange,
  createHandleInputChange, createHandlePickerChange } from '../utils/stepFiveUtil'; 

const parseDate = (dateString) => {
    return dateString ? new Date(dateString) : null;
  };
  
  export default function FormStepFive() {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.file?.stepFive || {});
  
    const handleRadioChange = createHandleRadioChange(dispatch);
    const handleDateChange = createHandleDateChange(dispatch);
    const handleInputChange = createHandleInputChange(dispatch);
    const handlePickerChange = createHandlePickerChange(dispatch);
  
    const wasHospitalized = formData.wasHospitalized === "si";
    const utiHospitalized = formData.utiHospitalized === "si";
  
    const showDischargeDate = wasHospitalized || utiHospitalized;
    const isDeathDischarge = formData.dischargeType === "Defuncion";
  
    const userSelector = useSelector((state) => state.user);

    const userInfo = userSelector.user;
    console.log(userInfo)

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
                value={formData.wasHospitalized}
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
                name="hospitalizedEntryDate"
                format="yyyy/MM/dd"
                style={{ width: '100%' }}
                disabled={!wasHospitalized}
                value={parseDate(formData.hospitalizedEntryDate)}
                onChange={(value) => handleDateChange('hospitalizedEntryDate', value)}
              />
            </FormGroup>
          </FlexboxGrid.Item>
        </FlexboxGrid>
  
        <FormGroup>
          <Form.ControlLabel>Establecimiento de Salud</Form.ControlLabel>
          <FormControl
            name="hospitalizedName"
            placeholder="Nombre del establecimiento de salud"
            style={{ width: '100%' }}
            disabled={!wasHospitalized}
            value={formData.hospitalizedName || ''}
            onChange={(value) => handleInputChange('hospitalizedName', value)}
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
                value={formData.utiHospitalized}
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
                value={parseDate(formData.utiHospitalizationDate)}
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
            value={formData.utiHospitalName || ''}
            onChange={(value) => handleInputChange('utiHospitalName', value)}
          />
        </FormGroup>
  
        {/* Tipo de Alta Médica */}
        <FlexboxGrid justify="space-between" style={{ marginTop: 30 }}>
          <FlexboxGrid.Item colspan={11}>
            <FormGroup>
              <Form.ControlLabel>Tipo de Alta Médica</Form.ControlLabel>
              <InputPicker
                name="dischargeType"
                data={medicalDischargeOptions}
                block
                size="lg"
                placeholder="Seleccione el tipo de alta médica"
                disabled={!wasHospitalized && !utiHospitalized}
                value={formData.dischargeType || ''}
                onChange={(value) => {
                  handlePickerChange('dischargeType', value);
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
                value={parseDate(formData.dischargeDate)}
                onChange={(value) => handleDateChange('dischargeDate', value)}
              />
            </FormGroup>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Form>
    );
}