export interface MedicalTabListInterface {
  studentId: number;
  userName?: any;
  birthdayDays: number;
  dueAmount: number;
  name: string;
  image: string;
  allergiesId?: any;
  allergiesDataId: number;
  allergies: string;
  specialNeedsId?: any;
  specialNeedsDataId: number;
  specialNeeds: string;
  healthInsuranceCarrierId?: any;
  healthInsuranceCarrierDataId: number;
  healthInsuranceCarrier: string;
  classesList?: any;
  status: number;
}

export interface AllergyCardInterface {
  text: string;
}

export interface SpecialN_CardInterface {
  text: string;
}

export interface HIC_CardInterface {
  text: string;
}
