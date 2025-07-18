import React from 'react';
import {
  _Text,
  _View,
  _VectorIcons,
} from '../../../../../../../../../components';
import { styles } from '../styles';
import { Pressable } from 'react-native';
import { whiteThemeColors } from '../../../../../../../../../Utilities';
import { RenderListCourseInterface } from '../../../../../../../../../interfaces';
interface props {
  onPress: (usr: any) => void;
  openCard: (usrobj: any) => void;
  deleteConfirmation: (delUser: any) => void;
}
type prop = props & RenderListCourseInterface;
export const RenderList: React.FC<prop> = ({
  user,
  index,
  openCard,
  onPress,
  attachmentList,
  deleteConfirmation,
}) => {
  const ext = user?.filePath
    ? user?.filePath?.split('.')?.pop().toLowerCase()
    : '';

  return (
    <Pressable
      onPress={() => {
        openCard(user);
      }}
      style={styles.itemContainer}
    >
      {attachmentList?.isDeletable && (
        <Pressable
          onPress={() => deleteConfirmation(user)}
          style={styles.deleteContainer}
        >
          <_VectorIcons
            name='close'
            type='AntDesign'
            color={whiteThemeColors.red + 'c0'}
            size={13}
          />
        </Pressable>
      )}
      <_View style={styles.fileIconContainer}>
        <_View style={styles.filetxtContainer}>
          <_Text style={styles.filelabelTxt}>{ext ? ext : 'file'}</_Text>
        </_View>
        <_VectorIcons
          name={'insert-drive-file'}
          type={'MaterialIcons'}
          size={40}
          color={whiteThemeColors.primary}
          style={{
            zIndex: 5,
          }}
        />
      </_View>

      <_View style={{ width: 120 }}>
        <_Text numberOfLines={2} style={styles.fileNameText}>
          {user?.fileName}
        </_Text>
      </_View>

      {user.filePath !== ('' || null || undefined) &&
        attachmentList?.isDownloadable && (
          <Pressable onPress={onPress} style={styles.downloadContainer}>
            <_VectorIcons
              type='Feather'
              name='download'
              color={whiteThemeColors.primary + 'a0'}
              size={13}
            />
          </Pressable>
        )}
    </Pressable>
  );
};
