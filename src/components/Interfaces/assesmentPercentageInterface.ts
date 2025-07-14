export interface assesmentPercentageInterface {
  reportData: ReportData;
}

interface ReportData {
  assessmentName: string;
  assessmentTemplateId: number;
  assignmentId: number;
  dataForReport: DataForReport;
  isLoadChart: boolean;
  resultId: number;
  status: number;
  studentId: number;
  studentName: string;
}

interface DataForReport {
  assessmentGradingCompleted: boolean;
  assessmentPassingPercentage: number;
  assessmentTimeTaken: any;
  assessmentTotalTime: any;
  chartDataList: any;
  dataPointResultIsPass: boolean;
  dataPointResultStatus: string;
  getDataPointPassPercentage: number;
  getPassPercentage: number;
  isDataPointBasedAssessment: boolean;
  isPass: boolean;
  isRubricUsed: boolean;
  pointsObtained: number;
  rubricUsedId: number;
  rubricUsedName?: any;
  totalAttempts: number;
  totalCorrectDataPointCount: number;
  totalCorrectQuestionsCount: number;
  totalDataPointsCount: number;
  totalNeedManualEvaluating: number;
  totalPoints: number;
  totalQuestionsCount: number;
  totalSkippedDataPointCount: number;
  totalSkippedQuestionsCount: number;
  totalWrongDataPointCount: number;
  totalWrongQuestionsCount: number;
}
