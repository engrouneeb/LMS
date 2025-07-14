export interface ReviewScheduleModalNotifyOptionsInterface {
  selectedItem: SelectedItem;
  typeLists: SelectedItem[];
  onPress: (ind: number, itm: any) => void;
}

interface SelectedItem {
  Text: string;
  Value: number;
}
