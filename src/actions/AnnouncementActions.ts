export const AnnouncemetsActions = {
  ANNOUNCEMENTS_STEP_LOADING: '/actions/announcements/LOADING',
  ANNOUNCEMENTS_STEP_SUCCESS: '/actions/announcements/SUCCESS',
  ANNOUNCEMENTS_STEP_FAILED: '/actions/announcements/FAILED',
};

export function AnnouncemetsLoading() {
  return {
    type: AnnouncemetsActions.ANNOUNCEMENTS_STEP_LOADING,
  };
}

export function AnnouncemetsSuccess(payload: any) {
  return {
    type: AnnouncemetsActions.ANNOUNCEMENTS_STEP_SUCCESS,
    payload,
  };
}

export function AnnouncemetsFailed() {
  return {
    type: AnnouncemetsActions.ANNOUNCEMENTS_STEP_FAILED,
  };
}
