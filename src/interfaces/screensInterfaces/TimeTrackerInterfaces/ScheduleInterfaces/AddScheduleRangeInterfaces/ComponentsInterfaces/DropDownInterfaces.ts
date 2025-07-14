export interface DropDownPropsInterface {
  data: optionsType[];
  _setState: (val: string, type: string) => void;
}

export type optionsType = {
  lable: string;
  value: string;
};
