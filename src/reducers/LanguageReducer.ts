import { languages } from './languages';
export interface languageInterface {
  readonly sideBar: any;
  readonly studentSideBar: any;
  readonly cmpyCodeScreen: any;
  readonly getStartedScreen: any;
  readonly loginScreen: any;
  readonly dashboardScreen: any;
  readonly coursesScreen: any;
  readonly courseContentScreenAssign: any;
  readonly messageScreen: any;
  readonly reportScreen: any;
  readonly studentProgressScreen: any;
  readonly studentProgressReportScreen: any;
  readonly studentAssessmentScreen: any;
  readonly studentAssessmentReportScreen: any;
  readonly markAttendenceDateWiseScreen: any;
  readonly viewByClass: any;
  readonly classDateList: any;
  readonly pincodeScreen: any;
  readonly individualCheckinScreen: any;
  readonly groupCheckinScreen: any;
  readonly notificationScreen: any;
  readonly timeTrackerScreen: any;
  readonly addWage: any;
  readonly wageDetial: any;
  readonly adminSchedule: any;
  readonly ScheduleWeekView: any;
  readonly timeSheet: any;
  readonly timeSheetDetial: any;
  readonly timeOff: any;
  readonly addTimeOffScreen: any;
  readonly approvelsScreen: any;
  readonly courseContentScreen: any;
  readonly classNotesScreen: any;
  readonly onlineClass: any;
  readonly classDetialScreen: any;
  readonly classTab: any;
  readonly loaderScreen: any;
  readonly submittButton: any;
  readonly addOrEdit: any;
  readonly commonWords: any;
  readonly classListHeading: any;
  readonly classMenu: any;
  readonly storeScreen: any;
}
const INITIAL_STATE: languageInterface = languages.english;
export default (
  state: languageInterface = INITIAL_STATE,
  action: any,
): languageInterface => {
  switch (action.type) {
    case 'language_data':
      return action.payload;
    default:
      return state;
  }
};
