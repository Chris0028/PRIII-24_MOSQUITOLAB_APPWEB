import { Form, DatePicker } from 'rsuite';
import FormControl from "rsuite/esm/FormControl";
import FormGroup from "rsuite/esm/FormGroup";


export default function FormStepOne() {
    return (
        <Form>
            <FormGroup>
                <Form.ControlLabel>Establecimiento de Salud Notificante *</Form.ControlLabel>
                <FormControl name="healthEstablishment" accepter="select" />
            </FormGroup>
            <FormGroup>
                <Form.ControlLabel>Departamento *</Form.ControlLabel>
                <FormControl name="department" accepter="select" />
            </FormGroup>
            <FormGroup>
                <Form.ControlLabel>Municipio *</Form.ControlLabel>
                <FormControl name="municipality" accepter="select" />
            </FormGroup>
            <FormGroup>
                <Form.ControlLabel>Subsector *</Form.ControlLabel>
                <FormControl name="subsector" accepter="select" />
            </FormGroup>
            <FormGroup>
                <Form.ControlLabel>Fecha de Notificación *</Form.ControlLabel>
                <DatePicker name="notificationDate" style={{ width: '100%' }} />
            </FormGroup>
            <FormGroup>
                <Form.ControlLabel>Teléfono o Correo Electrónico del Establecimiento *</Form.ControlLabel>
                <FormControl name="contactInfo" type="text" />
            </FormGroup>
            <FormGroup>
                <Form.ControlLabel>Cómo se Descubrió el Caso *</Form.ControlLabel>
                <FormControl name="discoveryMethod" accepter="select" />
            </FormGroup>
        </Form>
    );
}
