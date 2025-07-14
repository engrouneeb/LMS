export interface userInterface {
  readonly UserInfo?: any;
  readonly SuperAdminPermission?: any;
  readonly PinUser?: {};
  readonly ClassStudent?: any;
  readonly isSecured?: boolean;
}
const initialState = {
  UserInfo: {},
  SuperAdminPermission: [],
  PinUser: {},
  ClassStudent: [],
  isSecured: false,
};
const userReducer = (
  state: userInterface = initialState,
  action: any,
): userInterface => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, PinUser: action.Info };
    case 'USER_INFO':
      return {
        ...state,
        UserInfo: action.Info,
      };
    case 'SET_USER_SUPERADMIN_PERMISSION':
      return {
        ...state,
        SuperAdminPermission: action.permissions,
      };
    case 'isSecured':
      return {
        ...state,
        isSecured: action.isSecured,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        UserInfo: {
          ...state.UserInfo,
          isUserCheckedIn: action.status,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
