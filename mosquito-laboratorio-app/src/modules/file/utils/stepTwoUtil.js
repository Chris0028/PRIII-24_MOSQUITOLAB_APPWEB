import { updateStepTwo } from "../../../redux/fileSlice";
// stepTwoUtil.js

// 1. Crear manejador para actualizar campos individuales del formulario.
export const createHandleInputChange = (dispatch) => (value, name) => {
  dispatch(updateStepTwo({ [name]: value }));
};

// 2. Crear manejador para el evento del cambio de toggles.
export const createHandleToggleChange = (dispatch) => (value, name) => {
  dispatch(updateStepTwo({ [name]: value }));
};

// 3. Crear manejador para el evento de arrastre del marcador del mapa.
export const createHandleMarkerDragEnd = (dispatch) => (lat, lng) => {
  dispatch(updateStepTwo({ latitude: lat, longitude: lng }));
};

// 4. Calcular la edad a partir de la fecha de nacimiento.
export const calculateAge = (birthDate) => {
  if (!birthDate) return null;
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

// 5. Manejar cambios en la fecha de nacimiento y actualizar la edad y el campo de guardian.
export const handleBirthDateChange = (dispatch) => (value) => {
  if (value instanceof Date && !isNaN(value)) {
    // Solo si `value` es una instancia válida de Date
    const patientBirthDate = value.toISOString();
    const age = calculateAge(patientBirthDate);

    // Si la edad es menor de 18, inicializar guardianName como vacío
    dispatch(updateStepTwo({ patientBirthDate, age, childParent: age < 18 ? '' : '' }));
  } else {
    // Si `value` no es una fecha válida, actualizar los campos como `null`
    dispatch(updateStepTwo({ patientBirthDate: null, age: null, childParent: '' }));
  }
};


// 6. Manejo de cambio de Seguros
export const handleInsuranceChange = (dispatch, insurances) => (value) => {
  const selectedInsurance = insurances.find(insurance => insurance.value === value);
  
  if (selectedInsurance) {
    dispatch(updateStepTwo({
      insuranceId: selectedInsurance.value,
      ipInsuredName: selectedInsurance.name,
    }));
  }
};