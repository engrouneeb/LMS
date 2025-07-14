export const intialState = {
  fistName: '',
  lastName: '',
  gender: '',
  email: '',
  birthDate: '',
  studentNumber: '',
  userName: '',
  password: '',
  confirmPassword: '',
  dob: '',
};
export const reducer = (state: any, action: any) => {
  if (action.type == 'intialsState') return action.data;
  if (Object.keys(state).includes(action.type))
    return { ...state, [action.type]: action.data };
  console.warn(action.type, 'is not a valid key');
  return state;
};
