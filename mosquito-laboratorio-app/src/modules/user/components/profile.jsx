import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProfileAsync, updateProfileAsync } from "../services/userService";
import { decodeToken } from "../../../utils/decoder"
import { Button, ButtonToolbar, Divider, FlexboxGrid, Form, Input, Message, useToaster } from "rsuite";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import FormGroup from "rsuite/esm/FormGroup";
import FormControlLabel from "rsuite/esm/FormControlLabel";
import ModalChangePassword from "./modalChangePassword";

export default function Profile() {

    const [profile, setProfile] = useState({
        userName: '',
        name: '',
        lastName: '',
        secondLastName: '',
        phone: '',
        email: '',
        sedes: ''
    });
    const [currentRole, setCurrentRole] = useState('');
    const user = useSelector((state) => state.user.user);
    //UI
    const [disabledControls, setDisabledControls] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [showModalChangePassword, setShowModalChangePassword] = useState(false);

    const toaster = useToaster();

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
        setProfile({
            userName: '',
            name: '',
            lastName: '',
            secondLastName: '',
            phone: '',
            email: '',
            sedes: ''
        });
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
                                    onClick={handleSave}>
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
            <Form fluid style={{ paddingLeft: 50, paddingRight: 50 }}>
                <FlexboxGrid justify="space-between" align="middle">

                    <Divider><strong>Usuario</strong></Divider>

                    <FlexboxGridItem colspan={10}>
                        <FormGroup>
                            <FormControlLabel>Nombre de usuario</FormControlLabel>
                            <Input
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
                            <Input
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
                            <Input
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
                            <Input
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
                            <Input
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
                            <Input
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
                                    <Input
                                        disabled={disabledControls}
                                        placeholder="Sedes"
                                        name="sedes"
                                        onChange={(value) => handleChange(value, 'sedes')}
                                        value={profile.sedes} />
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