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
        <Modal open={open} onClose={hiddeModal} size="xs" style={styles.modal}>
            <ModalHeader>
                <ModalTitle>
                    <strong>Desarrollado por:</strong>
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                <FlexboxGrid justify="center" align="middle">
                    <FlexboxGridItem colspan={24} style={styles.namesContainer}>
                        <Form>
                            {["Christian Elias Gonzales Encinas", "Cesar Alberto Peñaloza Tapia", "Teddy Andres Fernandez Lopez", "Elias Nahuel Gutierrez Vargas"].map((name, index) => (
                                <FormGroup key={index} style={styles.nameGroup}>
                                    <FormControlLabel>
                                        <strong>{name}</strong>
                                    </FormControlLabel>
                                </FormGroup>
                            ))}
                        </Form>
                    </FlexboxGridItem>
                    <FlexboxGridItem colspan={24} style={styles.imagesContainer}>
                        <FlexboxGrid justify="space-around" align="middle">
                            <FlexboxGridItem>
                                <img src={UNIVALLE} alt="UNIVALLE" style={styles.univalleLogo} />
                            </FlexboxGridItem>
                            <FlexboxGridItem>
                                <img src={UMA} alt="UMA" style={styles.umaLogo} />
                            </FlexboxGridItem>
                        </FlexboxGrid>
                    </FlexboxGridItem>
                </FlexboxGrid>
            </ModalBody>
            <ModalFooter>
                <Button onClick={hiddeModal} appearance="primary">
                    Cerrar
                </Button>
            </ModalFooter>
        </Modal>
    );
}

const styles = {
    modal: {
        textAlign: 'center',
    },
    namesContainer: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    nameGroup: {
        marginBottom: '10px',
    },
    imagesContainer: {
        marginTop: '10px',
    },
    univalleLogo: {
        width: '60px',
        marginRight: '20px',
    },
    umaLogo: {
        width: '110px',
    },
};
