export type StudentInfoType = {
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
  status?: 'Active' | 'Inactive';
  kioskPin?: string;
};
export type FamilyInfoType = {
  familyName: string;
  homeAddress: string;
  city: string;
  state: string;
  zip: string;
  primaryPhone: string;
  emergencyContactInfo: string;
};
export interface StudentInfoCardInterface {
  studentInfo: StudentInfoType;
  onPress: () => void;
  onSubmitt: (val: any) => void;
}
