import { Button, FlexboxGrid, Form, Modal } from "rsuite";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import FormControlLabel from "rsuite/esm/FormControlLabel";
import FormGroup from "rsuite/esm/FormGroup";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalHeader from "rsuite/esm/Modal/ModalHeader";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import UMA from "../../../../public/static/logo-UMA-2023_BN-positivo.png";
import UNIVALLE from "../../../../public/static/LOGO-UNIVALLE-04.png";

export default function DevsModal({ open, hiddeModal }) {
    return (
        <Modal open={open} onClose={hiddeModal}>
            <ModalHeader>
                <ModalTitle>
                    <strong>Desarrollado por:</strong>
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <FormControlLabel>
                            <strong>
                                Christian Elias Gonzales Encinas
                            </strong>
                        </FormControlLabel>
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel>
                            <strong>
                                Cesar Alberto Peñaloza Tapia
                            </strong>
                        </FormControlLabel>
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel>
                            <strong>
                                Teddy Andres Fernandez Lopez
                            </strong>
                        </FormControlLabel>
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel>
                            <strong>Elias Nahuel Gutierrez Vargas</strong>
                        </FormControlLabel>
                    </FormGroup>
                </Form>
                <FlexboxGrid justify="end" align="middle" style={{ marginTop: '10px' }}>
                    <FlexboxGridItem>
                        <img src={UNIVALLE} alt="UNIVALLE" style={{ width: 40, marginRight: 20 }} />
                    </FlexboxGridItem>
                    <FlexboxGridItem>
                        <img src={UMA} alt="UMA" style={{ width: 80 }} />
                    </FlexboxGridItem>
                </FlexboxGrid>
            </ModalBody>
            <ModalFooter>
                <Button onClick={() => hiddeModal()}>Cerrar</Button>
            </ModalFooter>
        </Modal>
    );
}