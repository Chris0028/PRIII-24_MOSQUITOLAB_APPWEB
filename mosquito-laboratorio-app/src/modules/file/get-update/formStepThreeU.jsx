import { Form, FlexboxGrid, Panel, InputPicker } from 'rsuite';
import { useFetchMunicipalities, useFetchStates } from '../repositories/locationRepository';
import { countriesOptions } from '../utils/pickerOptions';
import { FormControl, FormGroup } from '../hooks/useForms';
import { useSelector, useDispatch } from 'react-redux';
import {  GetFileDetails } from '../services/GetUpdateFile'; //
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


export default function FormStepThreeU() {
    //GET-UPDATE
    const { fileID } = useParams();
    //USO DE REDUX
    const dispatch = useDispatch();
    
    const municipalities = useFetchMunicipalities();
    const states = useFetchStates();
    const fileSelector = useSelector((state) => state.updateFile); //
    
    //Cargado de datos
    useEffect(() => {
        let data = null;
        const getFile = async () =>{
        data = await GetFileDetails(fileID)
        dispatch(setUpdateFile(data));
        }
        getFile();
    }, [fileID]);

    //if (loading) return <p>Cargando...</p>;
    
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
                            defaultValue={ fileSelector?.file.contagionCountry || ''}
                            onChange={(value) => handleChange(value, 'countryOrPlace')}
                            placeholder="Seleccione el país o lugar"
                            block
                            size="lg"
                            style={{ width: '100%' }}
                            data={countriesOptions.map(c=>({ label: c.label, value: c.value}))}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Form.ControlLabel>Provincia / Municipio *</Form.ControlLabel>
                        <InputPicker
                            name="provinceMunicipality"
                            defaultValue={ fileSelector?.file.contagionMunicipality || ''}
                            onChange={(value) => handleChange(value, 'provinceOrMunicipality')}
                            placeholder="Seleccione la provincia o municipio"
                            block
                            size="lg"
                            style={{ width: '100%' }}
                            data={municipalities.map(c=>({ label: c.label, value: c.value}))}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Form.ControlLabel>Barrio / Zona / U.V *</Form.ControlLabel>
                        <FormControl
                            name="neighborhoodZone"
                            defaultValue={fileSelector?.file.contagionNeighborhood || ''}
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
                            defaultValue={fileSelector?.file.contagionState || ''}
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
                            defaultValue={fileSelector?.file.contagionCity || ''}
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
