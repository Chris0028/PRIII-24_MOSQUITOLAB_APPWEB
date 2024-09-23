import { useState } from "react";
import { FaKey, FaUser } from "react-icons/fa";
import { Button, ButtonToolbar, Form, InputGroup } from "rsuite";
import FormControl from "rsuite/esm/FormControl";
import FormGroup from "rsuite/esm/FormGroup";
import InputGroupAddon from "rsuite/esm/InputGroup/InputGroupAddon";
import { authenticate } from "../services/authService"

export default function AuthForm() {

    const [authData, setAuthData] = useState({ username: '', password: '' });

    function handleChange(value, name) {
        setAuthData({
            ...authData,
            [name]: value
        });
    };

    async function signIn(e) {
        e.preventDefault();
        await authenticate(authData);
    }

    return (
        <Form fluid>
            <FormGroup controlId="username">
                <InputGroup>
                    <InputGroupAddon>
                        <FaUser />
                    </InputGroupAddon>
                    <FormControl name="username" placeholder="Usuario" value={authData.username} onChange={(value) => handleChange(value, 'username')} />
                </InputGroup>
            </FormGroup>

            <FormGroup controlId="password">
                <InputGroup>
                    <InputGroupAddon>
                        <FaKey />
                    </InputGroupAddon>
                    <FormControl name="password" type="password" placeholder="Contraseña" value={authData.password} onChange={(value) => handleChange(value, 'password')} />
                </InputGroup>
            </FormGroup>
            <Button appearance="link" color="blue">¿Olvidó su contraseña?</Button>
            <FormGroup>
                <ButtonToolbar>
                    <Button block appearance="primary" onClick={signIn}>Ingresar</Button>
                </ButtonToolbar>
            </FormGroup>
        </Form>
    );
}