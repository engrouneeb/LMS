export const MS_DASHBOARDCALENDERACTIONS = {
  MS_CALENDER_LOADING: '/actions/ms/CALENDER/enrolled/LOADING',
  MS_CALENDER_SUCCESS: '/actions/ms/CALENDER/enrolled/SUCCESS',
  MS_CALENDER_FAILED: '/actions/ms/CALENDER/enrolled/FAILED',
};

export function ms_calenderLoading() {
  return {
    type: MS_DASHBOARDCALENDERACTIONS.MS_CALENDER_LOADING,
  };
}

export function ms_calenderSuccess(payload: any) {
  return {
    type: MS_DASHBOARDCALENDERACTIONS.MS_CALENDER_SUCCESS,
    payload,
  };
}

export function ms_calenderFailed() {
  return {
    type: MS_DASHBOARDCALENDERACTIONS.MS_CALENDER_FAILED,
  };
}
