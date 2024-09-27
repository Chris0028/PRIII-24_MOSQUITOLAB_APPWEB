import { useState } from 'react';
import { Steps, Panel, ButtonGroup, Button } from 'rsuite';
import FormStepOne from './formStepOne';
import FormStepTwo from './formStepTwo';

export default function FileForm() {
    const [step, setStep] = useState(0);

    const onChange = (nextStep) => {
        setStep(nextStep < 0 ? 0 : nextStep > 1 ? 1 : nextStep);
    };

    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);

    return (
        <div>
            <Steps current={step}>
                <Steps.Item title="Paso 1" description="Datos del Establecimiento" />
                <Steps.Item title="Paso 2" description="Datos del Paciente" />
            </Steps>
            <hr />
            <Panel header={`Paso: ${step + 1}`} bordered>
                {step === 0 && <FormStepOne />}
                {step === 1 && <FormStepTwo />}
            </Panel>
            <hr />
            <ButtonGroup>
                <Button onClick={onPrevious} disabled={step === 0}>
                    Anterior
                </Button>
                <Button onClick={onNext} disabled={step === 1}>
                    Siguiente
                </Button>
            </ButtonGroup>
        </div>
    );
}
