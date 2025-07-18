export const intialState = {
  familyName: '',
  homeAddress: '',
  city: '',
  state: '',
  zip: '',
  primaryPhone: '',
  emergencyContactInfo: '',
};
export const reducer = (state: any, action: any) => {
  if (action.type == 'intialsState') return action.data;
  if (Object.keys(state).includes(action.type))
    return { ...state, [action.type]: action.data };
  else return state;
};
