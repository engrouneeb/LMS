export interface authInterface {
  readonly token?: {};
  readonly loading: true;
  readonly error: null;
}
const initialState: authInterface = {
  token: {},
  loading: true,
  error: null,
};
export const rootReducer = (
  state: authInterface = initialState,
  action: any,
): authInterface => {
  switch (action.type) {
    case 'GET_TOKEN':
      return { ...state, token: action.token };
    case 'SAVE_TOKEN':
      return { ...state, token: action.token };
    case 'REMOVE_TOKEN':
      return { ...state, token: action.token };
    case 'LOADING':
      return { ...state, loading: action.isLoading };
    case 'ERROR':
      return { ...state, error: action.error };
    default:
      return state;
  }
};
