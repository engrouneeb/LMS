import React from 'react';
import { Image, TouchableHighlight } from 'react-native';
import img1 from '../../../../../../../assets/courseDefault.jpg';
import {
  _Image,
  _Text,
  _VectorIcons,
  _View,
} from '../../../../../../components';
import { whiteThemeColors } from '../../../../../../Utilities';
import { styles } from '../styles';
import { courseClassCardInterface } from '../../../../../../interfaces';

export const CourseClassCard: React.FC<courseClassCardInterface> = ({
  item,
  index,
  onPress,
}) => {
  return (
    <_View key={index + '--'} style={[styles.itemContainer]}>
      <TouchableHighlight
        style={styles.touchableBtn}
        underlayColor={whiteThemeColors.greenDark + '20'}
        onPress={onPress}
      >
        <_View style={styles.singleItem}>
          <_View style={{ width: 80 }}>
            <_View style={styles.picContainer}>
              {['', null, undefined].includes(item.item.imgUrl) ? (
                <Image source={img1} style={styles.pic} />
              ) : (
                <_Image style={styles.pic} uri={item.item.imgUrl} />
              )}
            </_View>
          </_View>
          <_View
            style={{
              alignItems: 'flex-start',
              flex: 1,
              paddingRight: 10,
            }}
          >
            <_Text numberOfLines={2} style={styles.itemTxt}>
              {item.item.text}
            </_Text>
          </_View>
          <_View
            style={{
              position: 'absolute',
              right: 2,
              bottom: 5,
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              backgroundColor: whiteThemeColors.primary + 20,
            }}
          >
            <_VectorIcons
              type='AntDesign'
              name='right'
              color={whiteThemeColors.primary}
              size={17}
            />
          </_View>
        </_View>
      </TouchableHighlight>
    </_View>
  );
};
