import {
  NavigationProp,
  RouteProp,
  StackNavigationState,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteParams, Routes } from './Routes';

/** For use with screens that do not receive route parameters */
export interface NavigationParams<K extends Routes = Routes> {
  navigation: NativeStackNavigationProp<RouteParams, K>;
  route: RouteProp<RouteParams, K> & { state: StackNavigationState };
}

/* For useNavigation */
export type NavigationProps = NavigationProp<RouteParams> & {
  replace: <K extends Routes | undefined>(
    route: Routes,
    params?: K extends Routes ? RouteParams[K] : RouteParams
  ) => void;
  openDrawer: () => void;
};
