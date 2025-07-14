export const getSelectedTab = (data: any) => ({
  type: 'SELECTED_TAB',
  data,
});
export interface tabReducerInterface {
  readonly activeTab: number;
}
const initialState = {
  activeTab: 0,
};
export const tabReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SELECTED_TAB':
      return { ...state, activeTab: action.data };
    default:
      return state;
  }
};
