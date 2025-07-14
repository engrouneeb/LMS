export interface classListAttendanceInterface {
  navigation: any;
  CoursesList: CoursesList[];
  loading: boolean;
  markedAttendance: any;
  screenVariant: string;
  setFilteredClasslist?: any;
  setMarkedAttendence?: any;
}

interface CoursesList {
  courseClasses: any;
  courseImage: string;
  courseLevels: any;
  subscriptionID: number;
  subscriptionName: string;
  subscriptionStringGuid: string;
}
