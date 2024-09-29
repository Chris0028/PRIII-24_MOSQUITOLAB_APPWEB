import { Form, FlexboxGrid, Panel, InputPicker} from 'rsuite';
import FormControl from 'rsuite/esm/FormControl';
import FormGroup from 'rsuite/esm/FormGroup';
import { Button } from 'rsuite';
import { FaSave } from 'react-icons/fa';

export default function FormStepSix() {
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
                            data={[]}
                            style={{ width: '100%' }}
                            placeholder="Seleccione el laboratorio"
                            size="lg"
                        />
                    </FormGroup>
                </FlexboxGrid.Item>
            </FlexboxGrid>

            <FlexboxGrid justify="space-between">
                <FlexboxGrid.Item colspan={11}>
                    <FormGroup>
                        <Form.ControlLabel>Nombre Completo del Médico</Form.ControlLabel>
                        <FormControl name="doctorFullName" placeholder="Ingrese el nombre del médico" type="text" />
                    </FormGroup>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={11}>
                    <FormGroup>
                        <Form.ControlLabel>Centro Médico Notificante</Form.ControlLabel>
                        <FormControl name="notifyingMedicalCenter" placeholder="Ingrese el centro médico notificante" type="text" />
                    </FormGroup>
                </FlexboxGrid.Item>
            </FlexboxGrid>
            
            {/* Botón para guardar */}
            <Button 
            appearance="primary" 
            color="#BFCDE0" 
            size="lg" 
            circle 
            style={{ position: 'fixed', bottom: 20, right: 20 }}>
                <FaSave style={{ fontSize: '2.5em' }} />
            </Button>
        </Form>
    );
}
