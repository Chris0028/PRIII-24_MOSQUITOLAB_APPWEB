import { useEffect, useState } from "react";
import { Button, Divider, FlexboxGrid, Form, Input, InputPicker, Modal } from "rsuite";
import FormControlLabel from "rsuite/esm/FormControlLabel";
import FormGroup from "rsuite/esm/FormGroup";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalHeader from "rsuite/esm/Modal/ModalHeader";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import { createResultAsync, diagnosticMethodsByDisease, laboratoryResults, sampleTypes } from "../services/testService";
import FormControl from "rsuite/esm/FormControl";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import { useSelector } from "react-redux";
import { decodeToken } from "../../../pages/layout/utils/decoder";

export default function TestForm({ open, hiddeModal, fileId }) {

    const [diagnostics, setDiagnostics] = useState([]);
    const [samples, setSamples] = useState([]);
    const [results, setResults] = useState([]);

    const userInfo = useSelector((state) => state.user.user);

    const [test, setTest] = useState({
        fileId: 0,
        sampleType: '',
        sampleObservation: '',
        testDiagnosticMethod: '',
        testResult: '',
        testObservation: '',
        lastUpdateUserId: 0
    });

    useEffect(() => {
        setDiagnostics(diagnosticMethodsByDisease(1));
        setSamples(sampleTypes());
        setResults(laboratoryResults());

        const userCredentials = decodeToken(userInfo.jwt);

        setTest(prevTest => ({
            ...prevTest,
            lastUpdateUserId: parseInt(userCredentials.userId),
            fileId: fileId
        }))

    }, [fileId]);

    function handleChange(value, name) {
        setTest({
            ...test,
            [name]: value
        });
    }

    async function sendResult() {
        if (test.sampleObservation === '') {
            test.sampleObservation = null;
        } else if (test.testObservation === '') {
            test.testObservation = null;
        }
        await createResultAsync(test);
    }

    return (
        <Modal size={'lg'} open={open} onClose={hiddeModal}>
            <ModalHeader>
                <ModalTitle style={{ fontWeight: 'bold' }}>Nuevo Resultado</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form fluid>
                    <FlexboxGrid justify="space-between" align="middle">
                        <Divider style={{ fontWeight: 'bold' }}>Muestra</Divider>
                        <FlexboxGridItem colspan={10} style={{ marginBottom: '20px' }}>
                            <FormGroup controlId="sampleType">
                                <FormControlLabel>Tipo de muestra tomada</FormControlLabel>
                                <InputPicker style={{ width: '100%' }}
                                    placeholder="Muestra"
                                    onChange={(value) => handleChange(value, 'sampleType')}
                                    name="sampleType"
                                    data={samples.map(sample => ({ label: sample, value: sample }))} />
                            </FormGroup>
                        </FlexboxGridItem>
                        <FlexboxGridItem colspan={12} style={{ marginBottom: '20px' }}>
                            <FormGroup controlId="laboratory">
                                <FormControlLabel>Laboratorio que procesa la muestra</FormControlLabel>
                                <FormControl disabled
                                    name="laboratory"
                                    style={{ width: '100%' }}
                                    value={userInfo.info.laboratory} />
                            </FormGroup>
                        </FlexboxGridItem>

                        <FlexboxGridItem colspan={24}>
                            <FormGroup controlId="sampleObservation">
                                <FormControlLabel>Observación de la muestra</FormControlLabel>
                                <Input
                                    as={"textarea"}
                                    placeholder="Opcional(*)"
                                    style={{ width: '100%' }}
                                    name="sampleObservation"
                                    value={test.sampleObservation}
                                    onChange={(value) => handleChange(value, 'sampleObservation')} />
                            </FormGroup>
                        </FlexboxGridItem>

                        <Divider style={{ fontWeight: 'bold' }}>Resultado</Divider>

                        <FlexboxGridItem colspan={10} style={{ marginBottom: '20px' }}>
                            <FormGroup controlId="testDiagnosticMethod">
                                <FormControlLabel>Método de diagnóstico</FormControlLabel>
                                <InputPicker
                                    style={{ width: '100%' }}
                                    placeholder="Diagnóstico"
                                    onChange={(value) => handleChange(value, 'testDiagnosticMethod')}
                                    name="testDiagnosticMethod"
                                    data={diagnostics.map(diagnostic => ({ label: diagnostic, value: diagnostic }))} />
                            </FormGroup>
                        </FlexboxGridItem>
                        <FlexboxGridItem colspan={12} style={{ marginBottom: '20px' }}>
                            <FormGroup controlId="testResult">
                                <FormControlLabel>Resultado de laboratorio</FormControlLabel>
                                <InputPicker
                                    style={{ width: '100%' }}
                                    placeholder="Resultado"
                                    onChange={(value) => handleChange(value, 'testResult')}
                                    name="testResult"
                                    data={results.map(result => ({ label: result, value: result }))} />
                            </FormGroup>
                        </FlexboxGridItem>
                        <FlexboxGridItem colspan={24} style={{ marginBottom: '20px' }}>
                            <FormGroup controlId="resultObservation">
                                <FormControlLabel>Observación del resultado</FormControlLabel>
                                <Input
                                    as={"textarea"}
                                    placeholder="Opcional(*)"
                                    style={{ width: '100%' }}
                                    name="testObservation"
                                    value={test.resultObservation}
                                    onChange={(value) => handleChange(value, 'testObservation')} />
                            </FormGroup>
                        </FlexboxGridItem>
                    </FlexboxGrid>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button
                    appearance="primary"
                    onClick={async () => await sendResult()}>Guardar</Button>
                <Button onClick={hiddeModal}>Cancelar</Button>
            </ModalFooter>
        </Modal>
    )
}