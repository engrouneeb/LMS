import { DataInterface } from '../../MyRequestDetailsInterfaces';

export interface CoverRequestCardInterface {
  UpdateApprovalsDetails: (
    item: DataInterface,
    status: string,
    comment: string
  ) => void;
  UpdateCoverageStatus: (id: number, status: number) => void;
  activeTab: ActiveTab;
  isCoverageTabActive: boolean;
  item: DataInterface;
  showButtons: boolean;
}
interface ActiveTab {
  name: string;
}

export interface TAG_COLORInterface {
  [key: string]: string;
}
