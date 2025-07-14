import { Dimensions, Platform, PixelRatio } from 'react-native';
const { width, height } = Dimensions.get('window');
import { isTablet } from './index';

// based on iphone 5s's scale
const scaled = width / 320;

export function normalize(size: number) {
  const newSize = size * scaled;
  if (Platform.OS === 'ios') {
    if (isTablet) {
      return size + 5;
    } else return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 3;
  } else {
    return size;
  }
}

const scale = (size: number) => width * size;
const verticalScale = (size: number) => height * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;
const moderateScaleHalf = (size: number, factor = 0.5) =>
  (size + (scale(size) - size) * factor) / 2;
const moderateScaleThird = (size: number, factor = 0.5) =>
  (size + (scale(size) - size) * factor) / 3;
const moderateScaleForth = (size: number, factor = 0.5) =>
  (size + (scale(size) - size) * factor) / 4;
const widthHalf = () => width / 2;
const widthThird = () => width / 3;
const widthForth = () => width / 4;
const heightHalf = () => height / 2;

export {
  scale,
  verticalScale,
  heightHalf,
  moderateScale,
  moderateScaleHalf,
  moderateScaleThird,
  moderateScaleForth,
  widthForth,
  widthThird,
  widthHalf,
  width,
  height,
};
