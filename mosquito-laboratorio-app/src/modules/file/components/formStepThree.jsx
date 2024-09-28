import { Form, FlexboxGrid, Panel, InputPicker } from 'rsuite';
import FormControl from 'rsuite/esm/FormControl';
import FormGroup from 'rsuite/esm/FormGroup';

export default function FormStepThree() {
    return (
        <Form fluid>
            <Panel bordered bodyFill style={{ marginBottom: 20, padding: 10, backgroundColor: '#E0ECF8' }}>
                <p style={{ margin: 0, fontWeight: 'bold' }}>
                    Lugar Probable de infección. ¿Visitó algún lugar endémico de Dengue, Chikungunya o Zika, en las últimas semanas?
                </p>
            </Panel>

            <FlexboxGrid justify="space-between">
                {/* Columna Izquierda */}
                <FlexboxGrid.Item colspan={11}>
                    <FormGroup>
                        <Form.ControlLabel>País / Lugar *</Form.ControlLabel>
                        <InputPicker
                            name="countryPlace"
                            placeholder="Seleccione el país o lugar"
                            block
                            size="lg"
                            style={{ width: '100%' }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Form.ControlLabel>Provincia / Municipio *</Form.ControlLabel>
                        <InputPicker
                            name="provinceMunicipality"
                            placeholder="Seleccione la provincia o municipio"
                            block
                            size="lg"
                            style={{ width: '100%' }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Form.ControlLabel>Barrio / Zona / U.V *</Form.ControlLabel>
                        <FormControl
                            name="neighborhoodZone"
                            placeholder="Ingrese el barrio, zona o U.V"
                            style={{ width: '100%' }}
                        />
                    </FormGroup>
                </FlexboxGrid.Item>

                {/* Columna Derecha */}
                <FlexboxGrid.Item colspan={11}>
                    <FormGroup>
                        <Form.ControlLabel>Departamento *</Form.ControlLabel>
                        <InputPicker
                            name="department"
                            placeholder="Seleccione el departamento"
                            block
                            size="lg"
                            style={{ width: '100%' }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Form.ControlLabel>Ciudad / Localidad / Comunidad *</Form.ControlLabel>
                        <FormControl
                            name="cityLocality"
                            placeholder="Ingrese la ciudad, localidad o comunidad"
                            style={{ width: '100%' }}
                        />
                    </FormGroup>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </Form>
    );
}
