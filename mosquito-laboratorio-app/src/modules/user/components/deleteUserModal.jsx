import { FaExclamationTriangle } from "react-icons/fa";
import { Button, Modal } from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalHeader from "rsuite/esm/Modal/ModalHeader";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import { deleteUserAsync } from "../services/userService";

export default function DeleteUserModal({ open, hiddeModal, userId, username, refreshUsers }) {

    async function deleteUser(id) {
        const success = await deleteUserAsync(id);
        if (success) {
            hiddeModal();
            refreshUsers();
        }
    }

    return (
        <Modal open={open} onClose={hiddeModal} overflow>
            <ModalHeader>
                <ModalTitle>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <FaExclamationTriangle style={{ marginRight: 10 }} />
                        <strong>Advertencia</strong>
                    </div>
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                <section>
                    <p style={{ fontWeight: 'bold' }}>
                        Inhabilitar al usuario {username}?
                    </p>
                    <p>
                        Tenga en cuenta que después de confirmar esta acción, el usuario no podrá acceder al sistema.
                    </p>
                </section>
            </ModalBody>
            <ModalFooter>
                <Button onClick={async () => deleteUser(userId)} appearance="primary" color="red">Eliminar</Button>
                <Button onClick={hiddeModal}>Cancelar</Button>
            </ModalFooter>
        </Modal>
    );
}