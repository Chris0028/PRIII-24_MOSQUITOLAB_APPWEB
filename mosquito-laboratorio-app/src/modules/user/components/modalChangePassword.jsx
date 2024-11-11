import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button, Form, Message, Modal, useToaster } from "rsuite";
import FormControl from "rsuite/esm/FormControl";
import FormGroup from "rsuite/esm/FormGroup";
import InputGroupAddon from "rsuite/esm/InputGroup/InputGroupAddon";
import InputGroupButton from "rsuite/esm/InputGroup/InputGroupButton";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalHeader from "rsuite/esm/Modal/ModalHeader";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import { changePasswordAsync } from "../../auth/services/authService";
import { useDispatch, useSelector } from "react-redux";
import { decodeToken } from "../../../utils/decoder";
import { validatePassword } from "../../../utils/passwordValidator";
import { clearUser } from "../../../redux/userSlice";

export default function ModalChangePassword({ open, hiddeModal }) {

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
    const user = useSelector((state) => state.user.user);
    const toaster = useToaster();
    const dispatch = useDispatch();

    function togglePasswordVisibility(showPassword, value) {
        showPassword(!value);
    }

    function handleChange(value, name) {
        setPasswords({
            ...passwords,
            [name]: value
        });
    }

    async function changePassword(e) {
        e.preventDefault();
        if (validatePassword(passwords.newPassword)) {
            let userName = decodeToken(user.jwt);
            const success = await changePasswordAsync(passwords, userName.sub);
            if (success) {
                showNotification('success', 'La contraseña se cambio correctamente.', 3000);
                dispatch(clearUser());
                localStorage.clear();
            } else {
                showNotification('error', 'Las contraseñas no coinciden.', 3000);
            }
        } else {
            showNotification('error', 'La contraseña debe contener mínimo 8 caracteres, al menos una letra, un número, y un simbolo como: @.-_*()&$!', 5000);
        }


    }

    function showNotification(type, message, duration) {
        toaster.push(
            <Message type={type} showIcon closable>
                {message}
            </Message>,
            { duration: duration }
        );
    }

    return (
        <Modal overflow open={open} onClose={hiddeModal}>
            <ModalHeader>
                <ModalTitle>
                    <strong>Cambio de contraseña</strong>
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form fluid>
                    <FormGroup controlId="oldPassword">
                        <InputGroupAddon>
                            <FormControl
                                type={showOldPassword ? "text" : "password"}
                                value={passwords.oldPassword}
                                onChange={(value) => handleChange(value, 'oldPassword')}
                                name="oldPassword"
                                placeholder="Contraseña actual" />
                            <InputGroupButton onClick={() => togglePasswordVisibility(setShowOldPassword, showOldPassword)}>
                                {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                            </InputGroupButton>
                        </InputGroupAddon>
                    </FormGroup>

                    <FormGroup controlId="newPassword">
                        <InputGroupAddon>
                            <FormControl
                                type={showNewPassword ? "text" : "password"}
                                value={passwords.newPassword}
                                onChange={(value) => handleChange(value, 'newPassword')}
                                name="newPassword"
                                placeholder="Nueva contraseña" />
                            <InputGroupButton onClick={() => togglePasswordVisibility(setShowNewPassword, showNewPassword)}>
                                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                            </InputGroupButton>
                        </InputGroupAddon>
                    </FormGroup>

                    <FormGroup controlId="confirmPassword">
                        <InputGroupAddon>
                            <FormControl
                                type={showConfirmPassword ? "text" : "password"}
                                value={passwords.confirmPassword}
                                onChange={(value) => handleChange(value, 'confirmPassword')}
                                name="confirmPassword"
                                placeholder="Confirmar contraseña" />
                            <InputGroupButton onClick={() => togglePasswordVisibility(setShowConfirmPassword, showConfirmPassword)}>
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </InputGroupButton>
                        </InputGroupAddon>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button onClick={(e) => changePassword(e)} appearance="primary">Aceptar</Button>
                <Button onClick={() => {
                    hiddeModal();
                    setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
                }}>Cancelar</Button>
            </ModalFooter>
        </Modal>
    );
}