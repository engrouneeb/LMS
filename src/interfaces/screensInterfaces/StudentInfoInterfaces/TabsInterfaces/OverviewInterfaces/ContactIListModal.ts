import { ItemProps } from './ContactCardInterface';
import { FamilyInfoCardInterface } from './FamilyInfroCardInterfaces';

export interface ContactListModalInterface {
  show: boolean;
  close: () => void;
  contacts: ItemProps[];
  familyInfo: FamilyInfoCardInterface;
}
