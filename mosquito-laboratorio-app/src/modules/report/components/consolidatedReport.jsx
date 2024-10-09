import { DatePicker, FlexboxGrid, Form, SelectPicker, Button, InputGroup, IconButton } from 'rsuite';
import FormGroup from 'rsuite/esm/FormGroup';

export default function FilterReportForm() {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h3 style={{ fontWeight: 'bold', color: '#1B3A61' }}>FILTROS PARA UN REPORTE CONSOLIDADO</h3>

      <Form fluid>
        <FlexboxGrid justify="space-between">
          <FlexboxGrid.Item colspan={11} style={{ marginBottom: 20 }}>
            <FormGroup>
              <Form.ControlLabel>Fecha de Notificación - Desde *</Form.ControlLabel>
              <InputGroup inside style={{ width: '100%' }}>
                <DatePicker
                  name="notificationStartDate"
                  format="yy/MM/dd"
                  block
                  placeholder="yyyy-MM-dd"
                  style={{ width: '100%' }}
                />
              </InputGroup>
            </FormGroup>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={11} style={{ marginBottom: 20 }}>
            <FormGroup>
              <Form.ControlLabel>Fecha de Notificación - Hasta *</Form.ControlLabel>
              <InputGroup inside style={{ width: '100%' }}>
                <DatePicker
                  name="notificationEndDate"
                  format="yy/MM/dd"
                  block
                  placeholder="yyyy-MM-dd"
                  style={{ width: '100%' }}
                />
                
              </InputGroup>
            </FormGroup>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={11} style={{ marginBottom: 20 }}>
            <FormGroup>
              <Form.ControlLabel>Fecha de Inicio De Síntomas - Desde *</Form.ControlLabel>
              <InputGroup inside style={{ width: '100%' }}>
                <DatePicker
                  name="symptomStartDate"
                  format="yy/MM/dd"
                  block
                  placeholder="yyyy-MM-dd"
                  style={{ width: '100%' }}
                />
                
              </InputGroup>
            </FormGroup>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={11} style={{ marginBottom: 20 }}>
            <FormGroup>
              <Form.ControlLabel>Fecha de Inicio De Síntomas - Hasta *</Form.ControlLabel>
              <InputGroup inside style={{ width: '100%' }}>
                <DatePicker
                  name="symptomEndDate"
                  format="yy/MM/dd"
                  block
                  placeholder="yyyy-MM-dd"
                  style={{ width: '100%' }}
                />
                
              </InputGroup>
            </FormGroup>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={11} style={{ marginBottom: 20 }}>
            <FormGroup>
              <Form.ControlLabel>Fecha de Resultado Laboratorio - Desde *</Form.ControlLabel>
              <InputGroup inside style={{ width: '100%' }}>
                <DatePicker
                  name="labResultStartDate"
                  format="yy/MM/dd"
                  block
                  placeholder="yyyy-MM-dd"
                  style={{ width: '100%' }}
                />
                
              </InputGroup>
            </FormGroup>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={11} style={{ marginBottom: 20 }}>
            <FormGroup>
              <Form.ControlLabel>Fecha de Resultado Laboratorio - Hasta *</Form.ControlLabel>
              <InputGroup inside style={{ width: '100%' }}>
                <DatePicker
                  name="labResultEndDate"
                  format="yy/MM/dd"
                  block
                  placeholder="yyyy-MM-dd"
                  style={{ width: '100%' }}
                />
                
              </InputGroup>
            </FormGroup>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={11} style={{ marginBottom: 20 }}>
            <FormGroup>
              <Form.ControlLabel>Estado del caso *</Form.ControlLabel>
              <SelectPicker
                name="caseStatus"
                block
                placeholder="Seleccione el estado"
                data={[
                  { label: 'Positivo', value: 'positivo' },
                  { label: 'Negativo', value: 'negativo' },
                  { label: 'Pendiente', value: 'pendiente' },
                ]}
              />
            </FormGroup>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={11} style={{ marginBottom: 20 }}>
            <FormGroup>
              <Form.ControlLabel>Subestado del caso *</Form.ControlLabel>
              <SelectPicker
                name="subcaseStatus"
                block
                placeholder="Seleccione el subestado"
                data={[
                  { label: 'Con signos de alarma', value: 'con_signos' },
                  { label: 'Sin signos de alarma', value: 'sin_signos' },
                  { label: 'Grave', value: 'grave' },
                ]}
              />
            </FormGroup>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={11} style={{ marginBottom: 20 }}>
            <FormGroup>
              <Form.ControlLabel>Método diagnóstico *</Form.ControlLabel>
              <SelectPicker
                name="diagnosticMethod"
                block
                placeholder="Seleccione el método"
                data={[
                  { label: 'PCR', value: 'pcr' },
                  { label: 'Serología', value: 'serologia' },
                ]}
              />
            </FormGroup>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={11} style={{ marginBottom: 20 }}>
            <FormGroup>
              <Form.ControlLabel>Departamento *</Form.ControlLabel>
              <SelectPicker
                name="department"
                block
                placeholder="Seleccione el departamento"
                data={[
                  { label: 'La Paz', value: 'la_paz' },
                  { label: 'Cochabamba', value: 'cochabamba' },
                ]}
              />
            </FormGroup>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={11} style={{ marginBottom: 20 }}>
            <FormGroup>
              <Form.ControlLabel>Red *</Form.ControlLabel>
              <SelectPicker
                name="network"
                block
                placeholder="Seleccione la red"
                data={[
                  { label: 'Red Norte', value: 'norte' },
                  { label: 'Red Sur', value: 'sur' },
                ]}
              />
            </FormGroup>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={11} style={{ marginBottom: 20 }}>
            <FormGroup>
              <Form.ControlLabel>Municipio *</Form.ControlLabel>
              <SelectPicker
                name="municipality"
                block
                placeholder="Seleccione el municipio"
                data={[
                  { label: 'Municipio 1', value: 'municipio_1' },
                  { label: 'Municipio 2', value: 'municipio_2' },
                ]}
              />
            </FormGroup>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={11} style={{ marginBottom: 20 }}>
            <FormGroup>
              <Form.ControlLabel>Establecimiento *</Form.ControlLabel>
              <SelectPicker
                name="facility"
                block
                placeholder="Seleccione el establecimiento"
                data={[
                  { label: 'Hospital A', value: 'hospital_a' },
                  { label: 'Hospital B', value: 'hospital_b' },
                ]}
              />
            </FormGroup>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={11} style={{ marginBottom: 20 }}>
            <FormGroup>
              <Form.ControlLabel>Subsector *</Form.ControlLabel>
              <SelectPicker
                name="subsector"
                block
                placeholder="Seleccione el subsector"
                data={[
                  { label: 'Sector A', value: 'sector_a' },
                  { label: 'Sector B', value: 'sector_b' },
                ]}
              />
            </FormGroup>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Form>
    </div>
  );
}
