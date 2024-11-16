import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProfileAsync, updateProfileAsync } from "../services/userService";
import { decodeToken } from "../../../utils/decoder"
import { Button, ButtonToolbar, Divider, FlexboxGrid, Form, Message, Schema, useToaster } from "rsuite";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import FormGroup from "rsuite/esm/FormGroup";
import FormControlLabel from "rsuite/esm/FormControlLabel";
import ModalChangePassword from "./modalChangePassword";
import { regexName, regexEmail, regexPhone } from "../../../utils/validator";
import FormControl from "rsuite/esm/FormControl";

export default function Profile() {

    const [profile, setProfile] = useState({
        userName: '',
        name: '',
        lastName: '',
        secondLastName: '',
        phone: '',
        email: '',
        sedes: '',
        userId: 0
    });
    const [currentRole, setCurrentRole] = useState('');
    const user = useSelector((state) => state.user.user);
    //UI
    const [disabledControls, setDisabledControls] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [showModalChangePassword, setShowModalChangePassword] = useState(false);

    const toaster = useToaster();
    const { StringType } = Schema.Types;

    const model = Schema.Model({
        username: StringType()
            .isRequired('El nombre de usuario es obligatorio'),
        name: StringType()
            .isRequired('El nombre es obligatorio')
            .pattern(regexName, 'El nombre debe empezar por mayúscula y solo puede contener letras'),
        lastName: StringType()
            .isRequired('El apellido paterno es obligatorio')
            .pattern(regexName, 'El apellido debe empezar por mayúscula y solo puede contener letras'),
        secondLastName: StringType()
            .pattern(regexName, 'El apellido debe empezar por mayúscula y solo puede contener letras'),
        email: StringType()
            .isEmail('La dirección de correo no es correcta (ejemplo@ejemplo.com)')
            .isRequired('El correo electrónico es obligatorio'),
        phone: StringType()
            .isRequired('El número de teléfono es obligatorio')
            .pattern(regexPhone, 'El número de celular no es correcto, solo debe contener números')
    })

    useEffect(() => {
        const credentials = decodeToken(user.jwt);
        setCurrentRole(credentials.role);
        getProfile(credentials.userId, credentials.role);
        setProfile({ userId: credentials.userId })
    }, []);

    async function getProfile(id, role) {
        const data = await getProfileAsync(role, id);
        if (data.secondLastName === null)
            data.secondLastName = '';
        setProfile(data);
    }

    function handleOpenModalChangePassword() {
        setShowModalChangePassword(true);
    }

    function handleCloseModalChangePassword() {
        setShowModalChangePassword(false);
    }

    function handleEdit() {
        setDisabledControls(false);
        setIsEditing(true);
    }

    async function handleSave() {
        setDisabledControls(true);
        setIsEditing(false);
        const success = await updateProfileAsync(profile, decodeToken(user.jwt).userId);
        if (success) {
            showNotification('success', 'Su cuenta se actualizó correctamente.', 'Éxito');
        } else {
            showNotification('success', 'No fue posible actualizar su cuenta.', 'Algo salió mal');
        }
    }

    function showNotification(type, message, header) {
        toaster.push(
            <Message type={type} showIcon closable header={header}>
                {message}
            </Message>,
            { duration: 3000 }
        );
    }

    function handleCancel() {
        setDisabledControls(true);
        setIsEditing(false);
        const credentials = decodeToken(user.jwt);
        getProfile(credentials.userId, credentials.role);
    }

    function handleChange(value, name) {
        setProfile({
            ...profile,
            [name]: value
        });
    }

    return (
        <>
            <FlexboxGrid justify="start" align="middle">
                <FlexboxGridItem>
                    <h3 style={{ marginLeft: 50, marginBottom: 10, marginTop: 10 }}>Mi cuenta</h3>
                </FlexboxGridItem>
            </FlexboxGrid>
            <Form model={model} fluid style={{ paddingLeft: 50, paddingRight: 50 }} onSubmit={(checkStatus) => checkStatus && handleSave()}>
                <FlexboxGrid justify="end" style={{ marginTop: -50, marginRight: 50 }} align="middle">
                    <FlexboxGridItem>
                        <ButtonToolbar>
                            {!isEditing && (
                                <Button
                                    style={{ width: 100, padding: 10 }}
                                    appearance="primary"
                                    onClick={handleEdit}>
                                    Editar cuenta
                                </Button>
                            )}
                            {isEditing && (
                                <>
                                    <Button
                                        style={{ padding: 10 }}
                                        appearance="primary"
                                        type="submit">
                                        Guardar cambios
                                    </Button>
                                    <Button
                                        style={{ width: 100, padding: 10 }}
                                        onClick={handleCancel}>
                                        Cancelar
                                    </Button>
                                </>
                            )}
                        </ButtonToolbar>
                    </FlexboxGridItem>
                </FlexboxGrid>
                <FlexboxGrid justify="space-between" align="middle">

                    <Divider><strong>Usuario</strong></Divider>

                    <FlexboxGridItem colspan={10}>
                        <FormGroup>
                            <FormControlLabel>Nombre de usuario</FormControlLabel>
                            <FormControl
                                disabled={disabledControls}
                                placeholder="Usuario"
                                name="username"
                                onChange={(value) => handleChange(value, 'userName')}
                                value={profile.userName} />
                        </FormGroup>
                    </FlexboxGridItem>

                    <FlexboxGridItem colspan={12}>
                        <FormGroup>
                            <Button
                                style={{ marginTop: 20 }}
                                appearance="primary"
                                onClick={() => handleOpenModalChangePassword()}>
                                Cambiar contraseña
                            </Button>
                        </FormGroup>
                    </FlexboxGridItem>

                    <Divider><strong>Información personal</strong></Divider>

                    <FlexboxGridItem colspan={11}>
                        <FormGroup>
                            <FormControlLabel>Nombres</FormControlLabel>
                            <FormControl
                                disabled={disabledControls}
                                style={{ marginBottom: '20px' }}
                                placeholder="Nombres"
                                name="name"
                                onChange={(value) => handleChange(value, 'name')}
                                value={profile.name} />
                        </FormGroup>
                    </FlexboxGridItem>

                    <FlexboxGridItem colspan={11}>
                        <FormGroup>
                            <FormControlLabel>Apellido paterno</FormControlLabel>
                            <FormControl
                                disabled={disabledControls}
                                style={{ marginBottom: '20px' }}
                                placeholder="Apellido paterno"
                                name="lastName"
                                onChange={(value) => handleChange(value, 'lastName')}
                                value={profile.lastName} />
                        </FormGroup>
                    </FlexboxGridItem>

                    <FlexboxGridItem colspan={11}>
                        <FormGroup>
                            <FormControlLabel>Apellido materno</FormControlLabel>
                            <FormControl
                                disabled={disabledControls}
                                placeholder="Apellido Materno (Opcional)"
                                name="secondLastName"
                                onChange={(value) => handleChange(value, 'secondLastName')}
                                value={profile.secondLastName} />
                        </FormGroup>
                    </FlexboxGridItem>

                    <Divider><strong>Información de contacto</strong></Divider>

                    <FlexboxGridItem colspan={10}>
                        <FormGroup>
                            <FormControlLabel>Número de celular</FormControlLabel>
                            <FormControl
                                disabled={disabledControls}
                                placeholder="Celular"
                                name="phone"
                                onChange={(value) => handleChange(value, 'phone')}
                                value={profile.phone} />
                        </FormGroup>
                    </FlexboxGridItem>

                    <FlexboxGridItem colspan={10}>
                        <FormGroup>
                            <FormControlLabel>Correo Electrónico</FormControlLabel>
                            <FormControl
                                disabled={disabledControls}
                                placeholder="Correo electrónico"
                                name="email"
                                onChange={(value) => handleChange(value, 'email')}
                                value={profile.email} />
                        </FormGroup>
                    </FlexboxGridItem>

                    {currentRole === 'Doctor' && (
                        <>
                            <Divider><strong>SEDES</strong></Divider>

                            <FlexboxGridItem colspan={10}>
                                <FormGroup>
                                    <FormControlLabel>SEDES</FormControlLabel>
                                    <FormControl
                                        disabled={disabledControls}
                                        placeholder="Sedes"
                                        name="sedes"
                                        onChange={(value) => handleChange(value, 'sedes')}
                                        value={'Cochabamba'} />
                                </FormGroup>
                            </FlexboxGridItem>
                        </>
                    )}
                </FlexboxGrid>
            </Form>
            <ModalChangePassword open={showModalChangePassword} hiddeModal={handleCloseModalChangePassword} />
        </>
    );
}