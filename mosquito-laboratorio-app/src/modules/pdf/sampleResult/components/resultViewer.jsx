import { PDFViewer } from '@react-pdf/renderer';
import { Button, Modal } from 'rsuite';
import ModalBody from 'rsuite/esm/Modal/ModalBody';
import ModalFooter from 'rsuite/esm/Modal/ModalFooter';
import ModalHeader from 'rsuite/esm/Modal/ModalHeader';
import ModalTitle from 'rsuite/esm/Modal/ModalTitle';

export default function ResultViewer({ pdfToView, open, hiddeModal }) {
    return (
        <Modal open={open} onClose={hiddeModal} size={'lg'}>
            <ModalHeader>
                <ModalTitle>
                    <strong>Vista previa</strong>
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                <PDFViewer showToolbar children={pdfToView} height={600} width={'100%'} />
            </ModalBody>
            <ModalFooter>
                <Button onClick={() => hiddeModal()}>Cerrar</Button>
            </ModalFooter>
        </Modal>
    );
}