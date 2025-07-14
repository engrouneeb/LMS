export interface WagesWageDropDownInterface {
  heading: string;
  type: string;
  options: any;
  defaultValue: string;
  disabled?: boolean;
  onSelect: (ind: string | number) => void;
}
