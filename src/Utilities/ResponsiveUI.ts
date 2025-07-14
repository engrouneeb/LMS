import { Dimensions, PixelRatio } from 'react-native';

let { width, height } = Dimensions.get('window');

export function getWidth(number: number | string) {
  let numType = typeof number === 'number' ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((numType * width) / 100);
}

export function getHeight(number: number | string) {
  let numType = typeof number === 'number' ? number : parseFloat(number);

  return PixelRatio.roundToNearestPixel((numType * height) / 100);
}
