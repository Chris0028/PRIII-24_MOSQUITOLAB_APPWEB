import { Form, FlexboxGrid, Panel, InputPicker } from 'rsuite';
import { useFetchMunicipalities, useFetchStates } from '../repositories/locationRepository';
import { countriesOptions } from '../utils/pickerOptions';
import { FormControl, FormGroup } from '../hooks/useForms';
import { useSelector, useDispatch } from 'react-redux';
import { updateStepThree } from '../../../redux/fileSlice';


export default function FormStepThree() {
    //USO DE REDUX
    const dispatch = useDispatch();
    
    // Obtener los datos del paso 3 del store de Redux
    const formData = useSelector((state) => state.file?.stepThree || {});

    // Función para manejar cambios en los campos del formulario
    const handleChange = (value, name) => {
        dispatch(updateStepThree({ [name]: value }));
    };


    const municipalities = useFetchMunicipalities();
    const states = useFetchStates();

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
                            value={formData.countryOrPlace || ''}
                            onChange={(value) => handleChange(value, 'countryOrPlace')}
                            placeholder="Seleccione el país o lugar"
                            block
                            size="lg"
                            style={{ width: '100%' }}
                            data={countriesOptions}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Form.ControlLabel>Provincia / Municipio *</Form.ControlLabel>
                        <InputPicker
                            name="provinceMunicipality"
                            value={formData.provinceOrMunicipality || ''}
                            onChange={(value) => handleChange(value, 'provinceOrMunicipality')}
                            placeholder="Seleccione la provincia o municipio"
                            block
                            size="lg"
                            style={{ width: '100%' }}
                            data={municipalities}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Form.ControlLabel>Barrio / Zona / U.V *</Form.ControlLabel>
                        <FormControl
                            name="neighborhoodZone"
                            value={formData.neighborhood || ''}
                            onChange={(value) => handleChange(value, 'neighborhood')}
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
                            value={formData.state || ''}
                            onChange={(value) => handleChange(value, 'state')}
                            placeholder="Seleccione el departamento"
                            block
                            size="lg"
                            style={{ width: '100%' }}
                            data={states}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Form.ControlLabel>Ciudad / Localidad / Comunidad *</Form.ControlLabel>
                        <FormControl
                            name="cityLocality"
                            value={formData.city || ''}
                            onChange={(value) => handleChange(value, 'city')}
                            placeholder="Ingrese la ciudad, localidad o comunidad"
                            style={{ width: '100%' }}
                        />
                    </FormGroup>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </Form>
    );
}
