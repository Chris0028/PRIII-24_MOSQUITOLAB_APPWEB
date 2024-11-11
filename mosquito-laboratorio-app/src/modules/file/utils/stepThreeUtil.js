import { updateStepThree } from "../../../redux/fileSlice";
 
 export const createHandleInputChange = (dispatch) => (value, name) => {
    dispatch(updateStepThree({ [name]: value }));
  };