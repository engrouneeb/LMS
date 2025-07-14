export interface courseDetail_Interface {
  courseContent?: CourseContent[];
  courseFeilds?: CourseFeild[];
  role: string;
  route: Route;
  navigation?: any;
}

interface Route {
  key: string;
  name: string;
  params: Params;
  path?: any;
}

interface Params {
  courseID: number;
  courseImage: string;
  courseName: string;
  role: string;
  userID: number;
  projectID?: any;
}

interface CourseFeild {
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
  optionsList?: any;
  order: number;
  passwordProtected: boolean;
  sync?: any;
  tabType: number;
  templateId: number;
  viewPermission: boolean;
}

interface CourseContent {
  backlogType: number;
  challenges?: any;
  id: number;
  name: string;
  steps?: any;
  treeOrder: number;
  EnterUrl?: any;
}
