import { ShipmentCardItemProps } from '.';
export interface ShipmentProps {
  item: ShipmentCardItemProps;
  tabId: number;
  isUserAdmin: boolean;
  GetAllShippedItems: () => void;
}
