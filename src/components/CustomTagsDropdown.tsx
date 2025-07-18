import React, { FC } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { whiteThemeColors } from '../Utilities';
import { TagsDropdownTypes, Tag } from '../interfaces';

const CustomTagsDropdown: FC<TagsDropdownTypes> = ({
  allTags,
  tagText,
  inventoryTags,
  setTagText,
  submitTag,
}) => {
  const onSelectTag = (tag: Tag) => {
    inventoryTags?.push({
      tagName: tag?.text,
      tagColor: '#1271c4',
    });
    setTagText('');
  };
  return (
    <View style={styles.parentContainer}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.typingTag} onPress={submitTag}>
          <Text style={{ ...styles.tagsText, paddingBottom: 5 }}>
            {tagText}
          </Text>
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
                <Text style={styles.tagsText}>{tag?.text}</Text>
              </TouchableOpacity>
            );
          }
        })}
      </View>
    </View>
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

export default CustomTagsDropdown;
