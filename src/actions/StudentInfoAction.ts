export const ActionsName = {
  STUDENT_INFO_OVERVIEW_LOADING: 'STUDENT_INFO_OVERVIEW_LOADING',
  STUDENT_INFO_OVERVIEW_SUCCESS: 'STUDENT_INFO_OVERVIEW_SUCCESS',
  STUDENT_INFO_OVERVIEW_FAILED: 'STUDENT_INFO_OVERVIEW_FAILED',
  STUDENT_INFO_SKILLS_LOADING: 'STUDENT_INFO_SKILLS_LOADING',
  STUDENT_INFO_SKILLS_SUCCESS: 'STUDENT_INFO_SKILLS_SUCCESS',
  STUDENT_INFO_SKILLS_FAILED: 'STUDENT_INFO_SKILLS_FAILED',
  STUDENT_INFO_CLASSES_LOADING: 'STUDENT_INFO_CLASSES_LOADING',
  STUDENT_INFO_CLASSES_SUCCESS: 'STUDENT_INFO_CLASSES_SUCCESS',
  STUDENT_INFO_CLASSES_FAILED: 'STUDENT_INFO_CLASSES_FAILED',
  STUDENT_INFO_ENROLLED_EVENTS_LOADING: 'STUDENT_INFO_ENROLLED_EVENTS_LOADING',
  STUDENT_INFO_ENROLLED_EVENTS_SUCCESS: 'STUDENT_INFO_ENROLLED_EVENTS_SUCCESS',
  STUDENT_INFO_ENROLLED_EVENTS_FAILED: 'STUDENT_INFO_ENROLLED_EVENTS_FAILED',
  STUDENT_INFO_MEDICAL_LOADING: 'STUDENT_INFO_MEDICAL_LOADING',
  STUDENT_INFO_MEDICAL_SUCCESS: 'STUDENT_INFO_MEDICAL_SUCCESS',
  STUDENT_INFO_MEDICAL_FAILED: 'STUDENT_INFO_MEDICAL_FAILED',
  STUDENT_INFO_FEEDBACK_LOADING: 'STUDENT_INFO_FEEDBACK_LOADING',
  STUDENT_INFO_FEEDBACK_SUCCESS: 'STUDENT_INFO_FEEDBACK_SUCCESS',
  STUDENT_INFO_FEEDBACK_FAILED: 'STUDENT_INFO_FEEDBACK_FAILED',
  STUDENT_INFO_ENROLLMENTS_LOADING: 'STUDENT_INFO_ENROLLMENTS_LOADING',
  STUDENT_INFO_ENROLLMENTS_SUCCESS: 'STUDENT_INFO_ENROLLMENTS_SUCCESS',
  STUDENT_INFO_ENROLLMENTS_FAILED: 'STUDENT_INFO_ENROLLMENTS_FAILED',
  STUDENT_INFO: 'STUDENT_INFO',
};

export function studentInfoOverviewLoading() {
  return {
    type: ActionsName.STUDENT_INFO_OVERVIEW_LOADING,
  };
}
export function studentInfoSkillsLoading() {
  return {
    type: ActionsName.STUDENT_INFO_SKILLS_LOADING,
  };
}
export function studentInfoEnrolledEventsLoading() {
  return {
    type: ActionsName.STUDENT_INFO_ENROLLED_EVENTS_LOADING,
  };
}
export function studentInfoClassesLoading() {
  return {
    type: ActionsName.STUDENT_INFO_CLASSES_LOADING,
  };
}
export function studentInfoMedicalLoading() {
  return {
    type: ActionsName.STUDENT_INFO_MEDICAL_LOADING,
  };
}
export function studentInfoFeedbackLoading() {
  return {
    type: ActionsName.STUDENT_INFO_FEEDBACK_LOADING,
  };
}

export function studentInfoOverviewSuccess(payload: any) {
  return {
    type: ActionsName.STUDENT_INFO_OVERVIEW_SUCCESS,
    payload: payload,
  };
}
export function studentInfoSkillsSuccess(payload: any) {
  return {
    type: ActionsName.STUDENT_INFO_SKILLS_SUCCESS,
    payload: payload,
  };
}
export function studentInfoEnrolledEventsSuccess(payload: any) {
  return {
    type: ActionsName.STUDENT_INFO_ENROLLED_EVENTS_SUCCESS,
    payload: payload,
  };
}
export function studentInfoClassesSuccess(payload: any) {
  return {
    type: ActionsName.STUDENT_INFO_CLASSES_SUCCESS,
    payload: payload,
  };
}
export function studentInfoMedicalSuccess(payload: any) {
  return {
    type: ActionsName.STUDENT_INFO_MEDICAL_SUCCESS,
    payload: payload,
  };
}
export function studentInfoFeedbackSuccess(payload: any) {
  return {
    type: ActionsName.STUDENT_INFO_FEEDBACK_SUCCESS,
    payload: payload,
  };
}

export function studentInfoOverviewFailed() {
  return {
    type: ActionsName.STUDENT_INFO_OVERVIEW_FAILED,
  };
}

export function studentInfoSkillsFailed() {
  return {
    type: ActionsName.STUDENT_INFO_ENROLLED_EVENTS_FAILED,
  };
}

export function studentInfoEnrolledEventsFailed() {
  return {
    type: ActionsName.STUDENT_INFO_ENROLLED_EVENTS_FAILED,
  };
}
export function studentInfoClassesFailed() {
  return {
    type: ActionsName.STUDENT_INFO_CLASSES_FAILED,
  };
}
export function studentInfoMedicalFailed() {
  return {
    type: ActionsName.STUDENT_INFO_MEDICAL_FAILED,
  };
}
export function studentInfoFeedbackFailed() {
  return {
    type: ActionsName.STUDENT_INFO_FEEDBACK_FAILED,
  };
}
export function studentInfo(info: any) {
  return {
    type: ActionsName.STUDENT_INFO,
    info,
  };
}
