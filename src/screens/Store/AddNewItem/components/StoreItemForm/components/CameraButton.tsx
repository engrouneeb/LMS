import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { whiteThemeColors } from 'utilities';
import { _Text, _View } from '../../../../../../components';
import { styles } from '../styles';

interface Props {
  onPress: () => void;
  fileName: string;
}

export const CameraButton: FC<Props> = ({ onPress, fileName }) => {
  return (
    <_View style={styles.imagePicker}>
      <TouchableOpacity style={styles.imagePickerView} onPress={onPress}>
        <AntDesign name='camera' size={25} color={whiteThemeColors.white} />
      </TouchableOpacity>
      {fileName !== '' && (
        <_View style={styles.imageNameContainer}>
          <_Text
            numberOfLines={1}
            style={{ ...styles.textboxTitle, width: '80%', marginTop: 5 }}
          >
            {fileName}
          </_Text>
        </_View>
      )}
    </_View>
  );
};
