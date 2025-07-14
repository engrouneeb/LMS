interface RouteInterface {
  key: string;
  name: string;
  params: Params;
  path: undefined;
}
interface Params {
  roleName: string;
}

export interface ExpenseRequestInterface {
  route: RouteInterface;
}
