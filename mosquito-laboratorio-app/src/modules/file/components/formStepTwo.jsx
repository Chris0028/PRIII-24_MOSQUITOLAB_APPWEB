import { useState } from 'react';
import { Form, DatePicker, Toggle, FlexboxGrid, InputPicker, Divider } from 'rsuite';
import FormControl from 'rsuite/esm/FormControl';
import FormGroup from 'rsuite/esm/FormGroup';

const sexOptions = [
  { label: 'Masculino', value: 'masculino' },
  { label: 'Femenino', value: 'femenino' },
];

export default function FormStepTwo() {
    const [isPregnant, setIsPregnant] = useState(false);
    const [isInsured, setIsInsured] = useState(false);

    const handleToggleChange = (value) => {
        setIsPregnant(value);
    };

    const handleToggleChange1 = (value) => {
        setIsInsured(value);
    };

    return (
        <Form fluid>
            <FlexboxGrid justify="space-between" align="middle">
                {/* Primera Fila */}
                <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
                    <FormGroup>
                        <Form.ControlLabel>Número de Documento *</Form.ControlLabel>
                        <FormControl name="documentNumber" type="text" style={{ width: '100%' }} placeholder="Ingrese su carnet de identidad" />
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
                        <Form.ControlLabel>Edad *</Form.ControlLabel>
                        <FormControl name="age" type="number" style={{ width: '100%' }} placeholder="Ingrese su edad" />
                    </FormGroup>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
                    <FormGroup>
                        <Form.ControlLabel>Sexo *</Form.ControlLabel>
                        <InputPicker name="sex" data={sexOptions} block size="lg" placeholder="Seleccione su sexo" style={{ width: '100%' }}/>
                    </FormGroup>
                </FlexboxGrid.Item>

                {/* Tercera Fila: Toggle y Nombre del Apoderado */}
                <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
                    <FormGroup>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                                backgroundColor: '#BFCDE0',
                                color: 'black',
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
                        <FormControl name="guardianName" type="text" style={{ width: '100%' }} placeholder="Ingrese el nombre del apoderado" />
                    </FormGroup>
                </FlexboxGrid.Item>

                {/* Divider para secciones adicionales */}
                {isPregnant && (
                    <>
                        <FlexboxGrid.Item colspan={24}>
                            <Divider>Datos Adicionales para Pacientes Embarazadas</Divider>
                        </FlexboxGrid.Item>
                        
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
                                <FormControl name="comorbidity" type="text" style={{ width: '100%' }} placeholder="Ingrese su comorbilidad" />
                            </FormGroup>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
                            <FormGroup>
                                <Form.ControlLabel>Especificar</Form.ControlLabel>
                                <FormControl name="specify" type="text" style={{ width: '100%' }} placeholder="Especifique las enfermedades de base" />
                            </FormGroup>
                        </FlexboxGrid.Item>

                        <FlexboxGrid.Item colspan={24}>
                            <Divider></Divider>
                        </FlexboxGrid.Item>
                    </>
                )}
            
                {/* Sexta Fila */}
               <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
                    <FormGroup>
                        <Form.ControlLabel>Nombres *</Form.ControlLabel>
                        <FormControl name="names" type="text" style={{ width: '100%' }} placeholder="Ingrese sus nombres" />
                    </FormGroup>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
                    <FormGroup>
                        <Form.ControlLabel>Apellido Paterno *</Form.ControlLabel>
                        <FormControl name="lastName" type="text" style={{ width: '100%' }} placeholder="Ingrese su apellido paterno" />
                    </FormGroup>
                </FlexboxGrid.Item>

                {/* Septima Fila */}
               <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
                    <FormGroup>
                        <Form.ControlLabel>Apellido Materno *</Form.ControlLabel>
                        <FormControl name="secondLastName" type="text" style={{ width: '100%' }} placeholder="Ingrese su apellido materno" />
                    </FormGroup>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
                    <FormGroup>
                        <Form.ControlLabel>País de Procedencia *</Form.ControlLabel>
                        <InputPicker name="originCountry" data={sexOptions} block size="lg" placeholder="Seleccione su pais de nacimiento" style={{ width: '100%' }}/>
                    </FormGroup>
                </FlexboxGrid.Item>
                
                {/* Octava Fila */}
               <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
                    <FormGroup>
                        <Form.ControlLabel>Numero de Teléfono *</Form.ControlLabel>
                        <FormControl name="phoneNumber" type="text" style={{ width: '100%' }} placeholder="Ingrese su número de celular" />
                    </FormGroup>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
                    <FormGroup>
                        <Form.ControlLabel>Dirección de Residencia *</Form.ControlLabel>
                        <FormControl name="address" type="text" style={{ width: '100%' }} placeholder="Ingrese su dirección" />
                    </FormGroup>
                </FlexboxGrid.Item>

                {/* Novena Fila */}
               <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
                    <FormGroup>
                        <Form.ControlLabel>Barrio / Localidad *</Form.ControlLabel>
                        <FormControl name="neighborhood" type="text" style={{ width: '100%' }} placeholder="Ingrese el nombre de su barrio" />
                    </FormGroup>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
                    <FormGroup>
                        <Form.ControlLabel>Municipio / Departamento *</Form.ControlLabel>
                        <InputPicker name="municipalityDepartment" block size="lg" placeholder="Ingrese el nombre de su municipio" style={{ width: '100%' }} />
                    </FormGroup>
                </FlexboxGrid.Item>


                {/* Decima Fila: Toggle para Asegurado */}
                <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
                    <FormGroup>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                                backgroundColor: '#BFCDE0',
                                color: 'black',
                                padding: '5px 10px',
                                borderRadius: '4px',
                                display: 'inline-block',
                            }}>
                                ¿Está Asegurado el Paciente?
                            </div>
                            <Toggle name="isInsured" onChange={handleToggleChange1} />
                        </div>
                    </FormGroup>
                </FlexboxGrid.Item>

                {/* Divider para sección asegurado */}
                {isInsured && (
                    <>
                        <FlexboxGrid.Item colspan={24}>
                            <Divider>Datos del Seguro</Divider>
                        </FlexboxGrid.Item>
                        
                        {/* Onceava Fila */}
                        <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
                            <FormGroup>
                                <Form.ControlLabel>Nombre de la Empresa *</Form.ControlLabel>
                                <FormControl name="companyName" type='text' style={{ width: '100%' }} placeholder="Ingrese el nombre de la empresa"/>
                            </FormGroup>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
                            <FormGroup>
                                <Form.ControlLabel>Caja o Seguro *</Form.ControlLabel>
                                <InputPicker name="boxInsurance" block size="lg" placeholder="Seleccione" style={{ width: '100%' }} />
                            </FormGroup>
                        </FlexboxGrid.Item>

                        {/* Duodecima Fila */}
                        <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
                            <FormGroup>
                                <Form.ControlLabel>Matricula de Asegurado *</Form.ControlLabel>
                                <FormControl name="insuredRegistration" type="text" style={{ width: '100%' }} placeholder="Ingrese su matrícula" />
                            </FormGroup>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
                            <FormGroup>
                                <Form.ControlLabel>Especificar</Form.ControlLabel>
                                <FormControl name="specifyInsured" type="text" placeholder="Especifique" style={{ width: '100%' }} />
                            </FormGroup>
                        </FlexboxGrid.Item>
                    </>
                )}
            </FlexboxGrid>
        </Form>
    );
}
