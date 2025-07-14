export interface announcementInterface {
  announcementFor: number;
  announcementID: number;
  description: string;
  endDate?: any;
  expanded: boolean;
  franchiseIds?: any;
  roleGuid?: any;
  roleNames?: any;
  show: boolean;
  startDate?: any;
  title: string;
}
type paramsType = {
  params: { id: number };
};

export interface announcementDetailInterface {
  route: paramsType;
}
