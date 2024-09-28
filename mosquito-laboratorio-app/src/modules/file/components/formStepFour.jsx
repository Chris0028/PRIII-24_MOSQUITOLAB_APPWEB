import { Tabs, Form, DatePicker, FlexboxGrid, RadioGroup, Radio, Checkbox, Input, Panel, SelectPicker} from 'rsuite';
import FormGroup from 'rsuite/esm/FormGroup';

export default function FormStepFour() {
    return (
        <Form fluid>
            <FlexboxGrid justify="space-between">
                {/* Fecha de Inicio de Síntomas y Semana Epidemiológica */}
                <FlexboxGrid.Item colspan={11}>
                    <FormGroup>
                        <Form.ControlLabel>Fecha de Inicio de Síntomas *</Form.ControlLabel>
                        <DatePicker name="symptomStartDate" format="dd/MM/yyyy" style={{ width: '100%' }} />
                    </FormGroup>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={11}>
                    <FormGroup>
                        <Form.ControlLabel>Semana Epidemiológica *</Form.ControlLabel>
                        <Input name="epidemiologicalWeek" placeholder="Ingrese la semana" style={{ width: '100%' }} />
                    </FormGroup>
                </FlexboxGrid.Item>
            </FlexboxGrid>

            {/* Panel Descripción sobre la enfermedad */}
            <Panel bordered bodyFill style={{ marginTop: 20, padding: 10, backgroundColor: '#E0ECF8' }}>
                <p style={{ margin: 0, fontWeight: 'bold' }}>
                    Seleccione el nombre de la enfermedad que potencialmente pueda tener el paciente, en caso de Dengue, seleccione una de las opciones.
                </p>
            </Panel>

            {/* Posible Enfermedad y Caso de Dengue */}
            <FlexboxGrid justify="space-between" style={{ marginTop: 20 }}>
                <FlexboxGrid.Item colspan={11}>
                    <FormGroup>
                        <Form.ControlLabel>Posible Enfermedad *</Form.ControlLabel>
                        <Tabs defaultActiveKey="1" appearance="subtle">
                            <Tabs.Tab eventKey="1" title="Zika">
                            
                            </Tabs.Tab>
                            <Tabs.Tab eventKey="2" title="Dengue">
                            
                            </Tabs.Tab>
                            <Tabs.Tab eventKey="3" title="Chikkungunya">
                            
                            </Tabs.Tab>
                        </Tabs>
                    </FormGroup>
                </FlexboxGrid.Item>

                <FlexboxGrid.Item colspan={11}>
                    <FormGroup>
                        <Form.ControlLabel>Caso de Dengue *</Form.ControlLabel>
                        <SelectPicker
                            name="dengueCase"
                            placeholder="Seleccione el caso"
                            block
                            size="lg"
                            style={{ width: '100%' }}
                            data={[
                                { label: 'Sin signos de alarma', value: 'sin_signos' },
                                { label: 'Con signos de alarma', value: 'con_signos' },
                                { label: 'Grave', value: 'grave' }
                            ]}
                        />
                    </FormGroup>
                </FlexboxGrid.Item>
            </FlexboxGrid>

            {/* Síntomas */}
            <FormGroup style={{ marginTop: 20 }}>
                <Form.ControlLabel>Síntomas *</Form.ControlLabel>
                <FlexboxGrid justify="space-around">
                    <FlexboxGrid.Item colspan={5}>
                        <Checkbox value="dolor_abdominal">Dolor Abdominal</Checkbox>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={5}>
                        <Checkbox value="vomitos_persistentes">Vómitos Persistentes</Checkbox>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={5}>
                        <Checkbox value="letargia">Letargia o Irritabilidad</Checkbox>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={5}>
                        <Checkbox value="sangrado_mucosas">Sangrado de Mucosas</Checkbox>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={5}>
                        <Checkbox value="otro">Otro</Checkbox>
                        <Input name="otherSymptom" placeholder="Describir síntoma" style={{ marginTop: 10, width: '100%' }} />
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </FormGroup>
        </Form>
    );
}
