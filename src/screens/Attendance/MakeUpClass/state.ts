import {
  classesNamesInterface,
  InstructorInterface,
  TimeZoneInterface,
} from '../../../components';
import moment from 'moment';

export interface CreateMakeUpClassResponseInterface {
  data: Data;
  type: string;
}

interface Data {
  msg: string;
  status: boolean;
}

interface FilteredDataInterface {
  subscriptionID: number;
  subscriptionName: string;
  subscriptionStringGuid?: any;
  courseImage: string;
  backlogType: number;
  parentKey?: any;
  courseLevels: any[];
  courseClasses: CourseClass[];
}

interface CourseClass {
  classId: number;
  courseId?: any;
  className: string;
  date: string;
  duration: string;
  dayTimeSubLists: any[];
  totalSlots: TotalSlots;
  classBatches: any[];
}

interface TotalSlots {
  noOfAvailableSlots?: any;
  isSlotsSet: boolean;
  noOfUsedSlots: number;
  isSlotNull: boolean;
  remainingSlots: number;
}

export const initialStateConstants = {
  timeFrom: 'timeFrom',
  timeTo: 'timeTo',
  pickerDateTime: 'pickerDateTime',
  alertMessage: 'alertMessage',
  alertTitle: 'alertTitle',
  firstBtn: 'firstBtn',
  showAlert: 'showAlert',
  selectedCourse: 'selectedCourse',
  classLoader: 'classLoader',
  classesNames: 'classesNames',
  dateFrom: 'dateFrom',
  filteredData: 'filteredData',
  isLoading: 'isLoading',
  dateTo: 'dateTo',
  courseName: 'courseName',
  dropdown: 'dropdown',
  selected: 'selected',
  isFrom: 'isFrom',
  isKeyboardOpened: 'isKeyboardOpened',
  instructorList: 'instructorList',
  timeZoneList: 'timeZoneList',
  selectedTimeZone: 'selectedTimeZone',
  ids: 'ids',
  selectedInstructor: 'selectedInstructor',
};

interface InitialStateInterface {
  timeFrom: string;
  timeTo: string;
  pickerDateTime: Date;
  showAlert: boolean;
  firstBtn: string;
  alertMessage: string;
  selectedCourse: string;
  alertTitle: string;
  classLoader: boolean;
  classesNames: classesNamesInterface[];
  dateFrom: Date;
  filteredData: FilteredDataInterface[];
  isLoading: boolean;
  dateTo: Date;
  courseName: string;
  dropdown: boolean;
  selected: string;
  isFrom: string;
  isKeyboardOpened: boolean;
  instructorList: InstructorInterface[];
  timeZoneList: TimeZoneInterface[];
  selectedTimeZone: number;
  ids: number[];
  selectedInstructor: string;
}

export type ReducerDataType =
  | string
  | Date
  | boolean
  | classesNamesInterface[]
  | FilteredDataInterface[]
  | InstructorInterface[]
  | TimeZoneInterface[]
  | number
  | number[];

export const initialState: InitialStateInterface = {
  timeFrom: moment(new Date()).format('h:mm A'),
  timeTo: moment(new Date()).format('h:mm A'),
  pickerDateTime: new Date(),
  showAlert: false,
  firstBtn: 'Okay',
  alertMessage: '',
  selectedCourse: '',
  alertTitle: 'Error',
  classLoader: false,
  classesNames: [],
  dateFrom: new Date(),
  filteredData: [],
  isLoading: false,
  dateTo: new Date(),
  courseName: '',
  dropdown: false,
  selected: '',
  isFrom: '',
  isKeyboardOpened: false,
  instructorList: [],
  timeZoneList: [],
  selectedTimeZone: -1,
  ids: [],
  selectedInstructor: '',
};

export const reducer = (state: any, action: any) => {
  if (Object.keys(state).includes(action.type))
    return { ...state, [action.type]: action.data };
  console.log({ 'Does not exist(action.type)': action.type });
  return state;
};
