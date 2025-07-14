export interface ClassOverviewProps {
  showModal: boolean;
  setShowModal: (val: boolean) => void;
  item: any;
}
export interface classDetails {
  additionalNotes: string;
  age: string;
  timing: string;
  classCycle: string;
  className: string;
  courseModule: string;
  dateFrom: string;
  dateTo: string;
  classType: boolean;
  daysOfTheWeek: string;
  location: string;
  partner: string;
  staffName: string;
  timingfrom: string;
  timingTo: string;
  section: string;
  displayinWebsite: boolean;
  isMostPopular: boolean;
  isAlmostFull: boolean;
  canAddToWaitlist: boolean;
  timingsArray: any[];
  categoryList: any[];
}

export const instialClassDetails: classDetails = {
  additionalNotes: '',
  age: '',
  timing: '',
  classCycle: '',
  className: '',
  courseModule: '',
  dateFrom: '',
  dateTo: '',
  daysOfTheWeek: '',
  location: '',
  partner: '',
  staffName: '',
  timingfrom: '',
  timingTo: '',
  section: '',
  displayinWebsite: false,
  isMostPopular: false,
  isAlmostFull: false,
  canAddToWaitlist: false,
  timingsArray: [],
  categoryList: [],
};
