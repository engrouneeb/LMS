import { DataInterface } from '../../MyRequestDetailsInterfaces';

export interface TimeTrackerRequestCardInterface {
  rejectVisible?: boolean;
  showButtons?: boolean;
  variant: string;
  item: DataInterface;
  onButtonAction: (itm: DataInterface, val: string) => void;
}

export interface TotalHoursInterface {
  totalHours: number;
  category: string;
}
