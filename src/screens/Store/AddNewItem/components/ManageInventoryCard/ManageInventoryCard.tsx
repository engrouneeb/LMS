import React, { FC } from 'react';
import { TextInput } from 'react-native';
import { whiteThemeColors } from '../../../../../Utilities';
import { _Text, _VectorIcons, _View } from '../../../../../components';
import { ActionMenu } from '../../../StoreHome/components/ActionMenu/ActionMenu';
import { styles } from './styles';
import { ManageInventoryCardProps } from '../../../../../interfaces';
import CommonStyles from '../../../../../screens/CommonStyles';
export const ManageInventoryCard: FC<ManageInventoryCardProps> = ({
  item,
  index,
  DeleteCategory,
  onEdit,
  setEditingItem,
}) => {
  return (
    <_View style={styles.itemCard}>
      <_View style={styles.cardDesign}></_View>

      <_VectorIcons
        type={'MaterialCommunityIcons'}
        name='storefront'
        size={35}
        color={whiteThemeColors.primary}
        style={{ alignSelf: 'center', zIndex: 10 }}
      />

      <_View style={styles.itemView1}>
        <_Text style={styles.inventoryText}>Name</_Text>
        <TextInput
          editable={false}
          selectionColor={whiteThemeColors.primary}
          defaultValue={item.name}
          onChangeText={(text) => setEditingItem(text)}
          multiline
          style={[
            {
              ...styles.inventoryText,
              fontSize: 16,
              color: whiteThemeColors.black,
              width: 180,
              height: 40,
              paddingVertical: 1,
              fontFamily: CommonStyles.fonts.semiBold,
            },
          ]}
        />
      </_View>
      <_View style={styles.itemView2}>
        <ActionMenu
          onDelete={() => DeleteCategory(item.id)}
          onEdit={() => onEdit(item, index)}
        />
      </_View>
    </_View>
  );
};
