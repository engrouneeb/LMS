export interface FeedbackTabInterface {
  classLabel: string;
  levleLabel: string;
  courseLabel?: string;
}

export interface FeedbackListInterface {
  studentId: number;
  userName?: any;
  birthdayDays: number;
  dueAmount: number;
  name: string;
  image: string;
  allergiesId?: any;
  allergiesDataId?: any;
  allergies?: any;
  specialNeedsId?: any;
  specialNeedsDataId?: any;
  specialNeeds?: any;
  healthInsuranceCarrierId?: any;
  healthInsuranceCarrierDataId?: any;
  healthInsuranceCarrier?: any;
  classesList: ClassesListInterface[];
}

export interface ClassesListInterface {
  studentId: number;
  classId: number;
  shoppingCartId?: any;
  isRecurring?: any;
  isBatchesExist: boolean;
  billed?: any;
  hasRecurringConflict: boolean;
  price?: any;
  classBatchTimeList?: any;
  isCouponExist?: any;
  batchId?: any;
  batchName?: any;
  className: string;
  classGuid?: any;
  courseCertificate?: any;
  courseLevelName: string;
  courseId: number;
  courseTitle?: any;
  courseRating?: any;
  totalSlots?: any;
  isNextLevelExist: boolean;
  levels?: any;
  centerFeedback: any[];
  studentFeedback: any[];
}

export interface FeedbackModalInterface {
  show: boolean;
  close: () => void;
  list: any;
}

export interface FeebackTabCardInterface {
  data: ClassesListInterface;
  classLabel: string;
  courseLevel: string;
}
