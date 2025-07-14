import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { whiteThemeColors } from 'utilities';
import { _Text, _View } from '../../../../components';
import { CustomTagsDropdownProps } from '../../../../interfaces';

const CustomTagsDropdown: FC<CustomTagsDropdownProps> = ({
  allTags,
  tagText,
  inventoryTags,
  setTagText,
  submitTag,
}) => {
  const onSelectTag = (tag: { text: string }) => {
    inventoryTags?.push({
      tagName: tag?.text,
      tagColor: '#1271c4',
    });
    setTagText('');
  };
  return (
    <_View style={styles.parentContainer}>
      <_View style={styles.container}>
        <TouchableOpacity style={styles.typingTag} onPress={submitTag}>
          <_Text style={{ ...styles.tagsText, paddingBottom: 5 }}>
            {tagText}
          </_Text>
        </TouchableOpacity>
        {allTags?.map((tag, index) => {
          if (tag?.text?.toLowerCase().includes(tagText.toLowerCase())) {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  onSelectTag(tag);
                }}
              >
                <_Text style={styles.tagsText}>{tag?.text}</_Text>
              </TouchableOpacity>
            );
          }
        })}
      </_View>
    </_View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    width: '50%',
    height: '100%',
    backgroundColor: whiteThemeColors.white,
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    padding: 10,
    zIndex: 1,
    height: '100%',
  },
  tagsText: {
    fontSize: 12,
    marginTop: 5,
  },
  typingTag: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.2,
  },
});

export { CustomTagsDropdown };
