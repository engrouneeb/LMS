interface RouteInterface {
  key: string;
  name: string;
  params: Params;
  path: undefined;
}

interface Params {
  roleName: string;
  timeTrackerBadges: TimeTrackerBadges;
}

interface TimeTrackerBadges {
  coverCount: number;
  coverageCount: number;
  expenseCount: number;
  timeOffCount: number;
  timeSheetCount: number;
}

export interface TimeOffRequestInterface {
  route: RouteInterface;
}
