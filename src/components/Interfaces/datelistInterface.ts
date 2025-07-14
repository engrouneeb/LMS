export interface datelistInterface {
  activeDates: ActiveDate[];
  childList: ChildList[];
  status: number;
}

interface ChildList {
  id: number;
  isActive: boolean;
  name: string;
  projectId: number;
}

interface ActiveDate {
  activeDate: string;
  clsIds: string;
}
