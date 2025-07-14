import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _TextInput, _VectorIcons, _View } from '../../../../../components';
import { EditDiscussionInterface } from 'interfaces';
import CommonStyles from 'screens/CommonStyles';
const _EditDiscussion: React.FC<EditDiscussionInterface> = ({
  intialValue,
  submmitEditedDiscussion,
  commentObj,
  replyObject,
}) => {
  const [comment, setComment] = useState(intialValue);
  return (
    <_View style={styles.container}>
      <_View
        style={{
          width: 20,
          height: 20,
          position: 'absolute',
          right: 0,
          top: -5,
          backgroundColor: whiteThemeColors.greyDark,
          borderRadius: 20,
        }}
      >
        <TouchableOpacity
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => {
            submmitEditedDiscussion(comment, commentObj, replyObject, true);
          }}
        >
          <_VectorIcons
            type='FontAwesome'
            name='close'
            size={12}
            color={whiteThemeColors.white}
          />
        </TouchableOpacity>
      </_View>
      <_TextInput
        multiline
        value={comment}
        onChangeText={(value) => {
          setComment(value);
        }}
        width={'88%'}
        style={{
          height: 50,
          padding: 5,
          fontFamily: CommonStyles.fonts.regular,
        }}
      />

      <TouchableOpacity
        style={styles.sendBtn}
        onPress={() => {
          submmitEditedDiscussion(comment, commentObj, replyObject);
        }}
      >
        <_VectorIcons
          type='FontAwesome'
          name='send'
          size={12}
          color={whiteThemeColors.white}
          style={{ alignSelf: 'center' }}
        />
      </TouchableOpacity>
    </_View>
  );
};
export const EditDiscussion = React.memo(_EditDiscussion);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f6',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    width: '94%',
    alignSelf: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  sendBtn: {
    height: 30,
    width: 30,
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: whiteThemeColors.primary,
  },
});
