import { EditorInterface } from '../../../../../../../../interfaces';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';
import {
  isParent,
  isStudent,
  SummerNoteHtml,
  whiteThemeColors,
} from '../../../../../../../../Utilities';
import { _Text, _VectorIcons, _View } from '../../../../../../../../components';
import CommonStyles from '../../../../../../../CommonStyles';
import { Appstate } from '../../../../../../../../reducers/Appstate';

const Editor: React.FC<EditorInterface> = ({
  IntialValue,
  type,
  updateFunction,
  user,
  disabled,
}) => {
  const webRef: any = useRef(null);
  const User: any = useSelector((state: Appstate) => state.User.UserInfo);
  const [description, setDescription] = useState('');
  const [disableSummerNote, setDisableSummerNote] = useState('');
  const htmlInjectionCode = `$('#summernote').summernote('disable');`;
  const CheckRole = () => {
    if (disabled) {
      setDisableSummerNote(htmlInjectionCode);
    } else {
      if (isStudent(User.roleName) && type != 'Description') {
        setDisableSummerNote(htmlInjectionCode);
      } else if (isParent(User.roleName) && type == 'Instructor Feedback') {
        setDisableSummerNote(htmlInjectionCode);
      } else {
        setDisableSummerNote('');
      }
    }
  };

  useEffect(() => {
    CheckRole();
  }, [user]);

  let editorHtml = description != null ? description : '<p></p>';
  const run = `getHtmlFromEditor()`;
  useEffect(() => {
    let desc = IntialValue
      ? IntialValue == 'null'
        ? ''
        : IntialValue
      : '<p></p>';
    setDescription(desc);
  }, []);

  const GetHtml = (html: any) => {
    updateFunction(html);
    setDescription(html);
    Alert.alert('Success', 'Editor changes saved successfully');
  };

  return (
    <_View style={styles.container}>
      <_View style={styles.subContainer}>
        <_Text style={[styles.typeTxt]}>{type}</_Text>
      </_View>
      <WebView
        ref={webRef}
        source={{ html: SummerNoteHtml(editorHtml, disableSummerNote) }}
        onMessage={(event) => {
          GetHtml(event.nativeEvent.data);
        }}
      />
      <_View style={styles.fileImportCon}>
        {disabled ? null : (
          <TouchableOpacity
            onPress={() => {
              webRef.current.injectJavaScript(run);
            }}
            style={styles.importIcon}
          >
            <_View style={styles.icon}>
              <_VectorIcons
                name={'file-import'}
                type={'FontAwesome5'}
                size={21}
                color={whiteThemeColors.white}
              />
            </_View>
          </TouchableOpacity>
        )}
      </_View>
    </_View>
  );
};

export { Editor };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '95%',
    marginTop: 20,
    marginHorizontal: 10,
  },
  subContainer: {
    paddingLeft: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  typeTxt: {
    fontSize: 18,
    textAlign: 'left',
    color: whiteThemeColors.primary,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  fileImportCon: {
    right: 10,
    bottom: 30,
    position: 'absolute',
  },
  importIcon: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    justifyContent: 'center',
    backgroundColor: whiteThemeColors.primary,
  },
  icon: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
