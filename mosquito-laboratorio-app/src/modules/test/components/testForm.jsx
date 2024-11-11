import { useEffect, useState } from "react";
import { Button, Divider, FlexboxGrid, Form, Input, InputPicker, Modal } from "rsuite";
import FormControlLabel from "rsuite/esm/FormControlLabel";
import FormGroup from "rsuite/esm/FormGroup";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalHeader from "rsuite/esm/Modal/ModalHeader";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import { createResultAsync, diagnosticMethodsByDisease, getCaseMethods, getCaseTypes, getResultAsync, laboratoryResults, sampleTypes } from "../services/testService";
import FormControl from "rsuite/esm/FormControl";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import { useSelector } from "react-redux";
import { decodeToken } from "../../../utils/decoder";
import { useNavigate } from "react-router-dom";

export default function TestForm({ open, hiddeModal, fileId, diseaseName, action, refreshHistoryLab }) {

    const [diagnostics, setDiagnostics] = useState([]);
    const [samples, setSamples] = useState([]);
    const [results, setResults] = useState([]);
    const [caseTypes, setCaseTypes] = useState([]);
    const [caseMethods, setCaseMethods] = useState([]);
    const [title, setTitle] = useState('');

    const userInfo = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    const [test, setTest] = useState({
        fileId: 0,
        caseType: '',
        caseMethod: '',
        sampleType: '',
        sampleObservation: '',
        testDiagnosticMethod: '',
        testResult: '',
        testObservation: '',
        lastUpdateUserId: 0
    });

    useEffect(() => {
        handleAction();

        setDiagnostics(diagnosticMethodsByDisease(diseaseName));
        setSamples(sampleTypes());
        setResults(laboratoryResults());
        setCaseTypes(getCaseTypes());
        setCaseMethods(getCaseMethods());

        const userCredentials = decodeToken(userInfo.jwt);

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
        const success = await createResultAsync(test);
        if (success) {
            hiddeModal();
            refreshHistoryLab();
        }
    }

    async function handleAction() {
        const userCredentials = decodeToken(userInfo.jwt);
        let userId = parseInt(userCredentials.userId);
        if (action === 'Edit') {
            setTitle('Editar resultado');
            const res = await getResultAsync(fileId);
            setTest({
                caseType: res.caseType,
                testDiagnosticMethod: res.diagnosticMethod,
                caseMethod: res.method,
                testResult: res.result,
                sampleObservation: res.sampleObservation !== null ? res.sampleObservation : '',
                sampleType: res.sampleType,
                testObservation: res.testObservation !== null ? res.testObservation : '',
                fileId: fileId,
                lastUpdateUserId: userId
            });
        } else {
            setTitle('Nuevo resultado');
            setTest(prevTest => ({
                ...prevTest,
                lastUpdateUserId: userId,
                fileId: fileId
            }));
        }
    }

    return (
        <Modal overflow size={'lg'} open={open} onClose={hiddeModal}>
            <ModalHeader>
                <ModalTitle style={{ fontWeight: 'bold' }}>{title}</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form fluid>
                    <FlexboxGrid justify="space-between" align="middle">

                        <Divider style={{ fontWeight: 'bold' }}>Definición de caso</Divider>

                        <FlexboxGridItem colspan={10} style={{ marginBottom: '20px' }}>
                            <FormGroup controlId="caseType">
                                <FormControlLabel>Tipo de caso</FormControlLabel>
                                <InputPicker style={{ width: '100%' }}
                                    placeholder="Seleccione tipo de caso"
                                    onChange={(value) => handleChange(value, 'caseType')}
                                    name="caseType"
                                    value={test.caseType}
                                    data={caseTypes.map(caseType => ({ label: caseType, value: caseType }))} />
                            </FormGroup>
                        </FlexboxGridItem>
                        <FlexboxGridItem colspan={12} style={{ marginBottom: '20px' }}>
                            <FormGroup controlId="caseMethod">
                                <FormControlLabel>Tipo de método de detección</FormControlLabel>
                                <InputPicker style={{ width: '100%' }}
                                    placeholder="Seleccione método de detección"
                                    onChange={(value) => handleChange(value, 'caseMethod')}
                                    name="caseMethod"
                                    value={test.caseMethod}
                                    data={caseMethods.map(caseMethod => ({ label: caseMethod, value: caseMethod }))} />
                            </FormGroup>
                        </FlexboxGridItem>

                        <Divider style={{ fontWeight: 'bold' }}>Muestra</Divider>

                        <FlexboxGridItem colspan={10} style={{ marginBottom: '20px' }}>
                            <FormGroup controlId="sampleType">
                                <FormControlLabel>Tipo de muestra tomada</FormControlLabel>
                                <InputPicker style={{ width: '100%' }}
                                    placeholder="Seleccione el tipo de muestra"
                                    onChange={(value) => handleChange(value, 'sampleType')}
                                    name="sampleType"
                                    value={test.sampleType}
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
                                    placeholder="Seleccione el método de diagnóstico"
                                    onChange={(value) => handleChange(value, 'testDiagnosticMethod')}
                                    name="testDiagnosticMethod"
                                    value={test.testDiagnosticMethod}
                                    data={diagnostics} />
                            </FormGroup>
                        </FlexboxGridItem>
                        <FlexboxGridItem colspan={12} style={{ marginBottom: '20px' }}>
                            <FormGroup controlId="testResult">
                                <FormControlLabel>Resultado de laboratorio</FormControlLabel>
                                <InputPicker
                                    style={{ width: '100%' }}
                                    placeholder="Seleccione el resultado de laboratorio"
                                    onChange={(value) => handleChange(value, 'testResult')}
                                    name="testResult"
                                    value={test.testResult}
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
                                    value={test.testObservation}
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
                <Button onClick={() => {
                    setTest({
                        caseType: '',
                        caseMethod: '',
                        sampleType: '',
                        sampleObservation: '',
                        testDiagnosticMethod: '',
                        testResult: '',
                        testObservation: '',
                        lastUpdateUserId: 0
                    });
                    hiddeModal();
                }}>Cancelar</Button>
            </ModalFooter>
        </Modal>
    )
}