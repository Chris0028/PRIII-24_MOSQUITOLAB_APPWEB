import { updateStepThree } from "../../../redux/fileSlice";
 
 // Maneja los cambios de otros campos del formulario
 export const createHandleInputChange = (dispatch) => (value, name) => {
    dispatch(updateStepThree({ [name]: value }));
  };