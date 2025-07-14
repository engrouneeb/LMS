export interface ModulePagesPermissionsInterface {
  readonly data?: any;
}
const initialState: ModulePagesPermissionsInterface = {
  data: [],
};

const ModulePagesPermissions = (
  state: ModulePagesPermissionsInterface = initialState,
  action: any,
): ModulePagesPermissionsInterface => {
  switch (action.type) {
    case 'SET_MODUEL_PAGES_PERMISSIONS':
      return {
        ...state,
        data: action.data,
      };

    default:
      return state;
  }
};

export default ModulePagesPermissions;
