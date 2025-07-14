export interface ThumbnailInterface {
  UserInfo: UserInfoInterface;
  size: any;
  style?: any;
  fontSize?: number;
}

interface UserInfoInterface {
  FirstName: string;
  LastName: string;
  UserImage: string;
  UserImageColor: string;
}
