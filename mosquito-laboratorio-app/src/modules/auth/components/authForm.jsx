import { useState } from "react";
import { FaKey, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { Button, ButtonToolbar, Form, InputGroup, Message, useToaster } from "rsuite";
import FormControl from "rsuite/esm/FormControl";
import FormGroup from "rsuite/esm/FormGroup";
import InputGroupAddon from "rsuite/esm/InputGroup/InputGroupAddon";
import { authenticateAsync } from "../services/authService"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/userSlice";
import { decodeToken } from "../../../utils/decoder"

export default function AuthForm() {

    const dispatch = useDispatch();
    const [authData, setAuthData] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const toaster = useToaster();

    function handleChange(value, name) {
        setAuthData({
            ...authData,
            [name]: value
        });
    }

    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    }

    function showErrorNotification(content) {
        toaster.push(
            <Message type='error' header='Error de autenticación' closable showIcon>
                <p>{content}.</p>
            </Message>,
            { duration: 3000 }
        );
    }

    function getRole(jwt) {
        return decodeToken(jwt).role;
    }

    function getUsername(jwt) {
        return decodeToken(jwt).sub;
    }

    async function signIn(e) {
        e.preventDefault();
        const credentials = await authenticateAsync(authData);
        if (credentials != null) {
            if (credentials.firstLogin < 1) {
                let user = getUsername(credentials.jwt);
                navigate(`/changepassword/${user}`);
            } else {
                if (credentials.status === 1) {
                    localStorage.setItem('jwt', credentials.jwt);
                    dispatch(setUser(credentials));
                    if (getRole(credentials.jwt) !== 'Doctor') {
                        navigate('/homefilelabo');
                    } else {
                        navigate('/homefiledoctor');
                    }
                } else if (credentials.status === 0) {
                    showErrorNotification('El usuario no tiene permiso para acceder al sistema porque está deshabilitado, para más información contáctese con su administrador.')
                } else {
                    showErrorNotification('El usuario no existe.');
                }
            }
            setAuthData({ username: '', password: '' })
        } else {
            showErrorNotification('El usuario o la contraseña es incorrecta.');
            setAuthData({ username: '', password: '' })
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            signIn(e);
        }
    }

    return (
        <Form fluid onKeyDown={(e) => handleKeyDown(e)}>
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
                    <FormControl name="password" type={showPassword ? "text" : "password"} placeholder="Contraseña" value={authData.password} onChange={(value) => handleChange(value, 'password')} />
                    <InputGroup.Button onClick={togglePasswordVisibility}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </InputGroup.Button>
                </InputGroup>
            </FormGroup>
            <FormGroup style={{ textAlign: 'right', marginTop: -20 }}>
                <Button appearance="link">¿Olvidó su contraseña?</Button>
            </FormGroup>
            <FormGroup>
                <ButtonToolbar>
                    <Button block appearance="primary" onClick={(e) => signIn(e)}>Ingresar</Button>
                </ButtonToolbar>
            </FormGroup>
        </Form>
    );
}