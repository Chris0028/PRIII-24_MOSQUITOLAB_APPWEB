import { useState } from "react";
import { FaKey, FaUser } from "react-icons/fa";
import { Button, ButtonToolbar, Form, InputGroup, Notification, useToaster } from "rsuite";
import FormControl from "rsuite/esm/FormControl";
import FormGroup from "rsuite/esm/FormGroup";
import InputGroupAddon from "rsuite/esm/InputGroup/InputGroupAddon";
import { authenticateAsync } from "../services/authService"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/userSlice";

export default function AuthForm() {

    const dispatch = useDispatch();
    const [authData, setAuthData] = useState({ username: '', password: '' });
    const navigate = useNavigate();
    const toaster = useToaster();

    function handleChange(value, name) {
        setAuthData({
            ...authData,
            [name]: value
        });
    }

    function showErrorNotification() {
        toaster.push(
            <Notification type='error' header='Error de autenticación' closable>
                <p>El usuario o la contraseña es incorrecta.</p>
            </Notification>,
            { placement: 'topCenter' }
        )
    }


    async function signIn(e) {
        e.preventDefault();
        const credentials = await authenticateAsync(authData);
        if (credentials != null) {
            localStorage.setItem('jwt', credentials.jwt);
            dispatch(setUser(credentials));
            navigate('/samples');
        } else {
            showErrorNotification();
        }
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
            <FormGroup style={{ textAlign:'right', marginTop:-20}}>
                <Button appearance="link" color="blue">¿Olvidó su contraseña?</Button>
            </FormGroup>
            <FormGroup>
                <ButtonToolbar>
                    <Button block appearance="primary" onClick={(e) => signIn(e)}>Ingresar</Button>
                </ButtonToolbar>
            </FormGroup>
        </Form>
    );
}