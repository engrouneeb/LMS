export interface TabIndexInterface {
  navigation?: any;
  route: rote;
}
interface rote {
  key: string;
  name: string;
  params: Params;
  path?: any;
}
interface Params {
  courseID: number;
  courseImage: string;
  courseName: string;
  role: string;
  userID: number;
}
