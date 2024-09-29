// FormStepOne.jsx
import React from 'react';
import { Form, DatePicker, FlexboxGrid, InputPicker } from 'rsuite';
import FormControl from 'rsuite/esm/FormControl';
import FormGroup from 'rsuite/esm/FormGroup';
import { useFetchMunicipalities, useFetchStates } from '../repositories/locationRepository';
import { caseOptions, subSectorOptions, healthStablishmentOptions } from '../utils/PickerOptions';

export default function FormStepOne() {
  const municipalities = useFetchMunicipalities();
  const states = useFetchStates();

  return (
    <Form fluid>
      <FlexboxGrid justify="space-between">
        {/* Columna Izquierda */}
        <FlexboxGrid.Item colspan={11}>
          <FormGroup>
            <Form.ControlLabel>Establecimiento de Salud Notificante *</Form.ControlLabel>
            <InputPicker name="healthEstablishment" placeholder="Seleccione el establecimiento" block
                         size="lg" style={{ width: '100%' }} data={healthStablishmentOptions || []} />
          </FormGroup>
          <FormGroup>
            <Form.ControlLabel>Municipio *</Form.ControlLabel>
            <InputPicker name="municipality" placeholder="Seleccione el municipio" block
                         size="lg" style={{ width: '100%' }} data={municipalities || []} />
          </FormGroup>
          <FormGroup>
            <Form.ControlLabel>Fecha de Notificación *</Form.ControlLabel>
            <DatePicker name="notificationDate" style={{ width: '100%' }} />
          </FormGroup>
          <FormGroup>
            <Form.ControlLabel>Cómo se Descubrió el Caso *</Form.ControlLabel>
            <InputPicker name="discoveryMethod" placeholder="Seleccione el método" block
                         size="lg" style={{ width: '100%' }} data={caseOptions || []} />
          </FormGroup>
        </FlexboxGrid.Item>

        {/* Columna Derecha */}
        <FlexboxGrid.Item colspan={11}>
          <FormGroup>
            <Form.ControlLabel>Departamento *</Form.ControlLabel>
            <InputPicker name="department" placeholder="Seleccione el departamento" block
                         size="lg" style={{ width: '100%' }} data={states || []}/>
          </FormGroup>
          <FormGroup>
            <Form.ControlLabel>Subsector *</Form.ControlLabel>
            <InputPicker name="subsector" placeholder="Seleccione el subsector" block
                         size="lg" style={{ width: '100%' }} data={subSectorOptions || []} />
          </FormGroup>
          <FormGroup>
            <Form.ControlLabel>Teléfono o Correo Electrónico del Establecimiento *</Form.ControlLabel>
            <FormControl name="contactInfo" type="text" placeholder="Ingrese teléfono o correo electrónico" style={{ width: '100%' }} />
          </FormGroup>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Form>
  );
};