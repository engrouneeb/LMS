export interface CourseAssignmentInterface {
  navigation?: any;
  route: Route;
}

interface Route {
  key: string;
  name: string;
  params: Params;
  path?: string;
}

interface Params {
  backTo: string;
  classId: number;
  type: number;
}
