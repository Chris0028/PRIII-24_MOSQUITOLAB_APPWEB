import { useEffect, useState } from "react";
import { Button, Divider, FlexboxGrid, Form, InputPicker, Modal, Schema } from "rsuite";
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
import FormControl from "rsuite/esm/FormControl";
import { regexName, regexEmail, regexPhone } from "../../../utils/validator";

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

    const { StringType } = Schema.Types;

    const model = Schema.Model({
        email: StringType()
            .isEmail('La dirección de correo no es correcta (ejemplo@ejemplo.com)')
            .isRequired('El correo electrónico es obligatorio'),
        phone: StringType()
            .isRequired('El número de teléfono es obligatorio')
            .pattern(regexPhone, 'El número de celular no es correcto, solo debe contener números'),
        role: StringType()
            .isRequired('El cargo del usuario es obligatorio'),
        name: StringType()
            .isRequired('El nombre es obligatorio')
            .pattern(regexName, 'El nombre debe empezar por mayúscula y solo puede contener letras'),
        lastName: StringType().isRequired('El apellido paterno es obligatorio')
            .pattern(regexName, 'El apellido debe empezar por mayúscula y solo puede contener letras'),
        secondLastName: StringType()
            .pattern(regexName, 'El apellido debe empezar por mayúscula y solo puede contener letras'),
        workPlace: StringType().isRequired('El lugar de trabajo es obligatorio')
    })

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
        clearNewUser.name = clearNewUser.name.trim();
        clearNewUser.lastName = clearNewUser.lastName.trim();
        if (clearNewUser.secondLastName) {
            clearNewUser.secondLastName = clearNewUser.secondLastName.trim();
        }
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

    return (
        <Modal open={open} onClose={hiddeModal} overflow>
            <ModalHeader>
                <ModalTitle style={{ fontWeight: 'bold' }}>
                    Nuevo Usuario
                </ModalTitle>
            </ModalHeader>
            <Form fluid model={model} onSubmit={(checkStatus) => checkStatus && createUser()}>
                <ModalBody>
                    <FlexboxGrid align="middle" justify="space-between">
                        <Divider style={{ fontWeight: 'bold' }}>Cargo del usuario</Divider>
                        <FlexboxGridItem colspan={13}>
                            <FormGroup controlId="role">
                                <FormControlLabel>Cargo del usuario</FormControlLabel>
                                <FormControl
                                    accepter={InputPicker}
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
                                <FormControl
                                    name="name"
                                    value={newUser.name}
                                    onChange={(value) => handleChange(value, 'name')}
                                    placeholder="Ingrese los nombres del usuario" />
                            </FormGroup>
                        </FlexboxGridItem>
                        <FlexboxGridItem colspan={11} style={{ marginBottom: '20px' }}>
                            <FormGroup controlId="lastName">
                                <FormControlLabel>Apellido paterno</FormControlLabel>
                                <FormControl
                                    name="lastName"
                                    value={newUser.lastName.trim()}
                                    onChange={(value) => handleChange(value, 'lastName')}
                                    placeholder="Ingrese el apellido paterno" />
                            </FormGroup>
                        </FlexboxGridItem>
                        <FlexboxGridItem colspan={11} style={{ marginBottom: '20px' }}>
                            <FormGroup controlId="secondLastName">
                                <FormControlLabel>Apellido materno</FormControlLabel>
                                <FormControl
                                    name="secondLastName"
                                    value={newUser.secondLastName.trim()}
                                    onChange={(value) => handleChange(value, 'secondLastName')}
                                    placeholder="Ingrese el apellido materno (Opcional)" />
                            </FormGroup>
                        </FlexboxGridItem>

                        <Divider style={{ fontWeight: 'bold' }}>Información de contacto</Divider>

                        <FlexboxGridItem colspan={11} style={{ marginBottom: '20px' }}>
                            <FormGroup controlId="phone">
                                <FormControlLabel>Nro de celular</FormControlLabel>
                                <FormControl
                                    name="phone"
                                    value={newUser.phone.trim()}
                                    onChange={(value) => handleChange(value, 'phone')}
                                    placeholder="Ingrese el nro de celular" />
                            </FormGroup>
                        </FlexboxGridItem>
                        <FlexboxGridItem colspan={11} style={{ marginBottom: '20px' }}>
                            <FormGroup controlId="email">
                                <FormControlLabel>Correo electrónico</FormControlLabel>
                                <FormControl
                                    name="email"
                                    value={newUser.email.trim()}
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
                                        <FormControl
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
                                        <FormControl
                                            accepter={InputPicker}
                                            name="workPlace"
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
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" appearance="primary">Aceptar</Button>
                    <Button
                        onClick={() => {
                            setNewUser({
                                role: '',
                                name: '',
                                lastName: '',
                                secondLastName: '',
                                phone: '',
                                email: '',
                                workplaceId: 0,
                                sedes: ''
                            });
                            hiddeModal();
                        }}>Cancelar</Button>
                </ModalFooter>
            </Form>
        </Modal >
    );
}