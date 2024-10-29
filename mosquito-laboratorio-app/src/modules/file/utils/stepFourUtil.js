import { updateStepFour } from '../../../redux/fileSlice';

export const createHandleSymptomChange = (dispatch, selectedDisease, dengueCase, symptoms) => {
  return (symptom, isChecked) => {
    let updatedSymptoms;

    // Lógica para manejar síntomas según la enfermedad seleccionada
    if (selectedDisease === 'Dengue' && dengueCase) {
      updatedSymptoms = {
        ...symptoms,
        dengue: {
          ...symptoms.dengue,
          [dengueCase]: isChecked
            ? [...(symptoms.dengue[dengueCase] || []), symptom]
            : symptoms.dengue[dengueCase]?.filter((item) => item !== symptom),
        },
      };
    } else if (selectedDisease === 'Chikungunya') {
      updatedSymptoms = {
        ...symptoms,
        chikungunya: isChecked
          ? [...(symptoms.chikungunya || []), symptom]
          : symptoms.chikungunya?.filter((item) => item !== symptom),
      };
    } else if (selectedDisease === 'Zika') {
      updatedSymptoms = {
        ...symptoms,
        zika: isChecked
          ? [...(symptoms.zika || []), symptom]
          : symptoms.zika?.filter((item) => item !== symptom),
      };
    }

    // Actualizar el store de Redux con los síntomas actualizados
    dispatch(updateStepFour({ symptoms: updatedSymptoms }));
  };
};

export const createHandleOtherSymptomCheckboxChange = (dispatch) => {
  return (selectedTab, isChecked, formData) => {
    // Actualizar el estado del checkbox "Otro" para la enfermedad seleccionada
    const updatedOtherSymptomChecked = {
      ...formData.otherSymptomChecked,
      [selectedTab]: isChecked,
    };

    let updatedOtherSymptom = {
      ...formData.otherSymptom,
    };

    // Limpiar el campo de entrada si el checkbox se desmarca
    if (!isChecked) {
      updatedOtherSymptom[selectedTab] = '';
    }

    dispatch(updateStepFour({
      otherSymptomChecked: updatedOtherSymptomChecked,
      otherSymptom: updatedOtherSymptom,
    }));
  };
};

export const createHandleOtherSymptomInputChange = (dispatch) => {
  return (selectedTab, value, formData) => {
    // Actualizar el valor del input "Otro" para la enfermedad seleccionada
    const updatedOtherSymptom = {
      ...formData.otherSymptom,
      [selectedTab]: value,
    };

    dispatch(updateStepFour({
      otherSymptom: updatedOtherSymptom,
    }));
  };
};

export const createHandleChange = (dispatch) => {
  return (field, value) => {
    dispatch(updateStepFour({ [field]: value }));
  };
};


// Función para obtener la semana epidemiológica con condicionales
export const getEpidemiologicalWeek = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, por lo que sumamos 1

  // Enero
  if (month === 1) {
    if (day <= 6) return '1';
    if (day <= 13) return '2';
    if (day <= 20) return '3';
    if (day <= 27) return '4';
    if (day <= 31) return '5';
  }

  // Febrero
  if (month === 2) {
    if (day <= 3) return '5';
    if (day <= 10) return '6';
    if (day <= 17) return '7';
    if (day <= 24) return '8';
    if (day <= 29) return '9';
  }

  // Marzo
  if (month === 3) {
    if (day <= 2) return '9';
    if (day <= 9) return '10';
    if (day <= 16) return '11';
    if (day <= 23) return '12';
    if (day <= 30) return '13';
    if (day === 31) return '14';
  }

  // Abril
  if (month === 4) {
    if (day <= 6) return '14';
    if (day <= 13) return 15;
    if (day <= 20) return 16;
    if (day <= 27) return 17;
    if (day <= 30) return 18;
  }

  // Mayo
  if (month === 5) {
    if (day <= 4) return 18;
    if (day <= 11) return 19;
    if (day <= 18) return 20;
    if (day <= 25) return 21;
    if (day <= 31) return 22;
  }

  // Junio
  if (month === 6) {
    if (day <= 1) return 22;
    if (day <= 8) return 23;
    if (day <= 15) return 24;
    if (day <= 22) return 25;
    if (day <= 29) return 26;
  }

  // Julio
  if (month === 7) {
    if (day <= 6) return 27;
    if (day <= 13) return 28;
    if (day <= 20) return 29;
    if (day <= 27) return 30;
    if (day <= 31) return 31;
  }

  // Agosto
  if (month === 8) {
    if (day <= 3) return 31;
    if (day <= 10) return 32;
    if (day <= 17) return 33;
    if (day <= 24) return 34;
    if (day <= 31) return 35;
  }

  // Septiembre
  if (month === 9) {
    if (day <= 7) return 36;
    if (day <= 14) return 37;
    if (day <= 21) return 38;
    if (day <= 28) return 39;
  }

  // Octubre
  if (month === 10) {
    if (day <= 5) return 40;
    if (day <= 12) return 41;
    if (day <= 19) return 42;
    if (day <= 26) return 43;
    if (day <= 31) return 44;
  }

  // Noviembre
  if (month === 11) {
    if (day <= 2) return 44;
    if (day <= 9) return 45;
    if (day <= 16) return 46;
    if (day <= 23) return 47;
    if (day <= 30) return 48;
  }

  // Diciembre
  if (month === 12) {
    if (day <= 7) return 49;
    if (day <= 14) return 50;
    if (day <= 21) return 51;
    if (day <= 28) return 52;
    if (day <= 31) return 1; // Semanas epidemiológicas 2025
  }

  // Si no encuentra la semana
  return 'No definida';
};





