import { WagesItemWageCardInterface } from '../../../../../../../../interfaces';
import React, { FC } from 'react';
import { TouchableHighlight, TouchableOpacity } from 'react-native';
import { whiteThemeColors } from '../../../../../../../../Utilities';
import { _Text, _VectorIcons, _View } from '../../../../../../../../components';
import { UserImg } from '../../../../../../../ThumbNail';
import { styles } from './style';

export const WageCard: FC<WagesItemWageCardInterface> = ({
  onPressCard,
  Obj,
  onPressSummary,
  onPressArrow,
  expanded,
}) => {
  return (
    <TouchableHighlight
      underlayColor={whiteThemeColors.primary + '10'}
      onPress={onPressCard}
      style={styles.mainContainer}
    >
      <_View style={styles.subContainer}>
        <_View style={styles.cardCont}>
          <UserImg
            UserInfo={{
              FirstName: Obj.userName,
              LastName: Obj.userName,
              UserImage: Obj.returnUrl,
              UserImageColor: whiteThemeColors.primary,
            }}
            size={50}
          />
          <_View style={styles.flexDirectionRow}>
            <_View style={styles.nameContainer}>
              <_View style={styles.justifyContentCenter}>
                <_Text style={styles.userNameTitle}>{Obj.userName}</_Text>
                <_Text style={styles.roleText}>{Obj.role}</_Text>
              </_View>
            </_View>
          </_View>
          <_View style={styles.summaryContainer}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.summaryBtn}
              onPress={onPressSummary}
            >
              <_Text style={styles.summaryText}>Summary</_Text>
              <_VectorIcons
                type='FontAwesome5'
                style={styles.eyeIcon}
                color={whiteThemeColors.primary}
                size={11}
                name='eye'
              />
            </TouchableOpacity>
          </_View>
        </_View>
        <TouchableOpacity
          style={styles.arrowBtnContainer}
          onPress={onPressArrow}
        >
          <_VectorIcons
            name={expanded ? 'chevron-thin-up' : 'chevron-thin-down'}
            type={'Entypo'}
            size={17}
            color={whiteThemeColors.white}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </_View>
    </TouchableHighlight>
  );
};
