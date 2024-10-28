import { Form, DatePicker, Toggle, FlexboxGrid, InputPicker, Divider } from 'rsuite';
import { sexOptions, countriesOptions, secureOptions } from '../utils/pickerOptions';
import { APIProvider, Map, Marker, InfoWindow } from '../hooks/useMaps';
import { useFetchMunicipalities } from '../repositories/locationRepository';
import { React, useState, useCallback, Toggles } from '../hooks/useReacts';
import { FormControl, FormGroup } from '../hooks/useForms';
import { useDispatch, useSelector } from 'react-redux';
import { createHandleInputChange, createHandleToggleChange, createHandleMarkerDragEnd } from '../utils/stepTwoUtil';
import { handleBirthDateChange as createHandleBirthDateChange } from '../utils/stepTwoUtil';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { GetFileDetails } from '../services/GetUpdateFile';
import { setUpdateFile } from '../../../redux/updateFileSlice';

export default function FormStepTwoU() {
  //GET-UPDATE
  const { fileID } = useParams();
  // Inicializar el dispatch de Redux y obtener datos del estado
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.getFile || {});
  const fileSelector = useSelector((state) => state.updateFile);
  //const { loading, error } = useSelector((state) => state.updateFile);
  // Funciones de manejo desde stepTwoUtil.js
  const handleInputChanges = createHandleInputChange(dispatch);
  const handleToggleChanges = createHandleToggleChange(dispatch);
  const handleMarkerDragEnds = createHandleMarkerDragEnd(dispatch);
  const handleBirthDateChange = createHandleBirthDateChange(dispatch);

  // Hook Toggles - Para manejo local de los toggles
  const { isPregnant, handleToggleChange, isInsured, handleToggleChange1 } = Toggles();

  // Obtener los datos de municipios
  const municipalities = useFetchMunicipalities();

  // Estado local para el marcador de Google Maps
  const [markerPosition, setMarkerPosition] = useState({
    lat: formData.latitude || -17.388283899568613,
    lng: formData.longitude || -66.14925111256666,
  });

  // Maneja el evento de clic en el marcador para mostrar la información
  const onMarkerClick = useCallback(() => {
    setShowInfoWindow(true);
  }, []);

  // Maneja el cierre de la ventana de información
  const onInfoWindowClose = useCallback(() => {
    setShowInfoWindow(false);
  }, []);

  const [showInfoWindow, setShowInfoWindow] = useState(false);

  // Sincronizar el estado local del marcador con Redux
  const onMarkerDragEnd = useCallback((event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    setMarkerPosition({ lat: newLat, lng: newLng });
    handleMarkerDragEnds(newLat, newLng);
  }, [handleMarkerDragEnds]);

  //Cargado de datos
  useEffect(() => {
    let data = null;
    const getFile = async () =>{
      data = await GetFileDetails(fileID)
      dispatch(setUpdateFile(data));
    }
    getFile();
  }, [fileID]);

  // if (loading) return <p>Cargando...</p>;
  // if (error) return <p>Error al cargar los datos: {error}</p>;
return (
  <Form fluid>
    <FlexboxGrid justify="space-between" align="middle">
      {/* Primera Fila */}
      <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
        <FormGroup>
          <Form.ControlLabel>Número de Documento *</Form.ControlLabel>
          <FormControl
            name="documentNumber"
            type="text"
            style={{ width: '100%' }}
            placeholder="Ingrese su carnet de identidad"
            defaultValue={fileSelector?.file.ci}
            onChange={(value) => handleInputChanges(value, 'documentNumber')}
          />
        </FormGroup>
      </FlexboxGrid.Item>

      <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
          <FormGroup>
            <Form.ControlLabel>Fecha de Nacimiento *</Form.ControlLabel>
            <DatePicker
              name="birthDate"
              style={{ width: '100%' }}
              defaultValue={fileSelector?.file.birthDate ? new Date(fileSelector?.file.birthDate) : null}
              onChange={(value) => handleBirthDateChange(value)}
              disabledDate={(date) => date > new Date()} // Deshabilitar fechas futuras
            />
          </FormGroup>
        </FlexboxGrid.Item>

        {/* Campo: Edad */}
        <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
          <FormGroup>
            <Form.ControlLabel>Edad *</Form.ControlLabel>
            <FormControl
              disabled
              name="age"
              type="number"
              style={{ width: '100%' }}
              placeholder="Ingrese su edad"
              value={fileSelector?.file.age !== null ? fileSelector?.file.age : ''}
            />
          </FormGroup>
        </FlexboxGrid.Item>

        <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
          <FormGroup>
            <Form.ControlLabel>Sexo *</Form.ControlLabel>
            <InputPicker
              name="gender"
              onChange={(value) => handleInputChanges(value, 'gender')}
              block
              size="lg"
              placeholder="Seleccione su sexo"
              style={{ width: '100%' }}
              defaultValue={fileSelector?.file.gender}
              data={sexOptions.map(c=>({ label: c.label, value: c.value}))}
            />
          </FormGroup>
        </FlexboxGrid.Item>

      {/* Tercera Fila: Toggle y Nombre del Apoderado */}
      {formData.gender === 'F' && (
        <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
          <FormGroup>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  backgroundColor: '#BFCDE0',
                  color: 'black',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  display: 'inline-block',
                }}
              >
                ¿Se trata de una Embarazada?
              </div>
              <Toggle
                name="isPregnant"
                checked={fileSelector?.file.isPregnant} // Sincronizar el estado con Redux
                onChange={(value) => {
                  handleToggleChanges(value, 'isPregnant'); // Actualizar en Redux
                }}
              />
            </div>
          </FormGroup>
        </FlexboxGrid.Item>
      )}

      {/* Campo: Nombre del Apoderado */}
      <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
        <FormGroup>
          <Form.ControlLabel>Nombre del Apoderado</Form.ControlLabel>
          <FormControl
            name="guardianName"
            type="text"
            style={{ width: '100%' }}
            placeholder="Ingrese el nombre del apoderado"
            defaultValue={fileSelector?.file.guardianName || 'No tiene asignado un apoderado'}
            onChange={(value) => handleInputChanges(value, 'guardianName')}
            disabled={fileSelector?.file.age >= 18} // Deshabilitar si la edad es mayor o igual a 18
          />
        </FormGroup>
      </FlexboxGrid.Item>

      {/* Divider para secciones adicionales */}
      {formData.isPregnant && formData.gender === 'F' && (
        <>
          <FlexboxGrid.Item colspan={24}>
            <Divider>Datos Adicionales para Pacientes Embarazadas</Divider>
          </FlexboxGrid.Item>

          {/* Cuarta Fila */}
          <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
            <FormGroup>
              <Form.ControlLabel>FUM (Fecha de Última Menstruación)</Form.ControlLabel>
              <DatePicker
                name="lastMenstruationDate"
                style={{ width: '100%' }}
                value={fileSelector?.file.lastMenstruationDate ? new Date(fileSelector?.file.lastMenstruationDate) : null}
                onChange={(value) => {
                  // Solo convertir a ISO si value es una instancia de Date válida
                  const dateValue = value instanceof Date && !isNaN(value) ? value.toISOString() : null;
                  handleInputChanges(dateValue, 'lastMenstruationDate');
                }}
                disabledDate={(date) => date > new Date()} // Deshabilitar fechas futuras
              />
            </FormGroup>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
            <FormGroup>
              <Form.ControlLabel>Fecha Posible de Parto</Form.ControlLabel>
              <DatePicker
                name="estimatedBirthDate"
                style={{ width: '100%' }}
                value={fileSelector?.file.estimatedBirthDate ? new Date(fileSelector?.file.estimatedBirthDate) : null}
                onChange={(value) => {
                  // Solo convertir a ISO si value es una instancia de Date válida
                  const dateValue = value instanceof Date && !isNaN(value) ? value.toISOString() : null;
                  handleInputChanges(dateValue, 'estimatedBirthDate');
                }}
              />
            </FormGroup>
          </FlexboxGrid.Item>


          {/* Quinta Fila */}
          <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
            <FormGroup>
              <Form.ControlLabel>Comorbilidad</Form.ControlLabel>
              <FormControl
                name="comorbidity"
                type="text"
                style={{ width: '100%' }}
                placeholder="Ingrese su comorbilidad"
                value={fileSelector?.file.comorbidity || ''}
                onChange={(value) => handleInputChanges(value, 'comorbidity')}
              />
            </FormGroup>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
            <FormGroup>
              <Form.ControlLabel>Especificar</Form.ControlLabel>
              <FormControl
                name="specify"
                type="text"
                style={{ width: '100%' }}
                placeholder="Especifique las enfermedades de base"
                value={fileSelector?.file.specify || ''}
                onChange={(value) => handleInputChanges(value, 'specify')}
              />
            </FormGroup>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={24}>
            <Divider />
          </FlexboxGrid.Item>
        </>
      )}

      {/* Sexta Fila */}
      <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
        <FormGroup>
          <Form.ControlLabel>Nombres *</Form.ControlLabel>
          <FormControl
            name="names"
            type="text"
            style={{ width: '100%' }}
            placeholder="Ingrese sus nombres"
            defaultValue={fileSelector?.file.patientName || ''}
            onChange={(value) => handleInputChanges(value, 'names')}
          />
        </FormGroup>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
        <FormGroup>
          <Form.ControlLabel>Apellido Paterno *</Form.ControlLabel>
          <FormControl
            name="lastName"
            type="text"
            style={{ width: '100%' }}
            placeholder="Ingrese su apellido paterno"
            defaultValue={fileSelector?.file.patientLastName || ''}
            onChange={(value) => handleInputChanges(value, 'lastName')}
          />
        </FormGroup>
      </FlexboxGrid.Item>

      {/* Séptima Fila */}
      <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
        <FormGroup>
          <Form.ControlLabel>Apellido Materno *</Form.ControlLabel>
          <FormControl
            name="secondLastName"
            type="text"
            style={{ width: '100%' }}
            placeholder="Ingrese su apellido materno"
            defaultValue={fileSelector?.file.patientSecondLastName || 'No Tiene Segundo Apellido'}
            onChange={(value) => handleInputChanges(value, 'secondLastName')}
          />
        </FormGroup>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
        <FormGroup>
          <Form.ControlLabel>País de Procedencia *</Form.ControlLabel>
          <InputPicker
            name="originCountry"
            data={countriesOptions.map(c=>({ label: c.label, value: c.value }))}
            block
            size="lg"
            placeholder="Seleccione su país de nacimiento"
            style={{ width: '100%' }}
            defaultValue={fileSelector?.file.originCountry}
            onChange={(value) => handleInputChanges(value, 'originCountry')}
          />
        </FormGroup>
      </FlexboxGrid.Item>

      {/* Octava Fila */}
      <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
        <FormGroup>
          <Form.ControlLabel>Número de Teléfono *</Form.ControlLabel>
          <FormControl
            name="phoneNumber"
            type="number"
            style={{ width: '100%' }}
            placeholder="Ingrese su número de celular"
            defaultValue={fileSelector?.file.phone || 'No tiene número de Celular'}
            onChange={(value) => handleInputChanges(value, 'phoneNumber')}
          />
        </FormGroup>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
        <FormGroup>
          <Form.ControlLabel>Dirección de Residencia *</Form.ControlLabel>
          <FormControl
            name="address"
            type="text"
            style={{ width: '100%' }}
            placeholder="Ingrese su dirección"
            defaultValue={fileSelector?.file.directionCity || ''}
            onChange={(value) => handleInputChanges(value, 'address')}
          />
        </FormGroup>
      </FlexboxGrid.Item>

      {/* Novena Fila */}
      <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
        <FormGroup>
          <Form.ControlLabel>Barrio / Localidad *</Form.ControlLabel>
          <FormControl
            name="neighborhood"
            type="text"
            style={{ width: '100%' }}
            placeholder="Ingrese el nombre de su barrio"
            defaultValue={fileSelector?.file.directionNeighborhood || ''}
            onChange={(value) => handleInputChanges(value, 'neighborhood')}
          />
        </FormGroup>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
        <FormGroup>
          <Form.ControlLabel>Municipio / Departamento *</Form.ControlLabel>
          <InputPicker
            name="municipalityDepartment"
            block
            size="lg"
            placeholder="Ingrese el nombre de su municipio"
            style={{ width: '100%' }}
            data={municipalities.map(c=>({ label: c.label, value: c.value }))}
            defaultValue={fileSelector?.file.municipalityDepartment || ''}
            onChange={(value) => handleInputChanges(value, 'municipalityDepartment')}
          />
        </FormGroup>
      </FlexboxGrid.Item>

      {/* Décima Fila: Toggle para Asegurado */}
      <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
        <FormGroup>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                backgroundColor: '#BFCDE0',
                color: 'black',
                padding: '5px 10px',
                borderRadius: '4px',
                display: 'inline-block',
              }}
            >
              ¿Está Asegurado el Paciente?
            </div>
            <Toggle
              name="isInsured"
              checked={formData.isInsured} // Utilizar el valor del estado de Redux
              onChange={(value) => {
                handleToggleChanges(value, 'isInsured'); // Actualizar en Redux
              }}
            />
          </div>
        </FormGroup>
      </FlexboxGrid.Item>

      {/* Divider para sección asegurado */}
      {formData.isInsured && (
        <>
          <FlexboxGrid.Item colspan={24}>
            <Divider>Datos del Seguro</Divider>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
            <FormGroup>
              <Form.ControlLabel>Nombre de la Empresa *</Form.ControlLabel>
              <FormControl
                name="companyName"
                type="text"
                style={{ width: '100%' }}
                placeholder="Ingrese el nombre de la empresa"
                defaultValue={fileSelector?.file.companyName || ''}
                onChange={(value) => handleInputChanges(value, 'companyName')}
              />
            </FormGroup>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
            <FormGroup>
              <Form.ControlLabel>Caja o Seguro *</Form.ControlLabel>
              <InputPicker
                name="boxInsurance"
                block
                size="lg"
                placeholder="Seleccione"
                style={{ width: '100%' }}
                data={secureOptions || []}
                defaultValue={fileSelector?.file.boxInsurance || ''}
                onChange={(value) => handleInputChanges(value, 'boxInsurance')}
              />
            </FormGroup>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
            <FormGroup>
              <Form.ControlLabel>Matrícula de Asegurado *</Form.ControlLabel>
              <FormControl
                name="insuredRegistration"
                type="text"
                style={{ width: '100%' }}
                placeholder="Ingrese su matrícula"
                defaultValue={fileSelector?.file.insuredRegistration || ''}
                onChange={(value) => handleInputChanges(value, 'insuredRegistration')}
              />
            </FormGroup>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
            <FormGroup>
              <Form.ControlLabel>Especificar</Form.ControlLabel>
              <FormControl
                name="specifyInsured"
                type="text"
                style={{ width: '100%' }}
                placeholder="Especifique"
                defaultValue={fileSelector?.file.specifyInsured || ''}
                onChange={(value) => handleInputChanges(value, 'specifyInsured')}
              />
            </FormGroup>
          </FlexboxGrid.Item>
        </>
      )}

      {/* Google Maps Integration */}
      <FlexboxGrid.Item colspan={24} style={{ marginTop: 50 }}>
        <FormGroup>
          <Form.ControlLabel>Ubicación de la Residencia por GPS *</Form.ControlLabel>
          <div style={{ width: '100%', height: 500, margin: 'auto' }}>
            <APIProvider apiKey={'AIzaSyDUp525rIEomavdDPSV8eqjnPWuMxVr0iM'}>
              <Map
                defaultZoom={15}
                defaultCenter={{
                  lat: markerPosition.lat,
                  lng: markerPosition.lng,
                }}
              >
                <Marker
                  position={markerPosition}
                  draggable // Esto hace que el marcador sea arrastrable
                  onDragEnd={onMarkerDragEnd} // Evento que se dispara al finalizar el arrastre del marcador
                  onClick={onMarkerClick} // Evento que se dispara al hacer clic en el marcador
                />
                {showInfoWindow && (
                  <InfoWindow position={markerPosition} onCloseClick={onInfoWindowClose}>
                    <div>
                      <h4>Pin dropped at:</h4>
                      <p>Latitud: {markerPosition.lat}</p>
                      <p>Longitud: {markerPosition.lng}</p>
                    </div>
                  </InfoWindow>
                )}
              </Map>
            </APIProvider>
          </div>
        </FormGroup>
      </FlexboxGrid.Item>
      </FlexboxGrid>
    </Form>
  );
}
