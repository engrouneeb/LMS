export interface AprovalCoverageTabsInterface {
  TimeTrackerTabs: TimeTrackerTabs;
  activeTab: ActiveTab;
  coverCount: number;
  coverageCount: number;
  isCoverageTabActive: boolean;
  setIsCoverageTabActive: (iscover: boolean) => void;
}

interface ActiveTab {
  name: string;
}

interface TimeTrackerTabs {
  Approvals: string;
  MyRequests: string;
}
