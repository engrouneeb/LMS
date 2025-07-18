import { FC } from 'react';
import { Image, Pressable } from 'react-native';
import { whiteThemeColors } from '../../../Utilities';
import { _Text, _VectorIcons, _View } from '../../../components';
import { styles } from '../styles';

interface AvatarProps {
  profilePicUri: string;
  isShownDropdown: boolean;
  hideDropdown: (value: boolean) => void;
  showFullScreenPic: (value: boolean) => void;
}

export const Avatar: FC<AvatarProps> = ({
  profilePicUri,
  isShownDropdown,
  hideDropdown,
  showFullScreenPic,
}) => {
  const openFullScreenPic = () => {
    showFullScreenPic(true);
  };
  return (
    <_View style={[styles.profilePicContainer, styles.profilePicShadow]}>
      <Pressable disabled={profilePicUri === ''} onPress={openFullScreenPic}>
        <Image
          source={
            profilePicUri === ''
              ? require('../../../../assets/TeamPlaceholder.png')
              : { uri: profilePicUri }
          }
          style={styles.profilePic}
        />
      </Pressable>
      <Pressable
        style={styles.profilePicBtn}
        onPress={() => {
          hideDropdown(!isShownDropdown);
        }}
      >
        <_View style={[styles.profilePicIconContainer, styles.shadow]}>
          <_VectorIcons
            type={'MaterialCommunityIcons'}
            name='camera'
            size={20}
            color={whiteThemeColors.primary}
          />
        </_View>
      </Pressable>
    </_View>
  );
};
