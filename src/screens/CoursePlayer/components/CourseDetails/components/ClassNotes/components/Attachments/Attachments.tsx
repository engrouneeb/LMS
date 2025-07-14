import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Modal,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { CustomAlert, DownloadDocs, whiteThemeColors } from 'utilities';
import { Approvels } from '../../../../../../../../../assets/Icons';
import ApiEndpoints from '../../../../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../../../../data/DAL';
import {
  _Text,
  _VectorIcons,
  _View,
  endpoint,
} from '../../../../../../../../components';
import Screens from '../../../../../../../../screenNames';

import { useNavigation } from '@react-navigation/native';
import { _ActivityIndicator } from 'screens/Loader';
import { Appstate } from '../../../../../../../../reducers/Appstate';
import { UploadAttachment } from '../../../../../ChallengeDetails/Homework/components/SubmitHomework/components';
import { RenderList } from './components/RenderList';
import { styles } from './styles';
interface props {
  isFromCourseAttachment?: boolean;
  list: any;
  title?: string;
  type?: any;
  itemType?: any;
  index?: number;
  dependentId?: any;
  moduleFolder?: any;
  isAddable?: any;
  user?: any;
  itemId?: number;
  hideNodata?: Boolean;
  userId?: number;
}
const _Attachments: React.FC<props> = ({
  isFromCourseAttachment,
  list,
  type,
  itemType,
  itemId,
  index,
  title,
  dependentId,
  isAddable,
  moduleFolder,
  hideNodata,
  userId = undefined,
}) => {
  console.log('===================================_Attachments=');
  console.log({ userId, hideNodata });
  console.log('====================================');
  const navigation: any = useNavigation();
  const [attachmentList, setAttachmentList] = useState(list);
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setloading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { classNotesScreen } = useSelector((state: Appstate) => state.language);
  const downloadDocsRef: any = useRef();
  const UserInfo: any = useSelector((state: Appstate) => state.User.UserInfo);
  const [deleteConfirmationFlag, setDeleteConfirmationFlag] = useState(false);
  const [deletionItem, setDeletionItem] = useState();
  const selectedStudent: any = useSelector(
    (state: Appstate) => state.courseAssignStudentsReducer.data,
  );
  const { PostSecuredWithParams, Get } = DataAccess();
  const openCard = (user: any) => {
    if (!Boolean(user.filePath) || !Boolean(user.downloadbleLink)) {
      if (!attachmentList?.isViewable) {
        setShowAlert(true);
        setAlertMessage("You don't have permission to view this file");
        setAlertTitle('warning');
      } else if (Boolean(user.filePath) || Boolean(user?.downloadbleLink)) {
        if (Boolean(user?.filePath)) {
          if (
            user.filePath.split('.').pop() == 'ogg' &&
            Platform.OS != 'android'
          ) {
            setShowAlert(true);
            setAlertMessage('Ogg format is not suppoted on iOS.');
            setAlertTitle('warning');
            return;
          }
        }
        navigation.navigate(Screens.OnlineNotesAttachmentView.name, {
          url: user.filePath,
          base64Url: user?.base64URL,
          isFromCourseAttachment: isFromCourseAttachment,
          downloadbleLink: user.downloadbleLink,
          uploadFrom: user.uploadFrom,
          mimE_TYPE: user.mimE_TYPE,
          fileExtension: user.fileExtension,
          fileName: user.fileName,
        });
      } else {
        setShowAlert(true);
        setAlertMessage('file path is erroneous');
        setAlertTitle('Error');
      }
    } else {
      setShowAlert(true);
      setAlertMessage('file path is erroneous');
      setAlertTitle('Error');
    }
  };

  const ListEmpty = ({ classNotesScreen }: any) => {
    return (
      <_View style={styles.emptyListContainer}>
        {!hideNodata && <Approvels />}
        <_Text
          style={[styles.emptyListTxt, { marginTop: hideNodata ? 0 : 200 }]}
        >
          {attachmentList?.isViewable || attachmentList?.isViewable == undefined
            ? classNotesScreen.NoAttachmentsFound
            : 'No Permissions to View'}
        </_Text>
      </_View>
    );
  };
  const handleVisibleModal = () => {
    setIsModalVisible(false);
  };

  const deleteAttachment = async (item: any) => {
    let endPoint = ApiEndpoints.DeleteAttachment;
    let param = `?AttachKey=${item.id}`;
    await PostSecuredWithParams(endPoint, param);

    var newList = attachmentList.attachments?.filter((Obj: any) => {
      return Obj.id !== item.id;
    });
    setAttachmentList({ ...attachmentList, attachments: newList });
  };

  const deleteConfirmation = (user: any) => {
    setDeletionItem(user);
    setDeleteConfirmationFlag(true);
    setShowAlert(true);
    setAlertMessage('Are you sure you want to delete this file?');
    setAlertTitle('warning');
  };

  const getAttachmentsDetail = () => {
    let url: endpoint = ApiEndpoints.GetAttachment;
    let _userId = userId;

    if (userId) {
      _userId = userId;
    } else if (selectedStudent == null || selectedStudent.length == 0) {
      _userId = UserInfo.userID;
    } else {
      _userId = selectedStudent.id;
    }
    setloading(true);
    // url.params =
    //   type === 'InventoryAttachment'
    //     ? `?itemId=${list.InventoryId}&itemType=${list.itemType}`
    //     : `?itemId=${list.homeWorkID}&itemType=${itemType}&dependentId=${userId}`;
    url.params =
      type === 'InventoryAttachment'
        ? `?itemId=${itemId}&itemType=${list.itemType}`
        : `?itemId=${itemId}&itemType=${itemType}&dependentId=${_userId}`;
    Get(url)
      .then((res: any) => {
        if (res) {
          res.length == 0 ? setAttachmentList([]) : setAttachmentList(res);
          return res;
        }
      })
      .catch(() => {})
      .finally(() => {
        setloading(false);
      });
  };

  useEffect(() => {
    if (type?.length > 0) getAttachmentsDetail();
    else setAttachmentList(list);
  }, [list]);

  const handleUploadedAttachment = (fileName: any, attachId: any) => {
    const obj = {
      fileName: fileName,
      filePath: attachId?.uri,
      id: attachId?.attachKey,
    };
    var file = [...attachmentList.attachments];
    file.push(obj);

    setAttachmentList({ ...attachmentList, attachments: file });
    getAttachmentsDetail();
  };

  return (
    <SafeAreaView style={styles.container}>
      <DownloadDocs ref={downloadDocsRef} />

      {title ? <_Text style={styles.title}>{title}</_Text> : null}

      {isAddable ? (
        <_View style={styles.addFileCont}>
          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(true);
            }}
            style={styles.addFileBtn}
          >
            <_VectorIcons
              type='AntDesign'
              name='addfile'
              size={21}
              color={whiteThemeColors.white}
            />
          </TouchableOpacity>
        </_View>
      ) : null}
      {loading ? (
        <_View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <_ActivityIndicator size='large' />
        </_View>
      ) : (
        <_View style={styles.scrollView}>
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={attachmentList?.attachments}
            contentContainerStyle={styles.flatListContainer}
            ListHeaderComponent={() => <_View style={{ height: 20 }} />}
            renderItem={({ item, index }) => {
              return (
                <_View style={styles.singleCard}>
                  <RenderList
                    user={item}
                    index={index}
                    openCard={openCard}
                    attachmentList={attachmentList}
                    deleteConfirmation={deleteConfirmation}
                    onPress={() => {
                      downloadDocsRef.current.downloadFile(
                        item.filePath,
                        item.fileExtension,
                        item.uploadFrom,
                        item.mimE_TYPE,
                        item.filePath,
                      );
                    }}
                  />
                </_View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <_View style={{ height: 20 }} />}
            ListEmptyComponent={() => (
              <ListEmpty classNotesScreen={classNotesScreen} />
            )}
          />
        </_View>
      )}
      {showAlert && (
        <CustomAlert
          visible={showAlert}
          title={alertTitle}
          msg={alertMessage}
          firstBtn={'Okay'}
          firstBtnFunc={() => {
            if (deleteConfirmationFlag) deleteAttachment(deletionItem);
            setShowAlert(false);
          }}
          secondBtn={'Cancel'}
          secondBtnFunc={() => {
            setShowAlert(false);
          }}
        />
      )}

      {isModalVisible ? (
        <SafeAreaView>
          <Modal
            animationType='slide'
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => {
              setIsModalVisible(false);
            }}
            supportedOrientations={['portrait', 'landscape']}
          >
            <UploadAttachment
              isVisible={isModalVisible}
              assignmentId={list.homeworkAssignmentId}
              visibleModal={handleVisibleModal}
              uploadedAttachment={handleUploadedAttachment}
              dependentId={dependentId}
              itemId={itemId}
              type={type}
              moduleFolder={moduleFolder}
              itemType={itemType}
            />
          </Modal>
        </SafeAreaView>
      ) : null}
    </SafeAreaView>
  );
};

export const Attachments = React.memo(_Attachments);
