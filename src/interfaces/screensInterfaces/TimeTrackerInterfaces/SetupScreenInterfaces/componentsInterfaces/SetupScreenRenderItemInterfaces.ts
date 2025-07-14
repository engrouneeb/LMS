export interface SetupScreenRenderItemInterface {
  index: number;
  item: Item;
  onSelectApproval: any;
}

interface Item {
  id: number;
  isSelected: boolean;
  name: string;
}
