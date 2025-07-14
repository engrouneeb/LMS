export interface CourseDetailInterface {
  changeVisibleState: () => void;
  courseFields?: CourseField[];
  ref: any;
  isCourseVisible: boolean;
}

interface CourseField {
  attrType: number;
  backlogColumnName?: number;
  colspan: number;
  ddlType?: any;
  dropdownType: number;
  editPermission: boolean;
  elementId: number;
  fielLabel: string;
  fieldClass?: any;
  fieldErrorMessage?: any;
  fieldInfo?: string;
  fieldName: string;
  fieldPlaceholder: string;
  fieldValue?: string;
  formDataId: number;
  isActive: boolean;
  isDefault: boolean;
  isRequired: boolean;
  listType?: any;
  option?: any;
  optionsJSON?: any;
  optionsList: any;
  order: number;
  passwordProtected: boolean;
  sync?: any;
  tabType: number;
  templateId: number;
  viewPermission: boolean;
}
