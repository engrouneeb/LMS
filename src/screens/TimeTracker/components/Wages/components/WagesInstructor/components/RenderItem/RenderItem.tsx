import { WagesInstructorRenderItemInterface } from '../../../../../../../../interfaces';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  convertUTCDateToLocalDateStringFormat,
  isInstructor,
  whiteThemeColors,
} from '../../../../../../../../Utilities';
import { _Text, _VectorIcons, _View } from '../../../../../../../../components';
import { styles } from './style';

export const RenderItem: React.FC<WagesInstructorRenderItemInterface> = ({
  item,
  addWage,
  WAGES_FROM,
  WAGES_TYPE,
  role,
  _onPress,
}) => {
  var _wageFrom_ = item.wageFrom;
  var wageFrom = '';
  WAGES_FROM.forEach((v) => {
    if (v.key == _wageFrom_) wageFrom = v.value;
  });
  var _wageType_ = item.wageType;
  var wageType = '';
  WAGES_TYPE.forEach((v) => {
    if (v.key == _wageType_) wageType = v.value;
  });
  if (wageType.length == 0) return null;
  return (
    <_View style={styles.container}>
      <TouchableOpacity
        disabled={isInstructor(role)}
        style={styles.card}
        onPress={_onPress}
      >
        <_View style={styles.cardinner}>
          <_View style={styles.iconContainer}>
            <_VectorIcons
              type={'MaterialCommunityIcons'}
              name={'calendar-check-outline'}
              size={35}
              color={whiteThemeColors.primary}
            />
          </_View>
        </_View>
        <_View style={styles.infoContainer}>
          <_View>
            <_Text numberOfLines={2} style={styles.nameText}>
              {item.itemName}
            </_Text>
          </_View>
          <_View style={styles.fromContainer}>
            <_View style={styles.fromSubContainer}>
              <_Text style={styles.fromText}>{addWage.WageFrom}</_Text>
              <_Text style={styles.fromTextValue}>{wageFrom}</_Text>
            </_View>
            <_View style={styles.wageTypeContainer}>
              <_Text style={styles.typeKey}>{addWage.WageType}</_Text>
              <_Text style={styles.typeValue}>{wageType}</_Text>
            </_View>
          </_View>
          <_View style={styles.effectTimeContainer}>
            <_Text style={styles.dateValue}>
              {item.effectiveDate &&
                convertUTCDateToLocalDateStringFormat(item.effectiveDate)}
            </_Text>
          </_View>
        </_View>
      </TouchableOpacity>
    </_View>
  );
};
