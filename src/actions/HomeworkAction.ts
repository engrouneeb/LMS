export const HomeworkActions = {
  HOMEWORK_LOADING: '/actions/HOMEWORK/HOMEWORK_LOADING',
  HOMEWORK_SUCCESS: '/actions/HOMEWORK/HOMEWORK_SUCCESS',
  HOMEWORK_STATUS_UPDATE: '/actions/HOMEWORK/HOMEWORK_STATUS_UPDATE',
  HOMEWORK_FAILED: '/actions/HOMEWORK/HOMEWORK_FAILED',
};
export function HomeworkLoading() {
  return {
    type: HomeworkActions.HOMEWORK_LOADING,
  };
}

export function HomeworkSuccess(payload: any) {
  return {
    type: HomeworkActions.HOMEWORK_SUCCESS,
    payload,
  };
}
export function HomeworkUpdate(payload: any) {
  return {
    type: HomeworkActions.HOMEWORK_STATUS_UPDATE,
    payload,
  };
}

export function HomeworkFailed() {
  return {
    type: HomeworkActions.HOMEWORK_FAILED,
  };
}
