import { ScreensWithOutParams } from './ScreensWithoutParams';
import { ScreensWithParams } from './ScreenWithParams';

// type NavParams = keyof StoreScreensWithParams | StoreScreensWithOutParams;
export type Routes = keyof ScreensWithParams | ScreensWithOutParams;
export type RouteParam<K extends Routes | undefined = undefined> =
  K extends keyof ScreensWithParams ? ScreensWithParams[K] : undefined;
export type RouteParams = { [K in Routes]: RouteParam<K> };
export type RoutesRecord = Record<Routes, RouteParams>;
