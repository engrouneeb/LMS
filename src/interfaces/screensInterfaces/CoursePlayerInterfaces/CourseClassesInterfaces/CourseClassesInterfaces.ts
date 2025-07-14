export interface CourseClassesInterface {
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
  courseID: number;
  onClassSelect: any;
  redirectTo: string;
  projectID: any;
}
