import { Dimensions } from 'react-native';

const isPortrait = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
};

const isLandscape = () => {
  const dim = Dimensions.get('screen');
  return dim.width <= dim.height;
};
export function useOrientation() {
  return isPortrait() ? 'PORTRAIT' : 'LANDSCAPE';
}
