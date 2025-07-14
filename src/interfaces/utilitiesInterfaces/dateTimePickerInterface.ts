export interface DateTimePickerProps {
  data?: any;
  onConfirm: (value: any) => void;
  minimumDate?: any;
  mode: 'time' | 'date' | 'datetime' | undefined;
  isVisible: boolean;
  setisVisible: (isvisble: boolean) => void;
}
