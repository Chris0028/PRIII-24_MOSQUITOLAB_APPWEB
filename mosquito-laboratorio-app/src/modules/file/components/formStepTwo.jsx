import { Form, DatePicker, Toggle, FlexboxGrid, InputPicker, Divider } from 'rsuite';
import { sexOptions, countriesOptions } from '../utils/pickerOptions';
import { APIProvider, Map, Marker, InfoWindow } from '../hooks/useMaps'
import { useFetchMunicipalities } from '../repositories/locationRepository';
import { React, useState, useCallback, Toggles } from '../hooks/useReacts';
import { FormControl, FormGroup } from '../hooks/useForms';

export default function FormStepTwo() {
  const { isPregnant, isInsured, handleToggleChange, handleToggleChange1 } = Toggles();
  const municipalities = useFetchMunicipalities();

  const [markerPosition, setMarkerPosition] = useState({
    lat: -17.388283899568613,
    lng: -66.14925111256666,
  });

  const [showInfoWindow, setShowInfoWindow] = useState(false);

  // Maneja el evento de finalización del arrastre del marcador
  const onMarkerDragEnd = useCallback((event) => {
    setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  }, []);

  // Maneja el evento de clic en el marcador para mostrar la información
  const onMarkerClick = useCallback(() => {
    setShowInfoWindow(true);
  }, []);

  // Maneja el cierre de la ventana de información
  const onInfoWindowClose = useCallback(() => {
    setShowInfoWindow(false);
  }, []);
  
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
            <FormControl disabled name="age" type="number" style={{ width: '100%' }} placeholder="Ingrese su edad" />
          </FormGroup>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
          <FormGroup>
            <Form.ControlLabel>Sexo *</Form.ControlLabel>
            <InputPicker name="sex" data={sexOptions} block size="lg" placeholder="Seleccione su sexo" style={{ width: '100%' }} />
          </FormGroup>
        </FlexboxGrid.Item>

        {/* Tercera Fila: Toggle y Nombre del Apoderado */}
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
              <Toggle name="isPregnant" onChange={handleToggleChange} />
            </div>
          </FormGroup>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
          <FormGroup>
            <Form.ControlLabel>Nombre del Apoderado</Form.ControlLabel>
            <FormControl disabled name="guardianName" type="text" style={{ width: '100%' }} placeholder="Ingrese el nombre del apoderado" />
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

        {/* Séptima Fila */}
        <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
          <FormGroup>
            <Form.ControlLabel>Apellido Materno *</Form.ControlLabel>
            <FormControl name="secondLastName" type="text" style={{ width: '100%' }} placeholder="Ingrese su apellido materno" />
          </FormGroup>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
          <FormGroup>
            <Form.ControlLabel>País de Procedencia *</Form.ControlLabel>
            <InputPicker name="originCountry" data={countriesOptions} block size="lg" placeholder="Seleccione su país de nacimiento" style={{ width: '100%' }} />
          </FormGroup>
        </FlexboxGrid.Item>

        {/* Octava Fila */}
        <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
          <FormGroup>
            <Form.ControlLabel>Número de Teléfono *</Form.ControlLabel>
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
            <InputPicker name="municipalityDepartment" block size="lg" placeholder="Ingrese el nombre de su municipio" style={{ width: '100%' }} data={municipalities} />
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

            <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
              <FormGroup>
                <Form.ControlLabel>Nombre de la Empresa *</Form.ControlLabel>
                <FormControl name="companyName" type='text' style={{ width: '100%' }} placeholder="Ingrese el nombre de la empresa" />
              </FormGroup>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={11} style={{ marginBottom: 30 }}>
              <FormGroup>
                <Form.ControlLabel>Caja o Seguro *</Form.ControlLabel>
                <InputPicker name="boxInsurance" block size="lg" placeholder="Seleccione" style={{ width: '100%' }} />
              </FormGroup>
            </FlexboxGrid.Item>

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
        {/* Google Maps Integration */}
        <FlexboxGrid.Item colspan={24} style={{ marginTop: 50 }}>
          <FormGroup>
            <Form.ControlLabel>Ubicación de la Residencia por GPS *</Form.ControlLabel>
            <div style={{ width: '100%', height: 500, margin: 'auto' }}>
              <APIProvider apiKey={'AIzaSyDUp525rIEomavdDPSV8eqjnPWuMxVr0iM'} onLoad={() => console.log('Maps API has loaded.')}>
                <Map defaultZoom={15} defaultCenter={{ lat: -17.388283899568613, lng: -66.14925111256666 }}>
                  <Marker
                    position={markerPosition}
                    draggable // Esto hace que el marcador sea arrastrable
                    onDragEnd={onMarkerDragEnd} // Evento que se dispara al finalizar el arrastre del marcador
                    onClick={onMarkerClick} // Evento que se dispara al hacer clic en el marcador
                  />
                  {showInfoWindow && (
                    <InfoWindow
                      position={markerPosition}
                      onCloseClick={onInfoWindowClose}
                    >
                      <div>
                        <h4>Pin dropped at:</h4>
                        <p>Latitud: {markerPosition.lat}</p>
                        <p>Longitud: {markerPosition.lng}</p>
                      </div>
                    </InfoWindow>)
                  }
                </Map>
              </APIProvider>
            </div>
          </FormGroup>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Form>
  );
}
