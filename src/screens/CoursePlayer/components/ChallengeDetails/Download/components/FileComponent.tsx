import React from 'react';
import { styles } from '../styles';
import { useSelector } from 'react-redux';
import CommonStyles from '../../../../../CommonStyles';
import { isStudent, whiteThemeColors } from '../../../../../../Utilities';
import { _Button, _Text, _View } from '../../../../../../components';
import { FileComponentInterface } from '../../../../../../interfaces';
import { Appstate } from '../../../../../../reducers/Appstate';

export const FileComponent: React.FC<FileComponentInterface> = ({
  name,
  callback,
  isSecured,
  isCompleted,
  commonWords,
  callbackPrevious,
  classNotesScreen,
  downloadFileCallback,
}) => {
  const { roleName }: any = useSelector(
    (state: Appstate) => state.User.UserInfo
  );
  return (
    <_View>
      <_Text style={styles.title}>{classNotesScreen.fileName}</_Text>
      <_Text style={styles.name}>{name}</_Text>
      <_View style={styles.buttonContainer}>
        <_Button
          borderRadius={10}
          submitting={true}
          width={'45%'}
          BtnTxt={[
            CommonStyles.className,
            {
              color: whiteThemeColors.white,
              fontFamily: CommonStyles.fonts.semiBold,
            },
          ]}
          style={styles.buttonViewFile}
          btnText={classNotesScreen.viewFile}
          callback={callback}
        />
        <_Button
          borderRadius={10}
          submitting={true}
          width={'45%'}
          BtnTxt={[
            CommonStyles.className,
            {
              color: whiteThemeColors.white,
              fontFamily: CommonStyles.fonts.semiBold,
            },
          ]}
          style={{
            ...styles.buttonDownload,
            display: isSecured ? 'none' : 'flex',
          }}
          btnText={classNotesScreen.download}
          callback={downloadFileCallback}
        />
      </_View>

      <_View style={styles.btnContainer}>
        {isStudent(roleName) ? (
          <_Button
            borderRadius={5}
            submitting={true}
            width={'45%'}
            BtnTxt={{
              textAlign: 'center',
              color: whiteThemeColors.white,
              fontFamily: CommonStyles.fonts.semiBold,
            }}
            style={styles.markAsCompleteBtn}
            btnText={
              isCompleted === true
                ? commonWords.markAsIncomplete
                : commonWords.markAsComplete
            }
            callback={callbackPrevious}
          />
        ) : null}
      </_View>
    </_View>
  );
};
