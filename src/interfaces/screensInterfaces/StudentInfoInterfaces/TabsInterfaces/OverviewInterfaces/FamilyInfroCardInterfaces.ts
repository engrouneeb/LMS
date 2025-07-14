export type FamilyInfoType = {
  familyName: string;
  homeAddress: string;
  city: string;
  state: string;
  zip: string;
  primaryPhone: string;
  emergencyContactInfo: string;
};
export interface FamilyInfoCardInterface {
  familyInfo: FamilyInfoType;
}
