import { useEffect, useState } from "react";
import { Button, Form, InputPicker, Modal } from "rsuite";
import FormControlLabel from "rsuite/esm/FormControlLabel";
import FormGroup from "rsuite/esm/FormGroup";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalHeader from "rsuite/esm/Modal/ModalHeader";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import { diagnosticMethodsByDisease, laboratoryResults, sampleTypes } from "../services/testService";

export default function TestForm({ open, hiddeModal }) {

    const [diagnostics, setDiagnostics] = useState([]);
    const [samples, setSamples] = useState([]);
    const [results, setResults] = useState([]);

    useEffect(() => {
        setDiagnostics(diagnosticMethodsByDisease(1));
        setSamples(sampleTypes());
        setResults(laboratoryResults());
    }, [open]);

    return (
        <Modal size={'lg'} open={open} onClose={hiddeModal}>
            <ModalHeader>
                <ModalTitle>Nuevo Resultado</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup controlId="sampleType">
                        <FormControlLabel>Tipo de muestra</FormControlLabel>
                        <InputPicker name="sampleType" data={samples.map(sample => ({ label: sample, value: sample }))} />
                    </FormGroup>
                    <FormGroup controlId="diagnosticMethod">
                        <FormControlLabel>Método de diagnóstico</FormControlLabel>
                        <InputPicker name="diagnosticMethod" data={diagnostics.map(diagnostic => ({ label: diagnostic, value: diagnostic }))} />
                    </FormGroup>
                    <FormGroup controlId="diagnosticMethod">
                        <FormControlLabel>Resultado de laboratorio</FormControlLabel>
                        <InputPicker name="diagnosticMethod" data={results.map(result => ({ label: result, value: result }))} />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button onClick={hiddeModal}>Guardar</Button>
                <Button onClick={hiddeModal}>Cancelar</Button>
            </ModalFooter>
        </Modal>
    )
}