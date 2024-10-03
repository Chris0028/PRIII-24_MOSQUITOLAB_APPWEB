import { updateStepFour } from '../../../redux/fileSlice';

export const createHandleSymptomChange = (dispatch, selectedDisease, dengueCase, symptoms) => {
    return (symptom, isChecked) => {
      let updatedSymptoms;
  
      if (selectedDisease === 'Dengue' && dengueCase) {
        // Copiar los síntomas existentes para evitar modificar el estado directamente
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
  
      // Enviar la actualización al store usando updateStepFour
      dispatch(updateStepFour({ symptoms: updatedSymptoms }));
    };
};

export const createHandleOtherSymptomCheckboxChange = (dispatch) => {
    return (selectedTab, isChecked, formData) => {
      // Actualizar el estado del checkbox "Otro" y, si se desmarca, también limpiar el valor del campo de entrada
      const updatedOtherSymptomChecked = {
        ...formData.otherSymptomChecked,
        [selectedTab]: isChecked,
      };
  
      let updatedOtherSymptom = {
        ...formData.otherSymptom,
      };
  
      // Si se desmarca el checkbox, eliminar el valor del input asociado
      if (!isChecked) {
        updatedOtherSymptom[selectedTab] = '';
      }
  
      // Hacer un solo dispatch para que ambos estados se actualicen al mismo tiempo
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