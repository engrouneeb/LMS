import React, { useEffect } from 'react';
import AnimateNumber from 'react-native-animate-number';
interface props {
  Count: number;
}
export const Counter: React.FC<props> = ({ Count }) => {
  let count,
    countValue,
    countByValue = 1;
  count = Math.abs(Count);
  countValue = Count;
  if (count >= 1 && count <= 100) {
    countByValue = 10;
  } else if (count >= 100 && count <= 200) {
    countByValue = 20;
  } else if (count >= 200 && count <= 500) {
    countByValue = 40;
  } else if (count >= 500 && count <= 1000) {
    countByValue = 60;
  } else if (count >= 1000) {
    countByValue = 100;
  } else if (count >= 10000) {
    countByValue = 1000;
  } else if (count >= 100000) {
    countByValue = 10000;
  }
  useEffect(() => {
    return () => {
      count = 0;
    };
  }, []);
  return (
    <AnimateNumber value={countValue && countValue} countBy={countByValue} />
  );
};
