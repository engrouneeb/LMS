import React from 'react';
import { TouchableHighlight } from 'react-native';
import { CheckSvg } from '../../../../../../../assets/Icons';
import { _Text, _VectorIcons, _View } from '../../../../../../components';
import { whiteThemeColors } from 'utilities';
import { getSvg } from './StepsFunctions';
import { styles } from '../styles';
import { ChallengeItemInterface } from 'interfaces';

export const ChallengeItem: React.FC<ChallengeItemInterface> = ({
  item,
  index,
  onPress,
}) => {
  return (
    <TouchableHighlight
      key={index}
      underlayColor={whiteThemeColors.greyDark + '20'}
      onPress={onPress}
      style={styles.courseItem}
    >
      <_View style={styles.courseItemContainer}>
        <_View style={styles.listLeftSide}>{getSvg(item.type)}</_View>
        <_View style={{ flex: 0.8, flexDirection: 'row', marginLeft: 10 }}>
          <_Text numberOfLines={2} style={styles.courseName}>
            {item.name}
          </_Text>
          {item.isCompleted === true ? (
            <_View style={styles.completed}>
              <CheckSvg size={18} color={whiteThemeColors.primary} />
            </_View>
          ) : null}
        </_View>
        <_View
          style={{
            width: 30,
            height: 30,
            backgroundColor: whiteThemeColors.primary + 20,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <_VectorIcons
            type={'AntDesign'}
            name='right'
            size={12}
            color={whiteThemeColors.farwardIcon.color}
          />
        </_View>
      </_View>
    </TouchableHighlight>
  );
};
