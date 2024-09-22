import { Avatar, Button, ButtonToolbar, Form, Input, InputGroup } from "rsuite";
import FormGroup from "rsuite/esm/FormGroup";
import InputGroupAddon from "rsuite/esm/InputGroup/InputGroupAddon";

export default function Auth() {
    return (
        <Form>
            <FormGroup controlId="username">
                <InputGroup>
                    <InputGroupAddon>
                        <Input />
                    </InputGroupAddon>
                </InputGroup>
            </FormGroup>

            <Form.Group controlId="password">
                <Form.Control name="password" placeholder="Contraseña" />
            </Form.Group>

            <Form.Group>
                <ButtonToolbar>
                    <Button appearance="primary">Ingresar</Button>
                </ButtonToolbar>
            </Form.Group>
        </Form>
    )
}