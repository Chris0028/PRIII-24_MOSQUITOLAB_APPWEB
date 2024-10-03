import { updateStepFive } from "../../../redux/fileSlice";

const formatDate = (date) => {
    return date ? date.toISOString() : null;
};

export const createHandleRadioChange = (dispatch) => {
    return (name, value) => {
      dispatch(updateStepFive({ [name]: value }));
    };
};
  
export const createHandleDateChange = (dispatch) => {
    return (name, value) => {
      const formattedDate = formatDate(value);
      dispatch(updateStepFive({ [name]: formattedDate }));
    };
};

export const createHandleInputChange = (dispatch) => {
    return (name, value) => {
      dispatch(updateStepFive({ [name]: value }));
    };
};
  
export const createHandlePickerChange = (dispatch) => {
    return (name, value) => {
      dispatch(updateStepFive({ [name]: value }));
    };
};
  

