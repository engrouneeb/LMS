export interface reportChartInterface {
  chartsData: ChartsData;
}

interface ChartsData {
  assessmentList: any;
  challengeList: any;
  isLoading: boolean;
  numberOfStacks: number;
  pieChartData: any;
  reportData: ReportData;
  stackBarChartData: StackBarChartData;
  stackBarChartWidth: number;
  lengthCount?: any;
}

interface StackBarChartData {
  barColors: any;
  data: any;
  labels: any;
  legend: any;
}

interface ReportData {
  assessmentName: string;
  assessmentTemplateId: number;
  assignmentId: number;
  dataForReport: any;
  isLoadChart: boolean;
  resultId: number;
  status: number;
  studentId: number;
  studentName: string;
}
