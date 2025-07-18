import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { whiteThemeColors } from '../../../Utilities';
import { _Text, _VectorIcons, _View } from '../../../components';
import { styles } from '../styles';

interface DropDownProps {
  isVisible: boolean;
  showCameraPicker: () => void;
  showImagePicker: () => void;
  setIsVisble: (value: boolean) => void;
}

export const DropDown: FC<DropDownProps> = ({
  isVisible,
  showCameraPicker,
  showImagePicker,
  setIsVisble,
}) => {
  const options = ['Camera', 'Gallery'];
  return (
    <_View
      style={[
        { display: isVisible ? 'flex' : 'none' },
        styles.uploadPicDropDown,
        styles.shadow,
      ]}
    >
      {options.map((obj, index) => {
        return (
          <TouchableOpacity
            onPress={() => {
              Boolean(obj === 'Camera')
                ? showCameraPicker()
                : showImagePicker(),
                setIsVisble(false);
            }}
            style={[
              { borderBottomWidth: index == 0 ? 0.4 : 0 },
              styles.uploadPicSingleOptionBtn,
            ]}
          >
            <_Text style={styles.uploadPicSingleOptionTxt}>{obj}</_Text>
            <_VectorIcons
              type={'AntDesign'}
              name={index == 0 ? 'camera' : 'picture'}
              color={whiteThemeColors.black}
            />
          </TouchableOpacity>
        );
      })}
    </_View>
  );
};
