export interface EditorInterface {
  IntialValue: string;
  type: string;
  updateFunction: any;
  user?: any;
  disabled?: any;
  getAllInventories?: () => void;
}
