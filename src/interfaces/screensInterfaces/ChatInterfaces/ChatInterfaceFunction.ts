interface ImageFunctionType {
  image: any;
  video?: undefined;
  audio?: undefined;
  file?: undefined;
}
interface VideoFunctionType {
  video: any;
  image?: undefined;
  audio?: undefined;
  file?: undefined;
}
interface AudioFunctionType {
  audio: any;
  image?: undefined;
  video?: undefined;
  file?: undefined;
}

export type ChatInterfaceFunction =
  | ImageFunctionType
  | VideoFunctionType
  | AudioFunctionType;
