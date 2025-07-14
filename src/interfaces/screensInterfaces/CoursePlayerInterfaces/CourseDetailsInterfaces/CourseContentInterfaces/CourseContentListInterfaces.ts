export interface CourseContentListInterface {
  data: Datum[];
  openScreen: any;
  navigation?: any;
}

interface Datum {
  backlogType: number;
  challenges: any;
  id: number;
  name: string;
  steps: any;
  treeOrder: number;
}
