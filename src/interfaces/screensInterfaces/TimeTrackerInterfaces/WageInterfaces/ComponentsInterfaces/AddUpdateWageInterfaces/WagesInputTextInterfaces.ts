export interface WagesInputTextInterface {
  heading: string;
  placeholder: string;
  value: string;
  onChangeText: (txt: string) => void;
  keyboardType?: string;
}
