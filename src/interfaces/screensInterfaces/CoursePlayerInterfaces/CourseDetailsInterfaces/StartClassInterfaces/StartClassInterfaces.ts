export interface StartClassInterface {
  classId?: number;
  data?: Data;
  showModal: boolean;
}

interface Data {
  classId: number;
  className: string;
  classUrl: string;
  companyGuid: string;
  currentClassLabelValue: string;
  meetingDetail?: any;
  onlineClassType: number;
  sessionGuid: string;
  status: number;
  studentsAndParents?: any;
  userFullName: string;
  zoomUrl: string;
}

export interface SecureSettInterface {
  companyKey: number;
  companyName?: any;
  companySecureURL?: any;
  isClassesPage: boolean;
  isCompanyFranchises: boolean;
  isCoursesPage: boolean;
  isSecurePage: boolean;
  isShowEventsCalendar: boolean;
  secureTerminologies: SecureTerminology[];
}

interface SecureTerminology {
  key: string;
  value: string;
}
