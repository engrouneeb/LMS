import React, { FC } from 'react';
import { Image } from 'react-native';
import Placeholder from '../../../../../assets/courseImage.png';
import { _Text, _View, _Image, _VectorIcons } from '../../../../components';
import CommonStyles from '../../../CommonStyles';
import { styles } from './styles';
import { whiteThemeColors } from '../../../../Utilities';

interface ClassProps {
  classData: {
    courseImage: string;
    courseName: string;
    levelName: string;
    className: string;
  };
}
const ClassListCard: FC<ClassProps> = ({ classData }) => {
  return (
    <>
      <_View style={styles.leftIcon}>
        {classData?.courseImage == '/Content/Images/courseImage.png' ? (
          <Image style={styles.cardIcon} source={Placeholder} />
        ) : (
          <_Image style={styles.cardIcon} uri={classData?.courseImage} />
        )}
      </_View>
      <_View style={styles.cardBody}>
        <_Text
          numberOfLines={1}
          style={{
            fontFamily: CommonStyles.fonts.semiBold,

            color: whiteThemeColors.primary,
          }}
        >
          {classData?.courseName}
        </_Text>
        {classData?.levelName == undefined ? null : (
          <_Text
            numberOfLines={1}
            style={{
              fontSize: 10,
              fontFamily: CommonStyles.fonts.regular,
            }}
          >
            {classData?.levelName}
          </_Text>
        )}
        <_Text
          numberOfLines={1}
          style={{ fontSize: 10, fontFamily: CommonStyles.fonts.light }}
        >
          {classData?.className}
        </_Text>
      </_View>
      <_View
        style={{
          width: 30,
          height: 30,
          borderRadius: 9,
          backgroundColor: whiteThemeColors.primary + 30,
          position: 'absolute',
          right: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <_VectorIcons type={'AntDesign'} name={'right'} size={15} />
      </_View>
    </>
  );
};
export default ClassListCard;
