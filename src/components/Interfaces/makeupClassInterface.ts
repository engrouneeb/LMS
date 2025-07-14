export interface makeupClassInterface {
  route: Route;
}

interface Route {
  key: string;
  name: string;
  params: Params;
  path?: any;
}

interface Params {
  refresh: boolean;
}

export interface InstructorInterface {
  value: number;
  text: string;
}

export interface makeUpclassInterface {
  classBatchId: string;
  dateFrom: Date;
  dateTo: Date;
  timeFrom: string;
  isBatch: string;
  timeTo: string;
}

export interface AddMakeUpClassDetailsResponseInterface {
  instructors: InstructorInterface[];
  timeZones: TimeZoneInterface[];
  status: number;
}

export interface TimeZoneInterface {
  standardName: string;
  displayName: string;
}

export interface classesNamesInterface {
  id: number;
  name: string;
}

export interface filteredDataInterface {
  backlogType: number;
  courseClasses: any[];
  courseImage: string;
  courseLevels: any[];
  parentKey?: any;
  subscriptionID: number;
  subscriptionName: string;
  subscriptionStringGuid?: any;
}

export interface createClassInterface {
  data: Data;
  type: string;
}

interface Data {
  msg: string;
  status: number;
}

export interface Title_DateTimePickerProps {
  title: string;
  value: string;
  handleOnPress: () => void;
  icon: { name: string; type: string };
}

export interface CourseLevelResponseInterface {
  levelId: number;
  levelName: string;
  levelClasses: LevelClass[];
}

export interface LevelClass {
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
export interface _DropDownProps {
  _options: string[];
  _defaultValue: string;
  _onSelect: (val: string) => void;
  _selectedValue: string | number | undefined;
}
