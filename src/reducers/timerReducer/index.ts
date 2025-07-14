const initialState = {
  isShow: false,
};

export const timerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_HIDE_TIMER':
      return {
        ...state,
        isShow: action.payload,
      };
    default:
      return state;
  }
};
