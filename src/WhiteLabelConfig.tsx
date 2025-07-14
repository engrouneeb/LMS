import { NativeModules } from 'react-native';

export default class WhiteLabelConfig {
  public static readonly APP_NAME: string = NativeModules.WhiteLabelConfig.getAppName();
  public static readonly APP_VARIANT_NAME: string = NativeModules.WhiteLabelConfig.getVariantName();
  public static readonly APP_VARIANT_URL: string = NativeModules.WhiteLabelConfig.getVariantURL();
  public static readonly PRIMARY_COLOR: string = NativeModules.WhiteLabelConfig.getPrimaryColor();
  public static readonly PRIMARY_TEXT_COLOR: string = NativeModules.WhiteLabelConfig.getPrimaryTextColor();
  public static readonly GREETING_TEXT: string = NativeModules.WhiteLabelConfig.getGreetingText();
  public static readonly SPLASH_LOGO_SIZE: string = NativeModules.WhiteLabelConfig.getSplashCircleLogoSize();
  public static readonly COLORS: object = NativeModules.WhiteLabelConfig.pass();
  public static readonly GET_STARTED_IMAGE_SIZE: string = NativeModules.WhiteLabelConfig.getStartedImageSize();
}
