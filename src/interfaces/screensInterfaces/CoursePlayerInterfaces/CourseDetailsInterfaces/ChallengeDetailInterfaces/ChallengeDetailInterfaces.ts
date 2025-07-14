export interface ChallengeDetailInterface {
  route: Route;
}

interface Route {
  key: string;
  name: string;
  params: Params;
  path: undefined;
}

interface Params {
  challengeId: number;
  header: string;
  role: string;
}
