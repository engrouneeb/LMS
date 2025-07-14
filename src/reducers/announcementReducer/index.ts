import { announcementInterface } from '../../interfaces';
import { AnnouncemetsActions } from '../../actions/AnnouncementActions';
export interface AnnouncementsReducerInterface {
  readonly loading: boolean;
  readonly success: boolean;
  readonly failed: boolean;
  readonly data?: announcementInterface;
}
const initialState: AnnouncementsReducerInterface = {
  loading: false,
  success: false,
  failed: false,
  data: undefined,
};

const AnnouncementsReducer = (
  state: AnnouncementsReducerInterface = initialState,
  actions: any,
): AnnouncementsReducerInterface => {
  switch (actions.type) {
    case AnnouncemetsActions.ANNOUNCEMENTS_STEP_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        failed: false,
      };

    case AnnouncemetsActions.ANNOUNCEMENTS_STEP_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        failed: false,
        data: actions.payload,
      };

    case AnnouncemetsActions.ANNOUNCEMENTS_STEP_FAILED:
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

export default AnnouncementsReducer;
