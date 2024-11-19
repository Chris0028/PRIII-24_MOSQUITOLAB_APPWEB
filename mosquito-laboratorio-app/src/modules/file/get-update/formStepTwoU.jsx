import { Form, DatePicker, Toggle, FlexboxGrid, InputPicker, Divider } from 'rsuite';
import { sexOptions, countriesOptions, typesInsurances } from '../utils/pickerOptions';
import { APIProvider, Map, Marker, InfoWindow } from '../hooks/useMaps';
import { useFetchMunicipalities } from '../repositories/locationRepository';
import { React, useState, useCallback } from '../hooks/useReacts';
import { FormControl, FormGroup } from '../hooks/useForms';
import { useDispatch, useSelector } from 'react-redux';
import { createHandleToggleChange, createHandleMarkerDragEnd, handleInsuranceChange } from '../utils/stepTwoUtil';
import { handleBirthDateChange as createHandleBirthDateChange } from '../utils/stepTwoUtil';
import { useFetchInsurances } from '../repositories/insuranceRepository';
import { updateStepTwo } from '../../../redux/formStepsSlice';
import { GetFileDetails } from '../services/getUpdateFile';
import { mapPayloadToSteps } from '../utils/mapPayLoadToSteps';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


export default function formStepTwoU() {
  const { fileID } = useParams();
  // Inicializar el dispatch de Redux y obtener datos del estado
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.formSteps.stepTwo);
  console.log('Redux state formData:', formData);

  // Funciones de manejo desde stepTwoUtil.js
  const handleToggleChanges = createHandleToggleChange(dispatch);
  const handleMarkerDragEnds = createHandleMarkerDragEnd(dispatch);
  const handleBirthDateChange = createHandleBirthDateChange(dispatch);

  // Obtener los datos de municipios
  const municipalities = useFetchMunicipalities();
  const insurances = useFetchInsurances();
  const typeInsurance = typesInsurances;
  // Estado local para el marcador de Google Maps
  const [markerPosition, setMarkerPosition] = useState({
    lat: formData.directionLatitude || -17.388283899568613,
    lng: formData.directionLongitude || -66.14925111256666,
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

  useEffect(() => {
    const loadData = async () => {
      const data = await GetFileDetails(fileID);
      console.log("Full data from API:", data); // Revisa el log completo
      if (data) {
        mapPayloadToSteps(dispatch, data);
      }
    };

    loadData();
  }, [fileID, dispatch]);

  const handleInputChange = (name, value) => {
    dispatch(updateStepTwo({ [name]: value }));  // Actualiza Redux con los cambios
  };


  return (
    <Form fluid>
      <FlexboxGrid justify="space-between" align="middle">
        {/* Primera Fila */}
        <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
          <FormGroup>
            <Form.ControlLabel>Número de Documento *</Form.ControlLabel>
            <FormControl
              name="patientCi"
              type="text"
              style={{ width: '100%' }}
              placeholder="Ingrese su carnet de identidad"
              value={formData.patientCi || ''}
              onChange={(value) => handleInputChange(value, 'patientCi')}
            />
          </FormGroup>
        </FlexboxGrid.Item>

        <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
          <FormGroup>
            <Form.ControlLabel>Fecha de Nacimiento *</Form.ControlLabel>
            <DatePicker
              name="patientBirthDate"
              style={{ width: '100%' }}
              value={formData.patientBirthDate ? new Date(formData.patientBirthDate) : null}
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
              value={formData.age !== null ? formData.age : ''}
            />
          </FormGroup>
        </FlexboxGrid.Item>

        <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
          <FormGroup>
            <Form.ControlLabel>Sexo *</Form.ControlLabel>
            <InputPicker
              name="patientGender"
              data={sexOptions}
              block
              size="lg"
              placeholder="Seleccione su sexo"
              style={{ width: '100%' }}
              value={formData.patientGender || ''}
              onChange={(value) => handleInputChange(value, 'patientGender')}
            />
          </FormGroup>
        </FlexboxGrid.Item>

        {/* Tercera Fila: Toggle y Nombre del Apoderado */}
        {formData.patientGender === 'F' && (
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
                  checked={formData.isPregnant} // Sincronizar el estado con Redux
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
              name="childParent"
              type="text"
              style={{ width: '100%' }}
              placeholder="Ingrese el nombre del apoderado"
              value={formData.childParent || ''}
              onChange={(value) => handleInputChange(value, 'childParent')}
              disabled={formData.age >= 18} // Deshabilitar si la edad es mayor o igual a 18
            />
          </FormGroup>
        </FlexboxGrid.Item>

        {/* Divider para secciones adicionales */}
        {formData.isPregnant && formData.patientGender === 'F' && (
          <>
            <FlexboxGrid.Item colspan={24}>
              <Divider>Datos Adicionales para Pacientes Embarazadas</Divider>
            </FlexboxGrid.Item>

            {/* Cuarta Fila */}
            <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
              <FormGroup>
                <Form.ControlLabel>FUM (Fecha de Última Menstruación)</Form.ControlLabel>
                <DatePicker
                  name="pregnantLastMenstruationDate"
                  style={{ width: '100%' }}
                  value={formData.pregnantLastMenstruationDate ? new Date(formData.pregnantLastMenstruationDate) : null}
                  onChange={(value) => {
                    // Solo convertir a ISO si value es una instancia de Date válida
                    const dateValue = value instanceof Date && !isNaN(value) ? value.toISOString() : null;
                    handleInputChange(dateValue, 'pregnantLastMenstruationDate');
                  }}
                  disabledDate={(date) => date > new Date()} // Deshabilitar fechas futuras
                />
              </FormGroup>
            </FlexboxGrid.Item>

            <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
              <FormGroup>
                <Form.ControlLabel>Fecha Posible de Parto</Form.ControlLabel>
                <DatePicker
                  name="pregnantChildBirthDate"
                  style={{ width: '100%' }}
                  value={formData.pregnantChildBirthDate ? new Date(formData.pregnantChildBirthDate) : null}
                  onChange={(value) => {
                    // Solo convertir a ISO si value es una instancia de Date válida
                    const dateValue = value instanceof Date && !isNaN(value) ? value.toISOString() : null;
                    handleInputChange(dateValue, 'pregnantChildBirthDate');
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
                  value={formData.comorbidity || ''}
                  onChange={(value) => handleInputChange(value, 'comorbidity')}
                />
              </FormGroup>
            </FlexboxGrid.Item>

            <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
              <FormGroup>
                <Form.ControlLabel>Especificar</Form.ControlLabel>
                <FormControl
                  name="pregnantDisease"
                  type="text"
                  style={{ width: '100%' }}
                  placeholder="Especifique las enfermedades de base"
                  value={formData.pregnantDisease || ''}
                  onChange={(value) => handleInputChange(value, 'pregnantDisease')}
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
              name="patientName"
              type="text"
              style={{ width: '100%' }}
              placeholder="Ingrese sus nombres"
              value={formData.patientName || ''}
              onChange={(value) => handleInputChange(value, 'patientName')}
            />
          </FormGroup>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
          <FormGroup>
            <Form.ControlLabel>Apellido Paterno *</Form.ControlLabel>
            <FormControl
              name="patientLastName"
              type="text"
              style={{ width: '100%' }}
              placeholder="Ingrese su apellido paterno"
              value={formData.patientLastName || ''}
              onChange={(value) => handleInputChange(value, 'patientLastName')}
            />
          </FormGroup>
        </FlexboxGrid.Item>

        {/* Séptima Fila */}
        <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
          <FormGroup>
            <Form.ControlLabel>Apellido Materno *</Form.ControlLabel>
            <FormControl
              name="patientSecondLastName"
              type="text"
              style={{ width: '100%' }}
              placeholder="Ingrese su apellido materno"
              value={formData.patientSecondLastName || ''}
              onChange={(value) => handleInputChange(value, 'patientSecondLastName')}
            />
          </FormGroup>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
          <FormGroup>
            <Form.ControlLabel>País de Procedencia *</Form.ControlLabel>
            <InputPicker
              name="countryOrigin"
              data={countriesOptions}
              block
              size="lg"
              placeholder="Seleccione su país de nacimiento"
              style={{ width: '100%' }}
              value={formData.countryOrigin || ''}
              onChange={(value) => handleInputChange(value, 'countryOrigin')}
            />
          </FormGroup>
        </FlexboxGrid.Item>

        {/* Octava Fila */}
        <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
          <FormGroup>
            <Form.ControlLabel>Número de Teléfono *</Form.ControlLabel>
            <FormControl
              name="patientPhone"
              type="text"
              style={{ width: '100%' }}
              placeholder="Ingrese su número de celular"
              value={formData.patientPhone || ''}
              onChange={(value) => handleInputChange(value, 'patientPhone')}
            />
          </FormGroup>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
          <FormGroup>
            <Form.ControlLabel>Ciudad *</Form.ControlLabel>
            <FormControl
              name="directionCity"
              type="text"
              style={{ width: '100%' }}
              placeholder="Ingrese su dirección"
              value={formData.directionCity || ''}
              onChange={(value) => handleInputChange(value, 'directionCity')}
            />
          </FormGroup>
        </FlexboxGrid.Item>

        {/* Novena Fila */}
        <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
          <FormGroup>
            <Form.ControlLabel>Barrio / Localidad *</Form.ControlLabel>
            <FormControl
              name="directionNeighborhood"
              type="text"
              style={{ width: '100%' }}
              placeholder="Ingrese el nombre de su barrio"
              value={formData.directionNeighborhood || ''}
              onChange={(value) => handleInputChange(value, 'directionNeighborhood')}
            />
          </FormGroup>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
          <FormGroup>
            <Form.ControlLabel>Municipio / Departamento *</Form.ControlLabel>
            <InputPicker
              name="municipalityOrState"
              block
              size="lg"
              placeholder="Ingrese el nombre de su municipio"
              style={{ width: '100%' }}
              data={municipalities}
              value={formData.municipalityOrState || ''}
              onChange={(value) => handleInputChange(value, 'municipalityOrState')}
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
                <InputPicker
                  name="insuranceId"
                  block
                  size="lg"
                  placeholder="Seleccione"
                  style={{ width: '100%' }}
                  data={insurances || []}
                  value={formData.insuranceId || ''}
                  onChange={(value) => handleInsuranceChange(dispatch, insurances)(value)}
                />
              </FormGroup>
            </FlexboxGrid.Item>

            <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
              <FormGroup>
                <Form.ControlLabel>Nombre del Seguro *</Form.ControlLabel>
                <FormControl
                  name="ipInsuredName"
                  block
                  size="lg"
                  placeholder="Cargando"
                  style={{ width: '100%' }}
                  value={formData.ipInsuredName || ''}
                  disabled
                />
              </FormGroup>
            </FlexboxGrid.Item>

            <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
              <FormGroup>
                <Form.ControlLabel>Matrícula de Asegurado *</Form.ControlLabel>
                <FormControl
                  name="ipInsuredRecord"
                  type="text"
                  style={{ width: '100%' }}
                  placeholder="Ingrese su matrícula"
                  value={formData.ipInsuredRecord || ''}
                  onChange={(value) => handleInputChange(value, 'ipInsuredRecord')}
                />
              </FormGroup>
            </FlexboxGrid.Item>

            <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
              <FormGroup>
                <Form.ControlLabel>Tipo de Seguro *</Form.ControlLabel>
                <InputPicker
                  name="ipTypeInsured"
                  type="text"
                  style={{ width: '100%' }}
                  placeholder="Ejemplo: Seguro de Cobertura Completa"
                  data={typeInsurance || ''}
                  value={formData.ipTypeInsured || ''}
                  onChange={(value) => handleInputChange(value, 'ipTypeInsured')}
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
