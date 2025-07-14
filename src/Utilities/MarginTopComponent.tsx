import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { isPortrait } from './UtilsFunctions';
import { _View } from '../components';
import { marginTopComponentInterface } from 'interfaces';

export const MarginTopComponent: React.FC<marginTopComponentInterface> = ({
  portraitMargin,
  landscapeMargin,
}) => {
  const [height, setHeight] = useState(
    isPortrait() ? portraitMargin : landscapeMargin,
  );
  useEffect(() => {
    setHeight(isPortrait() ? portraitMargin : landscapeMargin);
  }, []);
  const orientationChange = (result: any) => {
    if (result.window.height > result.window.width) setHeight(portraitMargin);
    else setHeight(landscapeMargin);
  };
  useEffect(() => {
    const sub = Dimensions.addEventListener('change', orientationChange);

    return () => sub.remove();
  }, []);
  return <_View height={height} />;
};
