import React, { FC } from 'react';
import { styles } from '../styles';
import { whiteThemeColors } from 'utilities';
import { Text, TextInput, TouchableOpacity } from 'react-native';
import { _VectorIcons, _View } from '../../../../../../components';
import { ManageInventoryCardHeader } from '../../../../../../interfaces';

export const HeaderCard: FC<ManageInventoryCardHeader> = ({
  isAddingNew,
  onAddingNew,
  setIsAddingNew,
  newCategoryName,
  setNewCategoryName,
  CreateUpdateStoreCategory,
}) => {
  return (
    <_View style={styles.itemCard}>
      {!isAddingNew ? (
        <TouchableOpacity
          onPress={onAddingNew}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <_VectorIcons
            type='MaterialCommunityIcons'
            name='plus-circle'
            size={48}
            color={whiteThemeColors.primary}
          />
        </TouchableOpacity>
      ) : (
        <>
          <_View style={styles.itemView1}>
            <Text style={styles.inventoryText}>{'Name'}</Text>
            <TextInput
              autoFocus={true}
              selectionColor={whiteThemeColors.primary}
              defaultValue={newCategoryName}
              onChangeText={(text) => setNewCategoryName(text)}
              onSubmitEditing={(e) => setIsAddingNew(false)}
              style={styles.inventoryInput}
            />
          </_View>
          {newCategoryName !== '' ? (
            <TouchableOpacity
              style={{
                ...styles.saveIcon,
                backgroundColor:
                  newCategoryName === ''
                    ? whiteThemeColors.greyDark
                    : whiteThemeColors.green,
              }}
              onPress={() => {
                CreateUpdateStoreCategory();
              }}
            >
              <_VectorIcons type='Entypo' name='save' />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                ...styles.saveIcon,
                backgroundColor: whiteThemeColors.primary + 20,
              }}
              onPress={() => {
                setIsAddingNew(false);
              }}
            >
              <_VectorIcons
                type={'EvilIcons'}
                name='close'
                color={whiteThemeColors.black}
              />
            </TouchableOpacity>
          )}
        </>
      )}
    </_View>
  );
};
