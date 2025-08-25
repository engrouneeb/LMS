import React, { FC, ReactNode } from 'react';
import { SafeAreaView, View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../app/providers/ThemeProvider';

export interface ScreenProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  safeArea?: boolean;
  style?: ViewStyle;
  backgroundColor?: string;
}

export const Screen: FC<ScreenProps> = ({
  children,
  header,
  footer,
  safeArea = true,
  style,
  backgroundColor,
}) => {
  const { colors } = useTheme();

  const Container = safeArea ? SafeAreaView : View;

  return (
    <Container
      style={[
        styles.container,
        { backgroundColor: backgroundColor || colors.background },
        style,
      ]}
    >
      {header}
      <View style={styles.content}>{children}</View>
      {footer}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
}); 