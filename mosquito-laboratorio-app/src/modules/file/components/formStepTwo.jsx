import { useState } from 'react';
import { Form, DatePicker, Toggle, FlexboxGrid, InputPicker } from 'rsuite';
import FormControl from 'rsuite/esm/FormControl';
import FormGroup from 'rsuite/esm/FormGroup';

const sexOptions = [
  { label: 'Masculino', value: 'masculino' },
  { label: 'Femenino', value: 'femenino' },
];

export default function FormStepTwo() {
    const [isPregnant, setIsPregnant] = useState(false);

    const handleToggleChange = (value) => {
        setIsPregnant(value);
    };

    return (
        <Form fluid>
            <FlexboxGrid justify="space-between" align="middle">
                {/* Primera Fila */}
                <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
                    <FormGroup>
                        <Form.ControlLabel>Número de Documento *</Form.ControlLabel>
                        <FormControl name="documentNumber" type="text" style={{ width: '100%' }} />
                    </FormGroup>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
                    <FormGroup>
                        <Form.ControlLabel>Fecha de Nacimiento *</Form.ControlLabel>
                        <DatePicker name="birthDate" style={{ width: '100%' }} />
                    </FormGroup>
                </FlexboxGrid.Item>

                {/* Segunda Fila */}
                <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
                    <FormGroup>
                        <Form.ControlLabel>Edad</Form.ControlLabel>
                        <FormControl name="age" type="number" style={{ width: '100%' }} />
                    </FormGroup>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
                    <FormGroup>
                        <Form.ControlLabel>Sexo *</Form.ControlLabel>
                        <InputPicker name="sex" data={sexOptions} block size="lg" placeholder="Seleccione" style={{ width: '100%' }}/>
                    </FormGroup>
                </FlexboxGrid.Item>

                {/* Tercera Fila: Toggle y Nombre del Apoderado */}
                <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
                    <FormGroup>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                                backgroundColor: '#D1C700',
                                color: 'black',
                                fontWeight: 'bold',
                                padding: '5px 10px',
                                borderRadius: '4px',
                                display: 'inline-block',
                            }}>
                                ¿Se trata de una Embarazada?
                            </div>
                            <Toggle name="isPregnant" onChange={handleToggleChange} />
                        </div>
                    </FormGroup>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
                    <FormGroup>
                        <Form.ControlLabel>Nombre del Apoderado</Form.ControlLabel>
                        <FormControl name="guardianName" type="text" style={{ width: '100%' }} />
                    </FormGroup>
                </FlexboxGrid.Item>

                {/* Campos adicionales si está embarazada */}
                {isPregnant && (
                    <>
                        {/* Cuarta Fila */}
                        <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
                            <FormGroup>
                                <Form.ControlLabel>FUM (Fecha de Última Menstruación)</Form.ControlLabel>
                                <DatePicker name="lastMenstruationDate" style={{ width: '100%' }} />
                            </FormGroup>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
                            <FormGroup>
                                <Form.ControlLabel>Fecha Posible de Parto</Form.ControlLabel>
                                <DatePicker name="estimatedBirthDate" style={{ width: '100%' }} />
                            </FormGroup>
                        </FlexboxGrid.Item>

                        {/* Quinta Fila */}
                        <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
                            <FormGroup>
                                <Form.ControlLabel>Comorbilidad</Form.ControlLabel>
                                <FormControl name="comorbidity" type="text" style={{ width: '100%' }} />
                            </FormGroup>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
                            <FormGroup>
                                <Form.ControlLabel>Especificar</Form.ControlLabel>
                                <FormControl name="specify" type="text" style={{ width: '100%' }} />
                            </FormGroup>
                        </FlexboxGrid.Item>
                    </>
                )}
            </FlexboxGrid>
        </Form>
    );
}
