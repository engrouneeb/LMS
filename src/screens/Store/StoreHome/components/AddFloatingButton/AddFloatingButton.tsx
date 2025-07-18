import { TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import { _VectorIcons } from '../../../../../components';
import { whiteThemeColors } from '../../../../../Utilities';
import { styles } from './styles';
interface Props {
  onPress: () => void;
}
const AddFloatingButton: FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.addNewBtn} onPress={onPress}>
      <_VectorIcons
        type='AntDesign'
        name='plus'
        size={30}
        color={whiteThemeColors.primary}
        style={{ padding: 15 }}
      />
    </TouchableOpacity>
  );
};

export default AddFloatingButton;
