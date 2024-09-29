import { Tabs, Form, DatePicker, FlexboxGrid, Checkbox, Input, Panel, SelectPicker } from 'rsuite';
import FormGroup from 'rsuite/esm/FormGroup';
import { useDiseaseTabs, useState } from '../hooks/useReacts';
import { dengueOptions, dengueSymptoms, chikungunyaSymptoms, zikaSymptoms } from '../utils/symptonOptions';

export default function FormStepFour() {
    const { selectedTab, setSelectedTab, dengueCase, setDengueCase } = useDiseaseTabs();
  
    return (
      <Form fluid>
        <FlexboxGrid justify="space-between">
          {/* Fecha de Inicio de Síntomas y Semana Epidemiológica */}
          <FlexboxGrid.Item colspan={11}>
            <FormGroup>
              <Form.ControlLabel>Fecha de Inicio de Síntomas *</Form.ControlLabel>
              <DatePicker name="symptomStartDate" format="yyyy/MM/dd" style={{ width: '100%' }} />
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
              <Tabs activeKey={selectedTab} onSelect={setSelectedTab} appearance="subtle">
                <Tabs.Tab eventKey="Zika" title="Zika" />
                <Tabs.Tab eventKey="Dengue" title="Dengue" />
                <Tabs.Tab eventKey="Chikungunya" title="Chikungunya" />
              </Tabs>
            </FormGroup>
          </FlexboxGrid.Item>
  
          <FlexboxGrid.Item colspan={11}>
            <FormGroup>
              <Form.ControlLabel>Caso de Dengue *</Form.ControlLabel>
              <SelectPicker name="dengueCase" placeholder="Seleccione el caso" block size="lg"
                style={{ width: '100%' }} disabled={selectedTab !== 'Dengue'} value={dengueCase} onChange={setDengueCase} data={dengueOptions} />
            </FormGroup>
          </FlexboxGrid.Item>
        </FlexboxGrid>
  
        {/* Síntomas */}
        <FormGroup style={{ marginTop: 20 }}>
          <Form.ControlLabel>Síntomas *</Form.ControlLabel>
          <FlexboxGrid justify="space-around">
            {selectedTab === 'Dengue' && (
              <>
                {dengueSymptoms[dengueCase] &&
                  dengueSymptoms[dengueCase].map((symptom, index) => (
                    <FlexboxGrid.Item colspan={5} key={index}>
                      <Checkbox value={symptom}>{symptom}</Checkbox>
                    </FlexboxGrid.Item>
                  ))}
                <FlexboxGrid.Item colspan={10} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Checkbox value="otro">Otro</Checkbox>
                  <Input name="otherSymptom" placeholder="Describir síntoma" style={{ width: '70%' }} />
                </FlexboxGrid.Item>
              </>
            )}
            {selectedTab === 'Chikungunya' && (
              <>
                {chikungunyaSymptoms.map((symptom, index) => (
                  <FlexboxGrid.Item colspan={5} key={index}>
                    <Checkbox value={symptom}>{symptom}</Checkbox>
                  </FlexboxGrid.Item>
                ))}
                <FlexboxGrid.Item colspan={10} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Checkbox value="otro">Otro</Checkbox>
                  <Input name="otherSymptom" placeholder="Describir síntoma" style={{ width: '70%' }} />
                </FlexboxGrid.Item>
              </>
            )}
            {selectedTab === 'Zika' && (
              <>
                {zikaSymptoms.map((symptom, index) => (
                  <FlexboxGrid.Item colspan={5} key={index}>
                    <Checkbox value={symptom}>{symptom}</Checkbox>
                  </FlexboxGrid.Item>
                ))}
                <FlexboxGrid.Item colspan={10} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Checkbox value="otro">Otro</Checkbox>
                  <Input name="otherSymptom" placeholder="Describir síntoma" style={{ width: '70%' }} />
                </FlexboxGrid.Item>
              </>
            )}
          </FlexboxGrid>
        </FormGroup>
      </Form>
    );
  }