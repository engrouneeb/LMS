import { AppState } from 'react-native';
export const stateConstants = {
  CHILDREN: 'children',
  STUDENT_ID: 'studentId',
  APP_STATE: 'appState',
  ALERT_TITLE: 'alertTitle',
  ALERT_MESSAGE: 'alertMessage',
  SHOW_ALERT: 'showAlert',
  ACTIVE: 'active',
  POINTS_WIDGETS: 'pointsWidgets',
  SHOW_UPCOMING_EVENTS: 'showUpcomingEvents',
  SHOW_ALERT_MESSAGE: 'showAlertMessage',
  SET_POINT_SHOW_WIDGETS: 'setPointShowWidgets',
};
export interface InitialStateInterface {
  children: undefined | [];
  studentId: string | null;
  appState: 'inactive' | 'background' | 'active' | null | any;
  alertTitle: string;
  alertMessage: string;
  showAlert: boolean;
  active?: string;
  pointsWidgets: boolean;
  showUpComingEvents: boolean;
  timerShow: boolean;
}

export type ReducerDataType = string | [] | boolean;

export const initialState: InitialStateInterface = {
  children: undefined,
  studentId: null,
  appState: AppState.currentState,
  alertTitle: '',
  alertMessage: '',
  showAlert: false,
  pointsWidgets: false,
  showUpComingEvents: false,
  active: undefined,
  timerShow: false,
};

const multiStateReq = [
  stateConstants.SHOW_ALERT_MESSAGE,
  stateConstants.SET_POINT_SHOW_WIDGETS,
];

export const reducer = (state: any, action: any) => {
  if (multiStateReq.includes(action.type)) {
    switch (action.type) {
      case stateConstants.SHOW_ALERT_MESSAGE:
        return {
          ...state,
          alertTitle: action.data.alertTitle,
          alertMessage: action.data.alertMessage,
          showAlert: action.data.showAlert,
        };
      case stateConstants.SET_POINT_SHOW_WIDGETS:
        return {
          ...state,
          pointsWidgets: action.data.pointsWidgets,
          showUpComingEvents: action.data.showUpComingEvents,
        };

      default:
        break;
    }
  } else if (Object.keys(state).includes(action.type))
    return { ...state, [action.type]: action.data };
  console.log({ 'Does not exist(action.type)': action.type });
  return state;
};
