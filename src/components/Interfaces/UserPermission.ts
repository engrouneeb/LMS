export interface UserPermission {
  create: boolean;
  delete: boolean;
  edit: boolean;
  functionId: number;
  moduleId: number;
  pageId: number;
  pageName?: any;
  selected: boolean;
  view: boolean;
}
