import { useEffect, useState } from "react";
import { Button, Divider, FlexboxGrid, Form, Input, InputPicker, Modal } from "rsuite";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import FormControlLabel from "rsuite/esm/FormControlLabel";
import FormGroup from "rsuite/esm/FormGroup";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalHeader from "rsuite/esm/Modal/ModalHeader";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import { createUserAsync, getRoles } from "../services/userService";
import { getNamesNIdsOfLabos } from "../../../modules/file/services/laboratoryService";
import { getNamesNIdsOfHospitals } from "../../../modules/file/services/hospitalService";
import { validateName, validateEmail, validatePhoneNumber } from "../../../utils/validator";

export default function CreateUserModal({ open, hiddeModal, refreshUsers }) {

    const [roles, setRoles] = useState([]);
    const [newUser, setNewUser] = useState({
        role: '',
        name: '',
        lastName: '',
        secondLastName: '',
        phone: '',
        email: '',
        workplaceId: 0,
        sedes: ''
    });
    const [currentRole, setCurrentRole] = useState('');
    const [workplaces, setWorkplaces] = useState([]);

    useEffect(() => {
        setRoles(getRoles());
    }, []);

    function handleChange(value, name) {
        setNewUser({
            ...newUser,
            [name]: value
        });
    }

    async function createUser() {
        let clearNewUser = { ...newUser };
        Object.keys(clearNewUser).forEach(key => {
            if (clearNewUser[key] === '' || clearNewUser[key] == null) {
                delete clearNewUser[key];
            }
        });
        const res = await createUserAsync(clearNewUser);
        if (res !== null) {
            hiddeModal();
            refreshUsers();
        } else {
            console.log("Error al crear usuario");
        }
    }

    async function loadWorkplaces(role) {
        if (role !== 'Doctor')
            setWorkplaces(await getNamesNIdsOfLabos())
        else
            setWorkplaces(await getNamesNIdsOfHospitals());
    }

    function validate() {
        validateName(newUser.name);
        validateName(newUser.lastName);
        validateName(newUser.secondLastName);
        validateEmail(newUser.email);
        validatePhoneNumber(newUser.phone);
    }

    return (
        <Modal open={open} onClose={hiddeModal} overflow>
            <ModalHeader>
                <ModalTitle style={{ fontWeight: 'bold' }}>
                    Nuevo Usuario
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form fluid>
                    <FlexboxGrid align="middle" justify="space-between">
                        <Divider style={{ fontWeight: 'bold' }}>Cargo del usuario</Divider>
                        <FlexboxGridItem colspan={13}>
                            <FormGroup controlId="role">
                                <FormControlLabel>Cargo del usuario</FormControlLabel>
                                <InputPicker
                                    style={{ width: '100%' }}
                                    onChange={async (value) => {
                                        handleChange(value, 'role');
                                        setCurrentRole(value);
                                        await loadWorkplaces(value);
                                    }}
                                    placeholder="Seleccione el cargo del usuario"
                                    name="role"
                                    value={newUser.role}
                                    data={roles.map(role => ({ label: role.label, value: role.value }))} />
                            </FormGroup>
                        </FlexboxGridItem>

                        <Divider style={{ fontWeight: 'bold' }}>Información personal</Divider>

                        <FlexboxGridItem colspan={11} style={{ marginBottom: '20px' }}>
                            <FormGroup controlId="names">
                                <FormControlLabel>Nombres</FormControlLabel>
                                <Input
                                    value={newUser.name}
                                    onChange={(value) => handleChange(value, 'name')}
                                    placeholder="Ingrese los nombres del usuario" />
                            </FormGroup>
                        </FlexboxGridItem>
                        <FlexboxGridItem colspan={11} style={{ marginBottom: '20px' }}>
                            <FormGroup controlId="lastName">
                                <FormControlLabel>Apellido paterno</FormControlLabel>
                                <Input
                                    value={newUser.lastName}
                                    onChange={(value) => handleChange(value, 'lastName')}
                                    placeholder="Ingrese el apellido paterno" />
                            </FormGroup>
                        </FlexboxGridItem>
                        <FlexboxGridItem colspan={11} style={{ marginBottom: '20px' }}>
                            <FormGroup controlId="secondLastName">
                                <FormControlLabel>Apellido materno</FormControlLabel>
                                <Input
                                    value={newUser.secondLastName}
                                    onChange={(value) => handleChange(value, 'secondLastName')}
                                    placeholder="Ingrese el apellido materno (Opcional)" />
                            </FormGroup>
                        </FlexboxGridItem>

                        <Divider style={{ fontWeight: 'bold' }}>Información de contacto</Divider>

                        <FlexboxGridItem colspan={11} style={{ marginBottom: '20px' }}>
                            <FormGroup controlId="phone">
                                <FormControlLabel>Nro de celular</FormControlLabel>
                                <Input
                                    value={newUser.phone}
                                    onChange={(value) => handleChange(value, 'phone')}
                                    placeholder="Ingrese el nro de celular" />
                            </FormGroup>
                        </FlexboxGridItem>
                        <FlexboxGridItem colspan={11} style={{ marginBottom: '20px' }}>
                            <FormGroup controlId="email">
                                <FormControlLabel>Correo electrónico</FormControlLabel>
                                <Input
                                    value={newUser.email}
                                    onChange={(value) => handleChange(value, 'email')}
                                    placeholder="Ingrese el correo electrónico" />
                            </FormGroup>
                        </FlexboxGridItem>

                        {currentRole === 'Doctor' && (
                            <>
                                <Divider style={{ fontWeight: 'bold' }}>SEDES</Divider>
                                <FlexboxGridItem colspan={13} style={{ marginBottom: '20px' }}>
                                    <FormGroup controlId="sedes">
                                        <FormControlLabel>SEDES</FormControlLabel>
                                        <Input
                                            disabled
                                            value={'Cochabamba'}
                                            onChange={(value) => handleChange(value, 'sedes')} />
                                    </FormGroup>
                                </FlexboxGridItem>
                            </>
                        )}
                        {workplaces.length > 0 && (
                            <>
                                <Divider style={{ fontWeight: 'bold' }}>Lugar de trabajo</Divider>
                                <FlexboxGridItem colspan={13} style={{ marginBottom: '20px' }}>
                                    <FormGroup controlId="workPlace">
                                        <FormControlLabel>Lugar de trabajo</FormControlLabel>
                                        <InputPicker
                                            value={newUser.workplaceId}
                                            style={{ width: '100%' }}
                                            placeholder="Seleccione el lugar de trabajo"
                                            onChange={(value) => {
                                                handleChange(value, 'workplaceId');
                                            }}
                                            data={workplaces.map(workplace => ({ label: workplace.name, value: workplace.id }))} />
                                    </FormGroup>
                                </FlexboxGridItem>
                            </>
                        )}

                    </FlexboxGrid>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button onClick={() => createUser()} appearance="primary">Aceptar</Button>
                <Button onClick={hiddeModal}>Cancelar</Button>
            </ModalFooter>
        </Modal >
    );
}