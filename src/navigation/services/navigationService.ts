import { createNavigationContainerRef } from '@react-navigation/native';
import { MainStackParamList } from '../types';

export const navigationRef = createNavigationContainerRef<MainStackParamList>();

export const navigate = <RouteName extends keyof MainStackParamList>(
  name: RouteName,
  params?: MainStackParamList[RouteName]
) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

export const goBack = () => {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
};

export const resetRoot = (routeName: keyof MainStackParamList) => {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name: routeName }],
    });
  }
}; 