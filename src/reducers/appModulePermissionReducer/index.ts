
export interface AppModulePermissionInterfaceState {
  readonly loading: boolean;
  readonly success: boolean;
  readonly failed: boolean;
  readonly permissions?: []| null;
}
const initialState: AppModulePermissionInterfaceState = {
  loading: false,
  success: false,
  failed: false,
  permissions: [],
};

export const AppModulePermission = (
  state: AppModulePermissionInterfaceState = initialState,
  actions: any,
): AppModulePermissionInterfaceState => {
  switch (actions.type) {
    case "SET_APP_MODUEL_PERMISSIONS_LOADING":
      return {
        ...state,
        loading: true,
        success: false,
        failed: false,
      };
    case "SET_APP_MODUEL_PERMISSIONS_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        failed: false,
        permissions: actions.data,
      };

    case "SET_APP_MODUEL_PERMISSIONS_FAILED":
      return {
        ...state,
        loading: false,
        success: false,
        failed: true,
      };

    default:
      return state;
  }
};
