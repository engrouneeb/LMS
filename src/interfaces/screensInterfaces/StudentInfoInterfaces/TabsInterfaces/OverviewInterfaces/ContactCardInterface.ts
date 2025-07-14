export interface ItemProps {
  cell?: any;
  contactConfirmPassword: string;
  contactEmail: string;
  contactFirstName: string;
  contactGuidString?: any;
  contactId: number;
  contactLastName: string;
  contactPassword: string;
  contactUsername: string;
  familyId?: any;
  isActive: boolean;
  isLead: boolean;
  isParentPortalAccessBtn: boolean;
  parentGuid: string | null;
  sectionNo: number;
  type: string;
  work?: any;
}

export interface ContactCardInterface {
  item: ItemProps;
  index: number;
  setAddNewUser: (value: boolean) => void;
  addNewUser: boolean;
  submitNewUser: (value: ItemProps | any) => void;
  contactList: ItemProps[];
}
interface StudentInfoType {
  firstName: string;
  lastName: string;
  userImage: string;
  gender: '0' | '1' | '3' | '4';
  email: string;
  dob: string;
  studentNumber: string;
  username?: string;
  password: string;
  confirmPassword: string;
}
export interface addUpdateStudentInfoInterface {
  familyInfo?: {};
  contactInfo?: ItemProps[];
  studentInfo?: StudentInfoType[];
}
