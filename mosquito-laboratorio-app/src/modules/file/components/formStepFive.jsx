import { useState } from '../hooks/useReacts';
import { Form, DatePicker, FlexboxGrid, RadioGroup, Radio, Panel, InputPicker } from 'rsuite';
import { medicalDischargeOptions} from '../utils/pickerOptions';
import FormControl from 'rsuite/esm/FormControl';
import FormGroup from 'rsuite/esm/FormGroup';



export default function FormStepFive() {
    const [dischargeType, setDischargeType] = useState('');

    const handleDischargeTypeChange = (value) => {
        setDischargeType(value);
    };

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
                        <RadioGroup name="hospitalized" inline>
                            <Radio value="si">SI</Radio>
                            <Radio value="no">NO</Radio>
                        </RadioGroup>
                    </FormGroup>
                </FlexboxGrid.Item>

                <FlexboxGrid.Item colspan={11}>
                    <FormGroup>
                        <Form.ControlLabel>Fecha de Hospitalización</Form.ControlLabel>
                        <DatePicker name="hospitalizationDate" format="yyyy/MM/dd" style={{ width: '100%' }} />
                    </FormGroup>
                </FlexboxGrid.Item>
            </FlexboxGrid>

            <FormGroup>
                <Form.ControlLabel>Establecimiento de Salud</Form.ControlLabel>
                <FormControl name="hospitalName" placeholder="Nombre del establecimiento de salud" style={{ width: '100%' }} />
            </FormGroup>

            {/* UTI (Unidad de Terapia Intensiva) */}
            <FlexboxGrid justify="space-between" style={{ marginTop: 30, marginBottom: 20 }}>
                <FlexboxGrid.Item colspan={11}>
                    <FormGroup>
                        <Form.ControlLabel>¿Hospitalizado/a en UTI?</Form.ControlLabel>
                        <RadioGroup name="utiHospitalized" inline>
                            <Radio value="si">SI</Radio>
                            <Radio value="no">NO</Radio>
                        </RadioGroup>
                    </FormGroup>
                </FlexboxGrid.Item>

                <FlexboxGrid.Item colspan={11}>
                    <FormGroup>
                        <Form.ControlLabel>Fecha de Hospitalización</Form.ControlLabel>
                        <DatePicker name="utiHospitalizationDate" format="yyyy/MM/dd" style={{ width: '100%' }} />
                    </FormGroup>
                </FlexboxGrid.Item>
            </FlexboxGrid>

            <FormGroup>
                <Form.ControlLabel>Establecimiento de Salud</Form.ControlLabel>
                <FormControl name="utiHospitalName" placeholder="Nombre del establecimiento de salud" style={{ width: '100%' }} />
            </FormGroup>

            {/* Tipo de Alta Médica y Fecha de Defunción */}
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
                            onChange={handleDischargeTypeChange}
                            style={{ width: '100%' }}
                        />
                    </FormGroup>
                </FlexboxGrid.Item>

                <FlexboxGrid.Item colspan={11}>
                    <FormGroup>
                        <Form.ControlLabel>Fecha de Defunción</Form.ControlLabel>
                        <DatePicker
                            name="deathDate"
                            format="yyyy/MM/dd"
                            style={{ width: '100%' }}
                            disabled={dischargeType !== 'Defuncion'}
                        />
                    </FormGroup>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </Form>
    );
};
