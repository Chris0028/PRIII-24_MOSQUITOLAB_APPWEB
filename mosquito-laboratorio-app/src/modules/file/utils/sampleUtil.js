
// Manejar cambios en la fecha de nacimiento y actualizar la edad y el campo de guardian.
export const handleSampleDateChange = (dispatch) => (value) => {
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