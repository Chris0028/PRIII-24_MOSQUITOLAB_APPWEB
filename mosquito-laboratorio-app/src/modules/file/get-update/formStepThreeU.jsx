import { Form, FlexboxGrid, Panel, InputPicker } from 'rsuite';
import { useFetchMunicipalities, useFetchStates } from '../repositories/locationRepository';
import { countriesOptions } from '../utils/pickerOptions';
import { FormControl, FormGroup } from '../hooks/useForms';
import { useSelector, useDispatch } from 'react-redux';
import {  UpdateFile } from '../services/GetUpdateFile'; //
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function FormStepThreeU() {
    //GET-UPDATE
    const { fileID } = useParams();
    //USO DE REDUX
    const dispatch = useDispatch();
    
    // Obtener los datos del paso 3 del store de Redux
    //const fileU = useSelector((state) => state.getFile || {});
    const municipalities = useFetchMunicipalities();
    const states = useFetchStates();

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
                            value={fileU.contagionCountry || ''}
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
                            value={fileU.contagionMunicipality || ''}
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
                            value={fileU.contagionNeighborhood || ''}
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
                            value={fileU.contagionState || ''}
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
                            value={fileU.contagionCity || ''}
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
