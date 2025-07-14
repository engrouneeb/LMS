export interface Props {
  userToken: string;
  navigation: any;
}
export interface SelectedItemProps {
  classId: number;
  timingId: number;
  makeupClassId: number;
  courseId: number;
  timeFrom: String;
  timeTo: String;
  isLocalTime: boolean;
  courseName: String;
  className: String;
  instructorName: String;
  isMakeUpClass: boolean;
}
export interface HeaderProps {
  headerProps: any;
}

interface SingleItem {
  classId: number;
  timeFrom: String;
  timeTo: String;
  isLocalTime: boolean;
  courseName: String;
  className: String;
  instructorName: String;
  isMakeUpClass: boolean;
}
export interface ClassCardProps {
  item: SingleItem;
  onPress: (item: SingleItem) => void;
}

export interface Item {
  timeFrom: string;
  timeTo: string;
  isLocalTime: boolean;
  courseName: string;
  className: string;
  instructorName: string;
  isMakeUpClass: boolean;
  classId: string | number;
  timingId: string | number;
  dateFrom: string | number;
  isCancelRequestSend: boolean | null;
  makeupClassId: number | undefined;
}

export interface ClassDetailsModaleProps {
  modalVisible: boolean;
  setModalVisible: (val: boolean) => void;
  selectedItem: Item;
  onCancelClass: () => void;
  onStartClass: () => void;
  selectedDate: string;
  makeupCancelClassStatus: {} | any;
}
