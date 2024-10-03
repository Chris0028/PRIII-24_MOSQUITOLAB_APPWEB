import { updateStepOne } from "../../../redux/fileSlice";

// Convierte una fecha a una cadena ISO si la fecha está definida
const formatDate = (date) => {
  return date ? date.toISOString() : null;
};

// Convierte una cadena ISO a un objeto Date si la cadena está definida
const parseDate = (dateString) => {
  return dateString ? new Date(dateString) : null;
};

// Crear una función para manejar el cambio de fecha que convierte antes de almacenar en Redux
export const createHandleDateChange = (dispatch) => {
  return (name, value) => {
    const formattedDate = formatDate(value);
    dispatch(updateStepOne({ [name]: formattedDate }));
  };
};

// Maneja los cambios de otros campos del formulario
export const createHandleInputChange = (dispatch) => {
  return (name, value) => {
    dispatch(updateStepOne({ [name]: value }));
  };
};
