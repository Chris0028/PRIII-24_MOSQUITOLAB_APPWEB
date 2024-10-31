import { Tabs, Form, DatePicker, FlexboxGrid, Checkbox, Input, Panel, SelectPicker } from 'rsuite';
import { FormGroup } from '../hooks/useForms';
import { useDiseaseTabs, useEffect } from '../hooks/useReacts';
import { dengueOptions, dengueSymptoms, chikungunyaSymptoms, zikaSymptoms } from '../utils/symptonOptions';
import { createHandleSymptomChange, createHandleOtherSymptomCheckboxChange, createHandleOtherSymptomInputChange } from '../utils/stepFourUtil';
import { useDispatch, useSelector } from 'react-redux';
import { updateStepFour } from '../../../redux/fileSlice';
import { UpdateFile } from '../services/GetUpdateFile'; //
import { useParams } from 'react-router-dom';
import { useState } from 'react';

export default function FormStepFourU() {
  //GET-UPDATE
  const { fileID } = useParams();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.getFile || {});

  // Uso del hook modificado useDiseaseTabs
  const { selectedTab, setSelectedTab, dengueCase, setDengueCase } = useDiseaseTabs();

  // Crear las funciones desde stepFourUtil.js
  const handleSymptomChange = createHandleSymptomChange(dispatch, selectedTab, dengueCase, formData.symptoms);
  const handleOtherSymptomCheckboxChange = createHandleOtherSymptomCheckboxChange(dispatch);
  const handleOtherSymptomInputChange = createHandleOtherSymptomInputChange(dispatch);

  useEffect(() => {
    // No deseleccionar automáticamente "Otro" cada vez que cambia de enfermedad.
    // Esto asegurará que el valor se mantenga si la enfermedad tiene un valor preexistente.
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
  }, [selectedTab]);

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
      <FlexboxGrid justify="space-between">
      {/* Fecha de Inicio de Síntomas y Semana Epidemiológica */}
      <FlexboxGrid.Item colspan={11}>
        <FormGroup>
          <Form.ControlLabel>Fecha de Inicio de Síntomas *</Form.ControlLabel>
          <DatePicker
            name="symptomStartDate"
            format="yyyy/MM/dd"
            style={{ width: '100%' }}
            value={fileU.symptomsDate ? new Date(fileU.symptomsDate) : null}
            onChange={(value) => {
              // Convertir la fecha seleccionada a ISO si existe
              const dateValue = value instanceof Date ? value.toISOString() : null;
              dispatch(updateStepFour({ symptomStartDate: dateValue }));
            }}
          />
        </FormGroup>
      </FlexboxGrid.Item>

        <FlexboxGrid.Item colspan={11}>
          <FormGroup>
            <Form.ControlLabel>Semana Epidemiológica *</Form.ControlLabel>
            <Input
              name="epidemiologicalWeek"
              placeholder="Ingrese la semana"
              style={{ width: '100%' }}
              value={fileU.epidemiologicalWeek}
              onChange={(value) => dispatch(updateStepFour({ epidemiologicalWeek: value }))}
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
              <Tabs.Tab eventKey="Zika" title="Zika" />
              <Tabs.Tab eventKey="Dengue" title="Dengue" />
              <Tabs.Tab eventKey="Chikungunya" title="Chikungunya" />
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

      {/* Síntomas */}
      <FormGroup style={{ marginTop: 20 }}>
        <Form.ControlLabel>Síntomas *</Form.ControlLabel>
        <FlexboxGrid justify="space-around">
          {selectedTab === 'Dengue' && dengueCase && dengueSymptoms[dengueCase] && (
            <>
              {dengueSymptoms[dengueCase].map((symptom, index) => (
                <FlexboxGrid.Item colspan={5} key={index}>
                  <Checkbox
                    checked={formData.symptoms.dengue[dengueCase]?.includes(symptom.value) || false}
                    onChange={(_, isChecked) => handleSymptomChange(symptom.value, isChecked)}
                  >
                    {symptom.label}  {/* Usar solo el 'label' para mostrar el nombre del síntoma */}
                  </Checkbox>
                </FlexboxGrid.Item>
              ))}
            </>
          )}

          {selectedTab === 'Chikungunya' && formData.symptoms?.chikungunya && (
            <>
              {chikungunyaSymptoms.map((symptom, index) => (
                <FlexboxGrid.Item colspan={5} key={index}>
                  <Checkbox
                    checked={formData.symptoms.chikungunya?.includes(symptom.value) || false}
                    onChange={(_, isChecked) => handleSymptomChange(symptom.value, isChecked)}
                  >
                    {symptom.label}  {/* Usar solo el 'label' para mostrar el nombre del síntoma */}
                  </Checkbox>
                </FlexboxGrid.Item>
              ))}
            </>
          )}

          {selectedTab === 'Zika' && formData.symptoms?.zika && (
            <>
              {zikaSymptoms.map((symptom, index) => (
                <FlexboxGrid.Item colspan={5} key={index}>
                  <Checkbox
                    checked={formData.symptoms.zika?.includes(symptom.value) || false}
                    onChange={(_, isChecked) => handleSymptomChange(symptom.value, isChecked)}
                  >
                    {symptom.label}{/* Usar solo el 'label' para mostrar el nombre del síntoma */}
                  </Checkbox>
                </FlexboxGrid.Item>
              ))}
            </>
          )}

          {/* Checkbox e input para "Otro" */}
          <FlexboxGrid.Item colspan={10} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Checkbox
              checked={formData.otherSymptomChecked?.[selectedTab] || false}
              onChange={(_, isChecked) => {
                handleOtherSymptomCheckboxChange(selectedTab, isChecked, formData);
              }}
            >
              Otro
            </Checkbox>

            {formData.otherSymptomChecked?.[selectedTab] && (
              <Input
                name="otherSymptom"
                value={formData.otherSymptom?.[selectedTab] || ''}
                onChange={(value) => {
                  handleOtherSymptomInputChange(selectedTab, value, formData);
                }}
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