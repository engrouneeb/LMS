export interface EventListInterface {
  userID: number;
  fullName: string;
  userImage?: any;
  userEnrollments: UserEnrollment[];
}

interface UserEnrollment {
  order: number;
  enrollmentID: number;
  eventID: number;
  enrollmentFormID: number;
  userID: number;
  familyName?: any;
  userName?: any;
  contactEmail?: any;
  contactNo?: any;
  status?: any;
  eventName: string;
  userAge?: any;
  enrollDate?: any;
  action?: any;
  eventTimingID: number;
  eventTimingHtml?: any;
  eventStartDate: string;
  eventEndDate: string;
  eventStartTime: EventStartTime;
  eventEndTime: EventStartTime;
  amount: number;
  couponExist: string;
  isAutoDeduct: boolean;
  billingCycle?: number;
  billCycle?: any;
  isSelected: boolean;
  shopingCartID: number;
}

interface EventStartTime {
  ticks: number;
  days: number;
  hours: number;
  milliseconds: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  totalHours: number;
  totalMilliseconds: number;
  totalMinutes: number;
  totalSeconds: number;
}

export interface EventCardInterface {
  data: UserEnrollment;
}
