import React from 'react';
import { _View, _VectorIcons } from '../../../../../../components';
import { Platform } from 'react-native';
import { whiteThemeColors } from '../../../../../../Utilities';
import { CodeSvg } from '../../../../../../../assets/Icons';
import { styles } from '../styles';

export const courseTypes = {
  general: 1,
  video: 2,
  audio: 3,
  assessment: 4,
  code: 5,
  html: 7,
  download: 8,
  homework: 6,
};

export const getSvg = (type: number) => {
  switch (type) {
    case courseTypes.general:
      return (
        <_View style={styles.svg}>
          <_VectorIcons
            type={
              Platform.OS == 'android'
                ? 'FontAwesome'
                : 'MaterialCommunityIcons'
            }
            name={
              Platform.OS == 'android'
                ? 'address-card-o'
                : 'card-account-details'
            }
            size={30}
            color={whiteThemeColors.icons.primaryIcon}
          />
        </_View>
      );

    case courseTypes.video:
      return (
        <_View style={styles.svg}>
          <_VectorIcons
            type='Foundation'
            name='play-video'
            size={30}
            color={whiteThemeColors.icons.redDarkIcon}
          />
        </_View>
      );

    case courseTypes.audio:
      return (
        <_View style={styles.svg}>
          <_VectorIcons
            type='FontAwesome'
            name='file-audio-o'
            size={25}
            color={whiteThemeColors.icons.redIcon}
          />
        </_View>
      );

    case courseTypes.assessment:
      return (
        <_View style={styles.svg}>
          <_VectorIcons
            type='FontAwesome'
            name='pencil-square-o'
            size={25}
            color={whiteThemeColors.icons.greenDarkIcons}
          />
        </_View>
      );

    case courseTypes.code:
      return <CodeSvg size={35} color={whiteThemeColors.icons.purpleIcon} />;

    case courseTypes.html:
      return (
        <_View style={styles.svg}>
          <_VectorIcons
            type='Zocial'
            name='html5'
            size={25}
            color={whiteThemeColors.icons.purple2Icon}
          />
        </_View>
      );
    case courseTypes.download:
      return (
        <_View
          style={{
            ...styles.svg,
            height: 40,
          }}
        >
          <_VectorIcons
            type='Entypo'
            name='attachment'
            size={35}
            color={whiteThemeColors.icons.purple2Icon}
          />
        </_View>
      );
    default:
      return (
        <_View style={styles.svg}>
          <_VectorIcons
            type='FontAwesome'
            name='address-card-o'
            size={25}
            color={whiteThemeColors.icons.purple2Icon}
          />
        </_View>
      );
  }
};
