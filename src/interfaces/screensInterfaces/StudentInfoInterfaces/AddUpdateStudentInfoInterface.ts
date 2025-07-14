export interface FamilyInfoInterface {
  familyName: string;
  homeAddress: string;
  city: string;
  state: string;
  zip: string;
  primaryPhone: string;
  emergencyContactInfo: string;
}
export interface StudentInfoInterface {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  birthDate: string;
  studentNumber: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface ContactInfoInterface {
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  cell: string;
  work: string;
  contactUsername: string;
  contactPassword: string;
  contactConfirmPassword: string;
}
export interface stdInfoInterface {
  familyInfo?: FamilyInfoInterface;
  studentInfo?: [StudentInfoInterface];
  contactInfo?: [ContactInfoInterface];
}
