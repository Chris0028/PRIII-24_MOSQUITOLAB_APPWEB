import { Tabs, Form, DatePicker, FlexboxGrid, Checkbox, Input, Panel, SelectPicker } from 'rsuite';
import { FormGroup } from '../hooks/useForms';
import { useDiseaseTabs, useEffect, useState } from '../hooks/useReacts';
import { dengueOptions, dengueSymptoms, chikungunyaSymptoms, zikaSymptoms  } from '../utils/symptonOptions';
import { createHandleSymptomChange, createHandleOtherSymptomCheckboxChange, createHandleOtherSymptomInputChange, getEpidemiologicalWeek } from '../utils/stepFourUtil';
import { useDispatch, useSelector } from 'react-redux';
import { updateStepFour } from '../../../redux/fileSlice';

export default function FormStepFour() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.file?.stepFour || {});

  const { selectedTab, setSelectedTab, dengueCase, setDengueCase } = useDiseaseTabs();

  const handleSymptomChange = createHandleSymptomChange(dispatch, selectedTab, dengueCase, formData.symptoms);
  const handleOtherSymptomCheckboxChange = createHandleOtherSymptomCheckboxChange(dispatch);
  const handleOtherSymptomInputChange = createHandleOtherSymptomInputChange(dispatch);

  const [selectedDate, setSelectedDate] = useState(formData.fileSymptomsDate ? new Date(formData.fileSymptomsDate) : null);
  const [fileEpidemiologicalWeek, setEpidemiologicalWeek] = useState(formData.fileEpidemiologicalWeek || '');

  // Sincronizar la semana epidemiológica cuando cambia 'selectedDate'
  useEffect(() => {
    if (selectedDate) {
      const week = getEpidemiologicalWeek(selectedDate); // Llama a la lógica para calcular la semana
      setEpidemiologicalWeek(week);
      dispatch(updateStepFour({ fileEpidemiologicalWeek: week })); // Actualiza la semana en Redux
    }
  }, [selectedDate, dispatch]);

  useEffect(() => {
    if (formData.fileSymptomsDate) {
      setSelectedDate(new Date(formData.fileSymptomsDate));
    }
  }, [formData.fileSymptomsDate]);

  const handleDateChange = (value) => {
    setSelectedDate(value);
    const dateValue = value instanceof Date ? value.toISOString() : null;
    dispatch(updateStepFour({ fileSymptomsDate: dateValue })); // Actualiza `fileSymptomsDate` en Redux
  };

  // Sincronizar 'otherSymptomChecked' en el Redux para la enfermedad seleccionada
  useEffect(() => {
    if (!formData.otherSymptomChecked?.hasOwnProperty(selectedTab)) {
      dispatch(updateStepFour({
        otherSymptomChecked: {
          ...formData.otherSymptomChecked,
          [selectedTab]: false,
        },
        otherSymptom: {
          ...formData.otherSymptom,
          [selectedTab]: '',
        },
      }));
    }
  }, [selectedTab, dispatch, formData.otherSymptomChecked, formData.otherSymptom]);

  return (
    <Form fluid>
      <FlexboxGrid justify="space-between">
        {/* Fecha de Inicio de Síntomas y Semana Epidemiológica */}
        <FlexboxGrid.Item colspan={11}>
          <FormGroup>
            <Form.ControlLabel>Fecha de Inicio de Síntomas *</Form.ControlLabel>
            <DatePicker
              name="fileSymptomsDate"
              format="yyyy/MM/dd"
              style={{ width: '100%' }}
              value={selectedDate}
              onChange={handleDateChange}
            />
          </FormGroup>
        </FlexboxGrid.Item>

        <FlexboxGrid.Item colspan={11}>
          <FormGroup>
            <Form.ControlLabel>Semana Epidemiológica *</Form.ControlLabel>
            <Input
              name="fileEpidemiologicalWeek"
              placeholder="Ingrese la semana"
              style={{ width: '100%' }}
              value={fileEpidemiologicalWeek || ''} // Muestra la semana calculada desde Redux
              disabled // Solo lectura, calculada automáticamente
            />
          </FormGroup>
        </FlexboxGrid.Item>
      </FlexboxGrid>

      {/* Panel Descripción sobre la enfermedad */}
      <Panel bordered bodyFill style={{ marginTop: 20, padding: 10, backgroundColor: '#E0ECF8' }}>
        <p style={{ margin: 0, fontWeight: 'bold' }}>
          Seleccione el nombre de la enfermedad que potencialmente pueda tener el paciente, en caso de Dengue,
          seleccione una de las opciones.
        </p>
      </Panel>

      {/* Posible Enfermedad y Caso de Dengue */}
      <FlexboxGrid justify="space-between" style={{ marginTop: 20 }}>
        <FlexboxGrid.Item colspan={11}>
          <FormGroup>
            <Form.ControlLabel>Posible Enfermedad *</Form.ControlLabel>
            <Tabs
              activeKey={selectedTab}
              onSelect={(eventKey) => setSelectedTab(eventKey)}
              appearance="subtle"
            >
              <Tabs.Tab eventKey="Dengue" title="Dengue" />
              <Tabs.Tab eventKey="Chikungunya" title="Chikungunya" />
              <Tabs.Tab eventKey="Zika" title="Zika" />
            </Tabs>
          </FormGroup>
        </FlexboxGrid.Item>

        <FlexboxGrid.Item colspan={11}>
          <FormGroup>
            <Form.ControlLabel>Caso de Dengue *</Form.ControlLabel>
            <SelectPicker
              name="dengueCase"
              placeholder="Seleccione el caso"
              block
              size="lg"
              style={{ width: '100%' }}
              disabled={selectedTab !== 'Dengue'}
              value={dengueCase}
              onChange={(value) => setDengueCase(value)}
              data={dengueOptions}
            />
          </FormGroup>
        </FlexboxGrid.Item>
      </FlexboxGrid>

        {/* Síntomas dinámicos basados en la enfermedad seleccionada */}
        <FormGroup style={{ marginTop: 20 }}>
        <Form.ControlLabel>Síntomas *</Form.ControlLabel>
        <FlexboxGrid justify="space-around">
          {selectedTab === 'Dengue' && formData.dengueCase && (
            <>
              {dengueSymptoms[formData.dengueCase].map((symptom, index) => (
                <FlexboxGrid.Item colspan={5} key={index}>
                  <Checkbox
                    checked={formData.symptoms.dengue[formData.dengueCase]?.includes(symptom.value) || false}
                    onChange={(_, isChecked) => handleSymptomChange(symptom.value, isChecked)}
                  >
                    {symptom.label}
                  </Checkbox>
                </FlexboxGrid.Item>
              ))}
            </>
          )}

          {selectedTab === 'Chikungunya' && (
            <>
              {chikungunyaSymptoms.map((symptom, index) => (
                <FlexboxGrid.Item colspan={5} key={index}>
                  <Checkbox
                    checked={formData.symptoms.chikungunya?.includes(symptom.value) || false}
                    onChange={(_, isChecked) => handleSymptomChange(symptom.value, isChecked)}
                  >
                    {symptom.label}
                  </Checkbox>
                </FlexboxGrid.Item>
              ))}
            </>
          )}

          {selectedTab === 'Zika' && (
            <>
              {zikaSymptoms.map((symptom, index) => (
                <FlexboxGrid.Item colspan={5} key={index}>
                  <Checkbox
                    checked={formData.symptoms.zika?.includes(symptom.value) || false}
                    onChange={(_, isChecked) => handleSymptomChange(symptom.value, isChecked)}
                  >
                    {symptom.label}
                  </Checkbox>
                </FlexboxGrid.Item>
              ))}
            </>
          )}

          {/* Campo de "Otro" síntoma */}
          <FlexboxGrid.Item colspan={10} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Checkbox
              checked={formData.otherSymptomChecked?.[selectedTab] || false}
              onChange={(_, isChecked) => handleOtherSymptomCheckboxChange(selectedTab, isChecked, formData)}
            >
              Otro
            </Checkbox>

            {formData.otherSymptomChecked?.[selectedTab] && (
              <Input
                name="otherSymptom"
                value={formData.otherSymptom?.[selectedTab] || ''}
                onChange={(value) => handleOtherSymptomInputChange(selectedTab, value, formData)}
                placeholder="Describir síntoma"
                style={{ width: '70%' }}
              />
            )}
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </FormGroup>
    </Form>
  );

};

