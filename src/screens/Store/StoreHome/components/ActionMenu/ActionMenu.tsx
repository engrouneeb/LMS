import React, { FC } from 'react';
import ActionButton from 'react-native-action-button';
import { whiteThemeColors } from 'utilities';
import { _VectorIcons } from '../../../../../components';
import { styles } from './styles';

interface Props {
  onDelete: () => void;
  onEdit: () => void;
  size?: number;
}
export const ActionMenu: FC<Props> = ({ onDelete, onEdit, size = 25 }) => {
  return (
    <ActionButton
      size={size}
      hideShadow
      position={'right'}
      verticalOrientation={'down'}
      degrees={180}
      buttonColor={whiteThemeColors.primary}
      style={{ marginTop: -25, marginRight: -28, elevation: 10 }}
      useNativeFeedback={false}
      spacing={5}
      renderIcon={() => (
        <_VectorIcons type={'Entypo'} name='dots-three-vertical' size={14} />
      )}
    >
      <ActionButton.Item
        buttonColor={'#679267'}
        useNativeFeedback={false}
        onPress={onEdit}
      >
        <_VectorIcons
          type={'Entypo'}
          name='pencil'
          style={styles.actionButtonIcon}
        />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor={whiteThemeColors.red}
        useNativeFeedback={false}
        onPress={onDelete}
      >
        <_VectorIcons
          type={'Entypo'}
          name='trash'
          style={styles.actionButtonIcon}
        />
      </ActionButton.Item>
    </ActionButton>
  );
};
