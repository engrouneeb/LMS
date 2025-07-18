import { _Text, _VectorIcons, _View } from '../../../../components';
import React from 'react';
import { Pressable } from 'react-native';
import { whiteThemeColors } from '../../../../Utilities';
import { styles } from './Styles';
import { RenderItemProps } from '../../../../interfaces';

export const RenderItem: React.FC<any> = ({ item, openFile }) => {
  return (
    <Pressable
      onPress={() => openFile(item)}
      style={[styles.itemContainer, styles.borderShadow]}
    >
      <_View style={styles.fileIconContainer}>
        <_View style={styles.filetxtContainer}>
          <_Text style={styles.filelabelTxt}>
            {item?.fileExtension?.slice(1) || 'pdf'}
          </_Text>
        </_View>
        <_VectorIcons
          name={'insert-drive-file'}
          type={'MaterialIcons'}
          size={50}
          color={whiteThemeColors.white}
          style={{
            zIndex: 5,
          }}
        />
      </_View>

      <_View style={{ width: 120 }}>
        <_Text numberOfLines={2} style={styles.fileNameText}>
          {item.fileName || 'abc.pdf'}
        </_Text>
      </_View>
    </Pressable>
  );
};
