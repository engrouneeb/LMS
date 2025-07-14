export interface ChallengeItemInterface {
  item: item;
  index: number;
  onPress: () => void;
}
interface item {
  id: number;
  isCompleted: boolean;
  isOfflineAssessment: boolean;
  name: string;
  parentId: number;
  type: number;
}
