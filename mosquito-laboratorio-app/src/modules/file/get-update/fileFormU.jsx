import { useState } from '../hooks/useReacts';
import { Steps, Panel, ButtonGroup, Button } from 'rsuite';
import FormStepOneU from './formStepOneU';
import FormStepTwoU from './formStepTwoU';
import FormStepThreeU from './formStepThreeU';
import FormStepFourU from './formStepFourU';
import FormStepFiveU from './formStepFiveU';
import FormStepSixU from './formStepSixU';
import { useDispatch, useSelector } from 'react-redux';
import { updateStepOne, updateStepTwo, updateStepThree, updateStepFour, updateStepFive, updateStepSix } from '../../../redux/formStepsSlice';

export default function FileForm() {
  const [step, setStep] = useState(0);

  const onChange = (nextStep) => {
    setStep(nextStep < 0 ? 0 : nextStep > 5 ? 1 : nextStep);
  };

  const onNext = () => onChange(step + 1);
  const onPrevious = () => onChange(step - 1);

  return (
    <div>
      <Steps current={step}>
        <Steps.Item title="Paso 1" description="Datos del Establecimiento" />
        <Steps.Item title="Paso 2" description="Datos del Paciente" />
        <Steps.Item title="Paso 3" description="Antecedentes Epidemiológicos" />
        <Steps.Item title="Paso 4" description="Datos Clínicos" />
        <Steps.Item title="Paso 5" description="Datos en caso de Hospitalización" />
        <Steps.Item title="Paso 6" description="Confirmación" />
      </Steps>
      <hr />
      <Panel header={`Paso: ${step + 1}`} bordered>
        {step === 0 && <FormStepOneU />}
        {step === 1 && <FormStepTwoU />}
        {step === 2 && <FormStepThreeU />}
        {step === 3 && <FormStepFourU />}
        {step === 4 && <FormStepFiveU />}
        {step === 5 && <FormStepSixU />}
      </Panel>
      <hr />
      <ButtonGroup>
        <Button onClick={onPrevious} disabled={step === 0}>
          Anterior
        </Button>
        <Button onClick={onNext} disabled={step === 5}>
          Siguiente
        </Button>
      </ButtonGroup>
    </div>
  );
}
