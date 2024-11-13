import { Button, Modal } from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalHeader from "rsuite/esm/Modal/ModalHeader";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";

export default function DevsModal({ open, hiddeModal }) {
    return (
        <Modal open={open} onClose={hiddeModal}>
            <ModalHeader>
                <ModalTitle>
                    <strong>Desarrollado por:</strong>
                </ModalTitle>
            </ModalHeader>
            <ModalBody>

            </ModalBody>
            <ModalFooter>
                <Button onClick={() => hiddeModal()}>Cerrar</Button>
            </ModalFooter>
        </Modal>
    );
}