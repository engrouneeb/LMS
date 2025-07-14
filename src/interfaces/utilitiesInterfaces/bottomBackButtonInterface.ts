export interface BottomBackButtonInterface {
  text?: string;
  onPress: () => void;
  iconName: string;
  iconType: string;
  size?: number | string;
  iconSize?: number;
  loading?: boolean;
}
