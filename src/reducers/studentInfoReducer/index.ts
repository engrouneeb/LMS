import { ActionsName } from '../../actions/StudentInfoAction';
export interface StudentInfoInterface {
  readonly isOverviewLoading: boolean;
  readonly isOverviewSuccess: boolean;
  readonly isOverviewFailed: boolean;
  readonly isSkillsLoading: boolean;
  readonly isSkillsSuccess: boolean;
  readonly isSkillsFailed: boolean;
  readonly isEnrolledEventslLoading: boolean;
  readonly isEnrolledEventsSuccess: boolean;
  readonly isEnrolledEventsFailded: boolean;
  readonly isClassesLoading: boolean;
  readonly isClassesSuccess: boolean;
  readonly isClassesFailed: boolean;
  readonly isMedicalLoading: boolean;
  readonly isMedicalSuccess: boolean;
  readonly isMedicalFailed: boolean;
  readonly isFeedbackLoading: boolean;
  readonly isFeedbackSuccess: boolean;
  readonly isFeedbackFailed: boolean;
  readonly overview: { contactInfo: []; familyInfo: {}; studentInfo: [] };
  readonly skills?: [];
  readonly enrolledEvents?: [];
  readonly classes: [];
  readonly medical?: any;
  readonly feedback?: any;
  readonly stdInfo?: {};
}
const initialState: StudentInfoInterface = {
  isOverviewLoading: false,
  isOverviewSuccess: false,
  isOverviewFailed: false,
  isSkillsLoading: false,
  isSkillsSuccess: false,
  isSkillsFailed: false,
  isEnrolledEventslLoading: false,
  isEnrolledEventsSuccess: false,
  isEnrolledEventsFailded: false,
  isClassesLoading: false,
  isClassesSuccess: false,
  isClassesFailed: false,
  isMedicalLoading: false,
  isMedicalSuccess: false,
  isMedicalFailed: false,
  isFeedbackLoading: false,
  isFeedbackSuccess: false,
  isFeedbackFailed: false,
  overview: { contactInfo: [], familyInfo: {}, studentInfo: [] },
  skills: [],
  enrolledEvents: [],
  classes: [],
  medical: {},
  feedback: {},
  stdInfo: {},
};

const StudentInfoReducer = (
  state: StudentInfoInterface = initialState,
  actions: any
): StudentInfoInterface => {
  switch (actions.type) {
    case ActionsName.STUDENT_INFO_OVERVIEW_LOADING:
      return {
        ...state,
        isOverviewLoading: true,
        isOverviewSuccess: false,
        isOverviewFailed: false,
      };
    case ActionsName.STUDENT_INFO_SKILLS_LOADING:
      return {
        ...state,
        isSkillsLoading: true,
        isSkillsSuccess: false,
        isSkillsFailed: false,
      };
    case ActionsName.STUDENT_INFO_CLASSES_LOADING:
      return {
        ...state,
        isClassesLoading: true,
        isClassesFailed: false,
        isClassesSuccess: false,
      };
    case ActionsName.STUDENT_INFO_ENROLLED_EVENTS_LOADING:
      return {
        ...state,
        isEnrolledEventslLoading: true,
        isEnrolledEventsFailded: false,
        isEnrolledEventsSuccess: false,
      };
    case ActionsName.STUDENT_INFO_MEDICAL_LOADING:
      return {
        ...state,
        isMedicalLoading: true,
        isMedicalFailed: false,
        isMedicalSuccess: false,
      };
    case ActionsName.STUDENT_INFO_FEEDBACK_LOADING:
      return {
        ...state,
        isFeedbackLoading: true,
        isFeedbackFailed: false,
        isFeedbackSuccess: false,
      };
    case ActionsName.STUDENT_INFO_OVERVIEW_SUCCESS:
      return {
        ...state,
        isOverviewLoading: false,
        isOverviewSuccess: true,
        isOverviewFailed: false,
        overview: actions.payload,
      };
    case ActionsName.STUDENT_INFO_SKILLS_SUCCESS:
      return {
        ...state,
        isSkillsLoading: false,
        isSkillsSuccess: true,
        isSkillsFailed: false,
        skills: actions.payload,
      };
    case ActionsName.STUDENT_INFO_CLASSES_SUCCESS:
      return {
        ...state,
        isClassesFailed: false,
        isClassesSuccess: true,
        isClassesLoading: false,
        classes: actions.payload,
      };
    case ActionsName.STUDENT_INFO_ENROLLED_EVENTS_SUCCESS:
      return {
        ...state,
        isEnrolledEventslLoading: false,
        isEnrolledEventsSuccess: true,
        isEnrolledEventsFailded: false,
        enrolledEvents: actions.payload,
      };
    case ActionsName.STUDENT_INFO_MEDICAL_SUCCESS:
      return {
        ...state,
        isMedicalFailed: false,
        isMedicalSuccess: true,
        isMedicalLoading: false,
        medical: actions.payload,
      };
    case ActionsName.STUDENT_INFO_FEEDBACK_SUCCESS:
      return {
        ...state,
        isFeedbackFailed: false,
        isFeedbackSuccess: true,
        isFeedbackLoading: false,
        feedback: actions.payload,
      };

    case ActionsName.STUDENT_INFO_OVERVIEW_FAILED:
      return {
        ...state,
        isOverviewLoading: false,
        isOverviewSuccess: false,
        isOverviewFailed: true,
      };
    case ActionsName.STUDENT_INFO_SKILLS_FAILED:
      return {
        ...state,
        isSkillsLoading: false,
        isSkillsSuccess: false,
        isSkillsFailed: true,
      };
    case ActionsName.STUDENT_INFO_CLASSES_FAILED:
      return {
        ...state,
        isClassesFailed: true,
        isClassesLoading: false,
        isClassesSuccess: false,
      };
    case ActionsName.STUDENT_INFO_ENROLLED_EVENTS_FAILED:
      return {
        ...state,
        isEnrolledEventslLoading: false,
        isEnrolledEventsSuccess: false,
        isEnrolledEventsFailded: true,
      };
    case ActionsName.STUDENT_INFO_MEDICAL_FAILED:
      return {
        ...state,
        isMedicalFailed: true,
        isMedicalLoading: false,
        isMedicalSuccess: false,
      };
    case ActionsName.STUDENT_INFO_FEEDBACK_FAILED:
      return {
        ...state,
        isFeedbackFailed: true,
        isFeedbackLoading: false,
        isFeedbackSuccess: false,
      };
    case ActionsName.STUDENT_INFO:
      return {
        ...state,
        stdInfo: actions.info,
      };

    default:
      return state;
  }
};

export default StudentInfoReducer;
