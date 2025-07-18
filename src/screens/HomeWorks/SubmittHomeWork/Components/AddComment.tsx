import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { CustomAlert, whiteThemeColors } from '../../../../Utilities';
import { _Text, _TextInput, _VectorIcons, _View } from '../../../../components';
interface props {
  addReply: (comment: any) => void;
  comments?: string;
  placeholder?: string;
}
export const AddComment: React.FC<props> = ({
  addReply,
  comments,
  placeholder,
}) => {
  const [comment, setComment] = useState(comments);
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  return (
    <_View style={styles.container}>
      <_View style={styles.titleContainer}>
        <_VectorIcons
          type='MaterialIcons'
          name='chat'
          size={25}
          color={whiteThemeColors.primaryDark}
        />

        <_Text
          style={{
            fontSize: 15,
            color: whiteThemeColors.primaryDark,
            fontWeight: '600',
            marginLeft: 5,
          }}
        >
          Comment
        </_Text>
      </_View>
      <_View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: 4,
          borderWidth: 1,
          borderColor: whiteThemeColors.primary,
          paddingRight: 10,
        }}
      >
        <_TextInput
          multiline
          placeholder={placeholder}
          textAlignVertical='top'
          value={comment}
          onChangeText={(value) => {
            addReply(value);
          }}
          width={'95%'}
          style={{
            height: 80,
            fontSize: 15,
            paddingHorizontal: 10,
            alignSelf: 'center',
          }}
        />
      </_View>
      {showAlert && (
        <CustomAlert
          visible={showAlert}
          title={alertTitle}
          msg={alertMessage}
          firstBtn={'Okay'}
          firstBtnFunc={() => {
            setShowAlert(false);
          }}
        />
      )}
    </_View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 7,
    width: '97%',
    alignSelf: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  txtBtnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 7,
    borderWidth: 0.8,
    borderColor: 'lightgrey',
    paddingRight: 10,
  },
  txtInp: {
    height: 80,
    padding: 5,
    paddingTop: 10,
    alignSelf: 'center',
  },
  btn: {
    height: 35,
    width: 80,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: whiteThemeColors.primary,
  },
  btnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: whiteThemeColors.primary,
    alignSelf: 'center',
  },
});
