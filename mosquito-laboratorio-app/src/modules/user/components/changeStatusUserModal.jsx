import { FaExclamationTriangle } from "react-icons/fa";
import { Button, Modal } from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalHeader from "rsuite/esm/Modal/ModalHeader";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import { changeStatusUserAsync } from "../services/userService";

export default function ChangeStatusUserModal({ open, hiddeModal, userId, toChangeStatus, username, refreshUsers }) {

    async function changeStatus(id) {
        let success;
        switch (toChangeStatus) {
            case 'DI':
                success = await changeStatusUserAsync(id, 0);
                break;
            case 'EN':
                success = await changeStatusUserAsync(id, 1);
                break;
            default:
                success = await changeStatusUserAsync(id, 2);
                break;
        }
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
                {toChangeStatus === 'DI' ? (
                    <section>
                        <p style={{ fontWeight: 'bold' }}>
                            Inhabilitar al usuario {username}?
                        </p>
                        <p>
                            Tenga en cuenta que después de confirmar esta acción, el usuario no podrá acceder al sistema.
                        </p>
                    </section>
                ) : toChangeStatus === 'EN' ? (
                    <section>
                        <p style={{ fontWeight: 'bold' }}>
                            Habilitar al usuario {username}?
                        </p>
                        <p>
                            El usuario podrá acceder al sistema.
                        </p>
                    </section>
                ) : (
                    <section>
                        <p style={{ fontWeight: 'bold' }}>
                            Eliminar al usuario {username}?
                        </p>
                        <p>
                            El usuario será eliminado del sistema.
                        </p>
                    </section>
                )}
            </ModalBody>
            <ModalFooter>
                <Button
                    onClick={async () => changeStatus(userId)}
                    appearance="primary"
                    color={toChangeStatus === 'DE' ? 'red' : toChangeStatus === 'DI' ? 'red' : 'blue'}>
                    Aceptar
                </Button>
                <Button
                    onClick={hiddeModal}>
                    Cancelar
                </Button>
            </ModalFooter>
        </Modal>
    );
}