import { _Text, _VectorIcons, _View } from 'components';
import React from 'react';
import { Pressable } from 'react-native';
import {
  convertUTCDateToLocalDateStringFormat,
  covertUTCDateTimeToLocalTimeStringFormat,
  whiteThemeColors,
} from 'utilities';
import { styles } from '../styles';
import { RenderItemProps } from '../../../interfaces';
interface Props extends RenderItemProps {
  isGridView: boolean;
}


export const RenderItem: React.FC<Props> = ({
  item,
  openFile,
  checkIsDeleteable,
  onDeletion,
  onDownload,
  isGridView
}) => {
  return (
    <Pressable onPress={() => openFile(item)} style={[styles.itemContainer, {
      width: isGridView ? '48%' : '100%', height: isGridView ? 130 : 100, alignSelf: isGridView ? 'auto' : 'center',
    }]}>
      {checkIsDeleteable() && (
        <Pressable
          onPress={() => onDeletion(item)}
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
      <_View flexDirection={"row"} width={"100%"}>
        <_View flexDirection={'column'} width={isGridView ? "49%" : "20%"}>
          <_View style={[styles.filetxtContainer,!isGridView&&{top:15, bottom:5,left: 20}]}>
            <_Text style={{...styles.filelabelTxt}}>
              {item?.fileExtension?.slice(1) || 'pdf'}
            </_Text>
          </_View>
          <_View alignSelf='flex-start' paddingLeft={20} >
            <_VectorIcons
              name={'insert-drive-file'}
              type={'MaterialIcons'}
              size={60}
              color={whiteThemeColors.white}
              style={{
                zIndex: 5,
                alignSelf: isGridView ? "center" : "flex-start"
              }}
            />

            {isGridView && <_View style={{ width: 150, marginTop: 5, alignSelf: "flex-start" }}>
              <_Text numberOfLines={2} style={[styles.fileNameText, { textAlign: isGridView ? "center" : "flex-start" }]}>
                {item.fileName || 'abc.pdf'}
              </_Text>
            </_View>}
          </_View>
        </_View>
        {!isGridView && <_View style={{ flexDirection: 'column', width: '60%', marginTop: 5 }}>
          <_View flexDirection='row' paddingBottom={5}>
            <_Text numberOfLines={1} style={styles.keyText}>
              {'File Name:'}
            </_Text>
            <_Text numberOfLines={1} style={{ ...styles.valueText, fontSize: 12, }}>
              {`    ${item.fileName || 'abc.pdf'}`}
            </_Text>
            </_View>
          <_View flexDirection='row'>
            <_Text numberOfLines={1} style={styles.keyText}>
              {'Uploaded By:'}
            </_Text>
            <_Text numberOfLines={1} style={{ ...styles.valueText, fontSize: 12, }} marginLeft={5}>
              {item.createdByName}
            </_Text>
          </_View>
          <_Text
            numberOfLines={1}
            style={[styles.keyText, { width: '80%', fontSize: 12, }]}
            width={'90%'}
          >
            <_Text numberOfLines={1} style={styles.keyText}>
              {'Uploaded At:'}
            </_Text>
            {`  ${convertUTCDateToLocalDateStringFormat(item?.createdAt)}`}
          </_Text>
        </_View>
        }
      </_View>


      {isGridView && <>
        <_View style={{ flexDirection: 'row', width: '80%', marginTop: 5 }}>
          <_Text numberOfLines={1} style={styles.keyText}>
            {'Uploaded By:'}
          </_Text>
          <_Text numberOfLines={1} style={styles.valueText} marginLeft={5}>
            {item.createdByName}
          </_Text>
        </_View>
        <_Text
          numberOfLines={1}
          style={[styles.keyText, { width: '80%' }]}
          width={'90%'}
        >
          {`Uploaded At:   ${convertUTCDateToLocalDateStringFormat(item?.createdAt)}`}
        </_Text>
      </>}

      <Pressable
        onPress={() => onDownload(item)}
        style={styles.downloadContainer}
      >

        <_VectorIcons
          type='FontAwesome'
          name='download'
          color={whiteThemeColors.primary + 'a0'}
          size={13}
        />
      </Pressable>
    </Pressable>
  );
};
