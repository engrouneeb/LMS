export interface ClassesTabPropsInterface {
  name: string;
  courseLabel: any;
  levleLabel: any;
  classLabel: string;
}

export interface ClassListInterface {
  studentId: number;
  classId: number;
  shoppingCartId: number;
  isRecurring: boolean;
  isBatchesExist: boolean;
  billed: string;
  hasRecurringConflict: boolean;
  price: number;
  classBatchTimeList: ClassBatchTimeList[];
  classDaysTimingList:ClassDaysTiming[],
  isCouponExist: string;
  batchId?: any;
  batchName: string;
  className: string;
  classGuid: string;
  courseCertificate?: any;
  courseLevelName: string;
  courseId: number;
  courseTitle?: any;
  courseRating?: any;
  totalSlots: TotalSlots;
  isNextLevelExist: boolean;
  levels?: any;
  centerFeedback?: any;
  studentFeedback?: any;
}

interface ClassBatchTimeList {
  levelId: number;
  levelTitle?: any;
  dates: string;
  className?: any;
  batchId?: any;
  classId: number;
  isRecurring?: any;
  billed?: any;
  isCuoponExist?: any;
  isActive: boolean;
  pricingJson?: any;
  price?: any;
  course?: any;
  noOfSlots?: any;
  backlogId: number;
  ages?: any;
  totalSlots?: any;
  dayTimeSubLists: DayTimeSubList[];
  isCouponExist?: any;
  isBatchesExist: boolean;
  batchName?: any;
  staffName?: any;
  studentCountForStaff: number;
  franchiseName?: any;
  franchiseId: number;
  existInCart: boolean;
  isActiveStage: boolean;
  classCycle?: any;
  backlogTimeDTO: any[];
  courseCategoryId: number;
  courseTypeId: number;
  subscriptionId?: any;
  isCompleted: boolean;
  error?: any;
  classDateFrom?: any;
  classDateTo?: any;
}

export interface DayTimeSubList {
  dayLists: string;
  timingLists: string;
  timeZone: string;
  instructorName: string;
  location?: any;
  date?: any;
  timeId: number;
  json: string;
  classId: number;
  noOfAvailableSlots: number;
  totalSlots: TotalSlots;
  formattedDays: string[];
  isActiveClass: boolean;
  batchId: number;
  timeFrom?: any;
  timeTo?: any;
  dbDays?: any;
}

interface TotalSlots {
  noOfAvailableSlots: number;
  isSlotsSet: boolean;
  noOfUsedSlots: number;
  isSlotNull: boolean;
  remainingSlots: number;
}

export interface SaveAutoLoginResponseInterface {
  guid: string;
  status: number;
}

export interface FromToInterface {
  Batches?: any;
  ClassId: number;
  ClassName: string;
  DateFrom?: any;
  DateFromString: string;
  DateTo?: any;
  DateToString: string;
  LevelId: number;
  LevelTitle?: any;
  NoOfSlots: number;
  PriceJson?: any;
  TimingsArray: TimingsArray[];
}

interface TimingsArray {
  Days: any[];
  InstructorId?: any;
  InstructorIds: any[];
  Location?: any;
  TimeFrom: string;
  TimeId: number;
  TimeTo: string;
  WeekDays?: any;
}

export interface ClassDaysTiming {
  dayLists: null,
  timingLists: string,
  timeZone: any,
  instructorName: "",
  location: null,
  date: null,
  timeId: number,
  json: null,
  classId: number,
  noOfAvailableSlots: number | null,
  totalSlots: number | null,
  formattedDays: string[],
  isActiveClass: boolean,
  batchId: null | undefined,
  timeFrom: null | undefined,
  timeTo: null | undefined,
  dbDays: null | undefined,
}
