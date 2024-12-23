import { Form, FlexboxGrid, Panel, InputPicker } from 'rsuite';
import FormControl from 'rsuite/esm/FormControl';
import FormGroup from 'rsuite/esm/FormGroup';
import { Button } from 'rsuite';
import { FaSave } from 'react-icons/fa';
import { useFetchLaboratories } from '../repositories/laboratoryRepository';
import { updateStepSix } from '../../../redux/fileSlice';
import { useSelector, useDispatch } from 'react-redux';
import { sendFile } from '../repositories/FileSendRepository';

export default function FormStepSixU() {
  // Uso de REDUX
  const dispatch = useDispatch();
  // Obtener los datos del estado de Redux
  const formData = useSelector((state) => state.file);
  const stepSixData = useSelector((state) => state.file.stepSix);
  const laboratories = useFetchLaboratories();

  // Manejar cambios en los campos del formulario
  const handleChange = (value, name) => {
    dispatch(updateStepSix({ [name]: value }));
  };

  // Manejar la acción del botón para enviar la ficha epidemiológica
  const handleSave = () => {
    // Llamar a la función sendFile() y enviar los datos actuales del estado de Redux
    sendFile(formData)
      .then((response) => {
        console.log("Ficha epidemiológica enviada con éxito:", response);
        alert("Ficha epidemiológica enviada exitosamente.");
      })
      .catch((error) => {
        console.error("Error al enviar la ficha epidemiológica:", error);
        alert("Ocurrió un error al enviar la ficha epidemiológica. Inténtelo de nuevo.");
      });
  };

  return (
    <Form fluid>
      {/* Panel de Advertencia */}
      <Panel bordered bodyFill style={{ marginBottom: 20, padding: 10, backgroundColor: '#E0ECF8' }}>
        <p style={{ margin: 0, fontWeight: 'bold' }}>
          Debe Confirmar la creación de esta ficha epidemiológica teniendo en cuenta que es responsable de que todos los datos del formulario hayan sido redactados de forma correcta.
        </p>
      </Panel>

      {/* Campos del Formulario */}
      <FlexboxGrid justify="space-between" style={{ marginBottom: 20 }}>
        <FlexboxGrid.Item colspan={11}>
          <FormGroup>
            <Form.ControlLabel>Enviar a Laboratorio</Form.ControlLabel>
            <InputPicker
              data={laboratories || []}
              style={{ width: '100%' }}
              placeholder="Seleccione el laboratorio"
              size="lg"
              value={stepSixData.laboratorySend || ''}
              onChange={(value) => handleChange(value, 'laboratorySend')}
            />
          </FormGroup>
        </FlexboxGrid.Item>
      </FlexboxGrid>

      <FlexboxGrid justify="space-between">
        <FlexboxGrid.Item colspan={11}>
          <FormGroup>
            <Form.ControlLabel>Nombre Completo del Médico</Form.ControlLabel>
            <FormControl
              name="doctorFullName"
              placeholder="Ingrese el nombre del médico"
              type="text"
              value={stepSixData.doctorName || ''}
              onChange={(value) => handleChange(value, 'doctorName')}
            />
          </FormGroup>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={11}>
          <FormGroup>
            <Form.ControlLabel>Centro Médico Notificante</Form.ControlLabel>
            <FormControl
              name="notifyingMedicalCenter"
              placeholder="Ingrese el centro médico notificante"
              type="text"
              value={stepSixData.healthEstablishmentNotifier || ''}
              onChange={(value) => handleChange(value, 'healthEstablishmentNotifier')}
            />
          </FormGroup>
        </FlexboxGrid.Item>
      </FlexboxGrid>

      {/* Botón para guardar */}
      <Button
        appearance="primary"
        color="blue"
        size="lg"
        circle
        style={{ position: 'fixed', bottom: 20, right: 20 }}
        onClick={handleSave}
      >
        <FaSave style={{ fontSize: '2.5em' }} />
      </Button>
    </Form>
  );
}

