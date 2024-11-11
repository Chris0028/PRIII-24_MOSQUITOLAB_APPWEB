import { Form, FlexboxGrid, Panel } from 'rsuite';
import { FormControl, FormGroup } from '../hooks/useForms';
import { useSelector, useDispatch } from 'react-redux';
import { createHandleInputChange } from '../utils/stepThreeutil';

export default function FormStepThree() {
    const dispatch = useDispatch();

    const formData = useSelector((state) => state.file?.stepThree || {});

    const handleChange = createHandleInputChange(dispatch);

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
                        <FormControl
                            name="contagionCountry"
                            value={formData.contagionCountry}
                            onChange={(value) => handleChange(value, 'contagionCountry')}
                            placeholder="Seleccione el país o lugar"
                            block
                            size="lg"
                            style={{ width: '100%' }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Form.ControlLabel>Provincia / Municipio *</Form.ControlLabel>
                        <FormControl
                            name="contagionMunicipality"
                            value={formData.contagionMunicipality}
                            onChange={(value) => handleChange(value, 'contagionMunicipality')}
                            placeholder="Seleccione la provincia o municipio"
                            block
                            size="lg"
                            style={{ width: '100%' }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Form.ControlLabel>Barrio / Zona / U.V *</Form.ControlLabel>
                        <FormControl
                            name="contagionNeighborhood"
                            value={formData.contagionNeighborhood || ''}
                            onChange={(value) => handleChange(value, 'contagionNeighborhood')}
                            placeholder="Ingrese el barrio, zona o U.V"
                            style={{ width: '100%' }}
                        />
                    </FormGroup>
                </FlexboxGrid.Item>

                {/* Columna Derecha */}
                <FlexboxGrid.Item colspan={11}>
                    <FormGroup>
                        <Form.ControlLabel>Departamento *</Form.ControlLabel>
                        <FormControl
                            name="contagionState"
                            value={formData.contagionState}
                            onChange={(value) => handleChange(value, 'contagionState')}
                            placeholder="Seleccione el departamento"
                            block
                            size="lg"
                            style={{ width: '100%' }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Form.ControlLabel>Ciudad / Localidad / Comunidad *</Form.ControlLabel>
                        <FormControl
                            name="contagionCity"
                            value={formData.contagionCity || ''}
                            onChange={(value) => handleChange(value, 'contagionCity')}
                            placeholder="Ingrese la ciudad, localidad o comunidad"
                            style={{ width: '100%' }}
                        />
                    </FormGroup>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </Form>
    );
};
