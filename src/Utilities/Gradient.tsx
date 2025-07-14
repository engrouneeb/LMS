import { FC } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { CGradientProps } from '../interfaces';

export const CGradient: FC<CGradientProps> = ({ colors, children }) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 2 }}
      locations={[0.0, 0.45]}
      colors={colors}
      style={[
        {
          flex: 1,
        },
      ]}
    >
      {children}
    </LinearGradient>
  );
};
