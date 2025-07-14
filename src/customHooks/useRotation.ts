import { useEffect, useMemo, useState } from 'react';
import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

export const useRotation = () => {
  const [isPortrait, setIsPortrait] = useState(height > width);

  const memoizeUpdateOrientation = useMemo(() => updateOrientation, [
    height,
    width,
  ]);

  const updateOrientation = () => {
    const { height, width } = Dimensions.get('window');
    setIsPortrait(height > width);
  };

  useEffect(() => {
    const onRotationChangeEvent = Dimensions.addEventListener(
      'change',
      memoizeUpdateOrientation,
    );
    return () => onRotationChangeEvent.remove();
  }, []);

  return isPortrait;
};

export default useRotation;
