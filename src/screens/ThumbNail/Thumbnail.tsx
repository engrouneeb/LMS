import { ThumbnailInterface } from '../../interfaces';
import React, { useEffect, useState } from 'react';
import { whiteThemeColors } from '../../Utilities';
import { _Image, _Text, _View } from '../../components';
import CommonStyles from '../CommonStyles';

export const UserImg: React.FC<ThumbnailInterface> = ({
  size,
  UserInfo,
  fontSize = 16,
}) => {
  const [_userInfo, setUserInfo] = useState(UserInfo);
  useEffect(() => {
    if (UserInfo) setUserInfo(UserInfo);
  }, [UserInfo]);

  if (Object.values(UserInfo).every((value) => value === undefined))
    return null;

  return _userInfo.UserImage ? (
    <_Image
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onError={() => setUserInfo({ ..._userInfo, UserImage: '' })}
      uri={UserInfo.UserImage}
    />
  ) : (
    <_View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor:
          UserInfo.UserImageColor == null || ''
            ? whiteThemeColors.primary
            : UserInfo.UserImageColor,
      }}
    >
      {(UserInfo?.FirstName ?? '') && (
        <_Text
          style={{
            textTransform: 'uppercase',
            fontSize: fontSize,
            fontFamily: CommonStyles.fonts.semiBold,

            color: 'white',
          }}
        >
          {`${UserInfo?.FirstName[0]}${UserInfo?.LastName[0]}`}
        </_Text>
      )}
    </_View>
  );
};
