import { updateStepOne } from "../../../redux/fileSlice";

const formatDate = (date) => {
  return date ? date.toISOString() : null;
};

const parseDate = (dateString) => {
  return dateString ? new Date(dateString) : null;
};

export const createHandleDateChange = (dispatch) => {
  return (name, value) => {
    const formattedDate = formatDate(value);
    dispatch(updateStepOne({ [name]: formattedDate }));
  };
};

export const createHandleInputChange = (dispatch) => {
  return (name, value) => {
    dispatch(updateStepOne({ [name]: value }));
  };
};
