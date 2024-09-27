import { Form, DatePicker, Toggle } from 'rsuite';
import FormControl from "rsuite/esm/FormControl";
import FormGroup from "rsuite/esm/FormGroup";

export default function FormStepTwo() {
    return (
        <Form fluid>
            <FormGroup>
                <Form.ControlLabel>Número de Documento *</Form.ControlLabel>
                <FormControl name="documentNumber" type="text" />
            </FormGroup>
            <FormGroup>
                <Form.ControlLabel>Fecha de Nacimiento *</Form.ControlLabel>
                <DatePicker name="birthDate" style={{ width: '100%' }} />
            </FormGroup>
            <FormGroup>
                <Form.ControlLabel>Edad</Form.ControlLabel>
                <FormControl name="age" type="number" />
            </FormGroup>
            <FormGroup>
                <Form.ControlLabel>Sexo *</Form.ControlLabel>
                <FormControl name="sex" accepter="select" />
            </FormGroup>
            <FormGroup>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: 10 }}>¿Se trata de una Embarazada?</span>
                    <Toggle name="isPregnant" />
                </div>
            </FormGroup>
            <FormGroup>
                <Form.ControlLabel>FUM (Fecha de Última Menstruación)</Form.ControlLabel>
                <DatePicker name="lastMenstruationDate" style={{ width: '100%' }} />
            </FormGroup>
            <FormGroup>
                <Form.ControlLabel>Fecha Posible de Parto</Form.ControlLabel>
                <DatePicker name="estimatedBirthDate" style={{ width: '100%' }} />
            </FormGroup>
        </Form>
    );
}
