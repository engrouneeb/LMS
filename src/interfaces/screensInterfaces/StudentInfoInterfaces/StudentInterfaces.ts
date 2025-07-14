interface RouteInterface {
  key: string;
  name: string;
  params: Params;
  path: string;
}

interface Params {
  billing: boolean;
  goBack: string;
  studentId: number;
  studentName: string;
}

export interface StudentDetialsInterface {
  route: RouteInterface;
}

export interface CourseLevelInterface {
  name: string;
  label: string;
}
