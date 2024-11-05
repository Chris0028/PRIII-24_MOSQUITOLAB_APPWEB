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

export default function FileFormU() {
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.formSteps); // Obtener el estado de todos los pasos

  const saveCurrentStepData = () => {
    switch (step) {
      case 0:
        dispatch(updateStepOne(formData.stepOne)); // Guarda los datos de Step 1
        break;
      case 1:
        dispatch(updateStepTwo(formData.stepTwo)); // Guarda los datos de Step 2
        break;
      case 2:
        dispatch(updateStepThree(formData.stepThree)); // Guarda los datos de Step 3
        break;
      case 3:
        dispatch(updateStepFour(formData.stepFour)); // Guarda los datos de Step 4
        break;
      case 4:
        dispatch(updateStepFive(formData.stepFive)); // Guarda los datos de Step 5
        break;
      case 5:
        dispatch(updateStepSix(formData.stepSix)); // Guarda los datos de Step 6
        break;
      default:
        break;
    }
  };

  const onNext = () => {
    saveCurrentStepData(); // Guarda los datos antes de avanzar
    setStep(step + 1); // Avanza al siguiente paso
  };

  const onPrevious = () => setStep(step - 1);

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
