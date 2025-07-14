import React, { FC } from 'react';
import { styles } from '../styles';
import { ScrollView, TouchableOpacity } from 'react-native';
import { _Text, _TextInput, _View } from '../../../../../../components';
import { CustomTagsDropdown } from '../../CustomTagsDropdown';
import { AddTagsProps } from 'interfaces';
export const AddTags: FC<AddTagsProps> = ({
  tagText,
  allTags,
  submitTag,
  setTagText,
  isUserAdmin,
  inventoryTags,
  isShipmentItem,
  setInventoryTags,
}) => {
  return (
    <_View style={{ ...styles.input, zIndex: 1 }}>
      <_TextInput
        style={[
          styles.inputText,
          { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
        ]}
        editable={isUserAdmin && !isShipmentItem ? true : false}
        width={'20%'}
        placeholder='Tags'
        defaultValue={tagText?.toString()}
        onChangeText={(text) => {
          setTagText(text);
        }}
        onSubmitEditing={(e) => {
          submitTag(e);
        }}
      />
      <_View style={{ ...styles.input, ...styles.tagsInput }}>
        <_View style={styles.tagParentContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 0.1 }}
          >
            {inventoryTags?.map((tag, index) => {
              return (
                <TouchableOpacity
                  delayPressIn={0}
                  key={index}
                  style={[
                    styles.tagContainer,
                    { backgroundColor: tag?.tagColor },
                  ]}
                >
                  <_Text style={styles.tagText}>{tag?.tagName}</_Text>
                  <TouchableOpacity
                    disabled={isUserAdmin ? false : true}
                    onPress={() =>
                      setInventoryTags(
                        inventoryTags.filter((item) => item != tag)
                      )
                    }
                    style={styles.tagCross}
                  >
                    {isUserAdmin && !isShipmentItem && (
                      <_Text style={styles.tagCross}>x</_Text>
                    )}
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </_View>
      </_View>
      {tagText !== '' && (
        <_View style={{ position: 'absolute', top: 40, width: '100%' }}>
          <CustomTagsDropdown
            allTags={allTags}
            inventoryTags={inventoryTags}
            tagText={tagText}
            setTagText={setTagText}
            submitTag={submitTag}
          />
        </_View>
      )}
    </_View>
  );
};
