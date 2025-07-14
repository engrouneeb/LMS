import { FC } from 'react';
import { Pressable } from 'react-native';
import { _View, _Text } from 'components';
import { UserImg } from 'screens/ThumbNail';
import { whiteThemeColors } from 'utilities';
import { styles } from '../style';

interface RenderItemInterface {
  studentName: string;
  onItemPress: () => void;
  studentId: string;
}

export const RenderItem: FC<RenderItemInterface> = ({
  studentName,
  onItemPress,
  studentId,
}) => {
  return (
    <Pressable key={studentId} onPress={onItemPress} style={styles.mainView}>
      <_View style={styles.touchView}>
        <_View style={styles.renderItemSubContainer}>
          <_View style={styles.leftView}>
            <UserImg
              UserInfo={{
                FirstName: studentName,
                LastName: studentName.split(' ')[1],
                UserImage: '',
                UserImageColor: whiteThemeColors.primary,
              }}
              size={60}
            />
          </_View>

          <_View style={styles.midView}>
            <_Text numberOfLines={1} style={styles.mainText}>
              {studentName}
            </_Text>
          </_View>
        </_View>
      </_View>
    </Pressable>
  );
};
