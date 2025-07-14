export interface courseClassCardInterface {
  index?: number;
  item: Item2;
  onPress?: any;
}

interface Item2 {
  index: number;
  item: Item;
  separators: Separators;
}

interface Separators {
  highlight?: any;
  unhighlight?: any;
  updateProps?: any;
}

interface Item {
  text: string;
  value: number;
  imgUrl?: any;
}
