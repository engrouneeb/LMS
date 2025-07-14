import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { CustomAlert, whiteThemeColors } from 'utilities';
import { _TextInput, _VectorIcons, _View } from '../../../../../../components';
import CommonStyles from 'screens/CommonStyles';
interface props {
  addReply: (cmntobj: any, comment: any) => void;
  commentObj?: any;
  placeholder?: string;
}
const AddComentReply: React.FC<props> = ({
  addReply,
  commentObj,
  placeholder,
}) => {
  const [comment, setComment] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  return (
    <_View style={styles.container}>
      <_View style={styles.txtBtnContainer}>
        <_TextInput
          placeholder={placeholder}
          multiline={true}
          textAlignVertical='top'
          value={comment}
          onChangeText={(value) => {
            setComment(value);
          }}
          width={'88%'}
          style={styles.txtInp}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            {
              console.log('here'),
                comment.trim().length > 0
                  ? (addReply(commentObj, comment), setComment(''))
                  : [
                      setShowAlert(true),
                      setAlertMessage(`Please write ${placeholder}`),
                      setAlertTitle('Error'),
                    ];
            }
          }}
        >
          <_VectorIcons
            type='FontAwesome'
            name='send'
            size={13}
            style={{
              color: whiteThemeColors.white,
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>
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
export default React.memo(AddComentReply);

const styles = StyleSheet.create({
  container: {
    backgroundColor: whiteThemeColors.white + 90,
    borderRadius: 10,
    marginVertical: 1,
    padding: 10,
    width: '94%',
    alignSelf: 'center',
  },
  txtBtnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    // borderWidth: 0.8,
    borderColor: 'lightgrey',
    paddingRight: 10,
  },
  txtInp: {
    height: 50,
    padding: 5,
    paddingTop: 10,
    alignSelf: 'center',
    fontFamily: CommonStyles.fonts.regular,
  },
  btn: {
    height: 30,
    width: 30,
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    marginRight: 5,
    backgroundColor: whiteThemeColors.primary,
  },
});
