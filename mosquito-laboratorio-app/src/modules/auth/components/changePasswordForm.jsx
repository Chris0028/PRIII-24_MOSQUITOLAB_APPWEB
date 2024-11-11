import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button, ButtonToolbar, Form, Message, useToaster } from "rsuite";
import FormControl from "rsuite/esm/FormControl";
import FormGroup from "rsuite/esm/FormGroup";
import InputGroupAddon from "rsuite/esm/InputGroup/InputGroupAddon";
import InputGroupButton from "rsuite/esm/InputGroup/InputGroupButton";
import { changePasswordAsync } from "../services/authService";
import { useNavigate, useParams } from "react-router-dom";
import { changeFirstLoginAsync } from "../../user/services/userService";
import { validatePassword } from "../../../utils/passwordValidator";

export default function ChangePasswordForm() {
    const { username } = useParams();
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
    const navigate = useNavigate();
    const toaster = useToaster();

    function togglePasswordVisibility(showPassword, value) {
        showPassword(!value);
    }

    async function changePassword(e) {
        e.preventDefault();
        if (validatePassword(passwords.newPassword)) {
            const success = await changePasswordAsync(passwords, username);
            if (success) {
                const firstLoginChanged = await changeFirstLoginAsync(username);
                if (firstLoginChanged) {
                    showNotification('success', 'La contraseña se cambio correctamente.');
                    navigate('/');
                }
            } else {
                showNotification('error', 'Las contraseñas no coinciden.');
                useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
            }
        } else {
            showNotification('error', 'La contraseña debe contener mínimo 8 caracteres, al menos una letra, un número, y un simbolo como: @.-_*()&$!');
        }
    }

    function handleChange(value, name) {
        setPasswords({
            ...passwords,
            [name]: value
        });
    }

    function showNotification(type, message) {
        toaster.push(
            <Message type={type} showIcon closable>
                {message}
            </Message>
        );
    }

    return (
        <Form fluid>
            <FormGroup controlId="oldPassword">
                <InputGroupAddon>
                    <FormControl type={showOldPassword ? "text" : "password"} value={passwords.oldPassword} onChange={(value) => handleChange(value, 'oldPassword')} name="oldPassword" placeholder="Contraseña actual" />
                    <InputGroupButton onClick={() => togglePasswordVisibility(setShowOldPassword, showOldPassword)}>
                        {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                    </InputGroupButton>
                </InputGroupAddon>
            </FormGroup>

            <FormGroup controlId="newPassword">
                <InputGroupAddon>
                    <FormControl type={showNewPassword ? "text" : "password"} value={passwords.newPassword} onChange={(value) => handleChange(value, 'newPassword')} name="newPassword" placeholder="Nueva contraseña" />
                    <InputGroupButton onClick={() => togglePasswordVisibility(setShowNewPassword, showNewPassword)}>
                        {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </InputGroupButton>
                </InputGroupAddon>
            </FormGroup>

            <FormGroup controlId="confirmPassword">
                <InputGroupAddon>
                    <FormControl type={showConfirmPassword ? "text" : "password"} value={passwords.confirmPassword} onChange={(value) => handleChange(value, 'confirmPassword')} name="confirmPassword" placeholder="Confirmar contraseña" />
                    <InputGroupButton onClick={() => togglePasswordVisibility(setShowConfirmPassword, showConfirmPassword)}>
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </InputGroupButton>
                </InputGroupAddon>
            </FormGroup>

            <FormGroup>
                <ButtonToolbar>
                    <Button onClick={(e) => changePassword(e)} block appearance="primary">Cambiar contraseña</Button>
                </ButtonToolbar>
            </FormGroup>
        </Form>
    );
}