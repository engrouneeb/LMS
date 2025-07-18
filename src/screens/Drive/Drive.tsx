import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Modal, Platform, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import {
  AttachmentTypes,
  CustomAlert,
  DownloadDocs,
  isAdmin,
  isInstructor,
  isParent,
  isStudent,
  whiteThemeColors,
} from '../../Utilities';
import { Item } from '../../interfaces';
import { DriveTabs, RenderEmptyList, RenderItem } from './';
import ApiEndpoints from '../../../data/ApiEndpoints';
import { DataAccess } from '../../../data/DAL';
import { _Screen, _VectorIcons, _View } from '../../components';
import ScreensNames from '../../screenNames';
import { UploadAttachment } from '../CoursePlayer/components/ChallengeDetails/Homework/components/SubmitHomework/components';
import CstHeader from '../Headers';
import { styles } from './styles';
import { _ActivityIndicator } from '../Loader';
import { DriveTabTypeEnum } from '../values/english';
import { useRoute } from '@react-navigation/native';
const Drive = (props: any) => {
  let { roleName, userID } = useSelector((state: any) => state.User.UserInfo);
  const { navigation } = isStudent(roleName) ? props.props : props;
  const route: any = useRoute();
  const { header, goBackScreen } = route.params;
  const [activeTab, setActiveTab] = useState({
    id: 0,
    name: 'Student',
  });
  const downloadDocsRef: any = useRef();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<any>('');
  const [attachments, setAttachments] = useState<any>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
  const { Get, PostSecuredWithParams } = DataAccess();
  useEffect(() => {
    getAttachmentsDetial(DriveTabTypeEnum);
  }, []);

  const backPress = () => {
    if (isStudent(roleName) && goBackScreen) {
      navigation.navigate(goBackScreen);
      return true;
    }
    else {
      navigation.goBack();
      return true;
    }
  };

  const openFile = (item: Item) => {
    if (
      (item.filePath !== undefined && item.filePath !== null) ||
      (item.downloadbleLink !== undefined && item.downloadbleLink !== null)
    ) {
      if (item.filePath) {
        const fileExtension = item.filePath.split('.').pop();
        if (fileExtension === 'ogg' && Platform.OS !== 'android') {
          setShowAlert(true);
          setAlertMsg('Ogg format is not supported on iOS.');
          return;
        }
      }
      navigation.navigate(ScreensNames.OnlineNotesAttachmentView.name, {
        url: item.filePath,
        base64Url: item.base64URL,
        isFromCourseAttachment: false,
        downloadbleLink: item.downloadbleLink,
        uploadFrom: item.uploadFrom,
        mimE_TYPE: item.mimE_TYPE,
        fileExtension: item.fileExtension,
      });
    }
  };

  const getAttachmentsDetial = (DriveTabTypeEnum: any) => {
    setIsLoading(true);
    let url: any = ApiEndpoints.GetAttachment;
    let dependentId =
      isInstructor(roleName) ||
        isStudent(roleName) ||
        isParent(roleName)
        ? userID
        : 0;

    url.params = `?itemId=${props?.route?.params.studentId || props.stdId
      }&itemType=${AttachmentTypes.StudentDriveAttachments.value
      }&dependentId=${dependentId}&isFromDrive=${true}&driveTabType=${DriveTabTypeEnum[activeTab?.name]
      }`;
    Get(url)
      .then((res: any) => {
        setIsLoading(false);
        if (res?.attachments) {
          setAttachments(res);
        }
      })
      .catch((err: any) => {
        console.log('err', err);
      });
  };

  const onDeletion = (item: Item) => {
    setDeleteItemId(item.id);
    setShowAlert(true);
    setAlertMsg(
      `Are you sure you want to delete ${item?.fileName || 'this file'}?`,
    );
  };

  const onDownload = (item: Item) => {
    downloadDocsRef.current.downloadFile(
      item.filePath,
      item.downloadbleLink,
      item.uploadFrom,
      item.mimE_TYPE,
      item.fileExtension,
    );
  };

  const handleUploadedAttachment = (fileName: string, attachId: number) => {
    const obj = {
      fileName: fileName,
      filePath: '',
      id: attachId,
    };
    var file = [...attachments.attachments];
    file.push(obj);
    setAttachments({ ...attachments, attachments: file });
    getAttachmentsDetial(DriveTabTypeEnum);
  };

  const deleteAttachment = async (id: number) => {
    let endPoint = ApiEndpoints.DeleteAttachment;
    let param = `?AttachKey=${id}`;
    await PostSecuredWithParams(endPoint, param);

    var newList = attachments.attachments?.filter((Obj: any) => {
      return Obj.id !== id;
    });
    setAttachments({ ...attachments, attachments: newList });
  };

  const handleVisibleModal = () => {
    setIsModalVisible(false);
  };

  const checkIsDeleteable = () => {
    if (isInstructor(roleName)) return true;
    else if ((isStudent(roleName) || isParent(roleName)))
      return true;
    else if (isAdmin(roleName)) return true;
    else return false;
  };

  return (
    <_Screen
      header={
        <CstHeader
          isBack={!isStudent(roleName)}
          isMenu={isStudent(roleName)}
          OpenMenu={() => {
            navigation.toggleDrawer();
          }}
          goBack={() => navigation.goBack()}
          Screen={header}
        />
      }
      flex={1}
      hideTopSafeArea
      hideBottomSafeArea
      backgroundColor={whiteThemeColors.background}
      onAndroidBack={backPress}
    >
      <_View
        style={{
          position: 'absolute',
          bottom: 40,
          right: 80, // Shift it to the left of the upload button
          zIndex: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => setIsGridView(prev => !prev)}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: whiteThemeColors.primary,
            height: 55,
            width: 55,
            borderRadius: 20,
          }}
        >
          <_VectorIcons
           name={isGridView ? 'list' : 'grid-view'}
          type='MaterialIcons'
            size={20}
            color={whiteThemeColors.white}
          />
        </TouchableOpacity>
      </_View>
      <_View style={styles.container}>
        {/* <DriveTabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          radius={20}
        /> */}
        <DownloadDocs ref={downloadDocsRef} />
        <_View style={styles.subContainer}>
          {isLoading ? (
            <_ActivityIndicator
              size={'large'}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          ) : (
            <FlatList
            key={isGridView ? 'grid' : 'list'}
              data={attachments.attachments}
              numColumns={isGridView ? 2 : 1}
              style={{ marginTop: 10 }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <RenderItem
                  item={item}
                  openFile={openFile}
                  checkIsDeleteable={checkIsDeleteable}
                  onDeletion={onDeletion}
                  onDownload={onDownload}
                  isGridView={isGridView}
                />
              )}
              ListEmptyComponent={() => <RenderEmptyList />}
            />
          )}
        </_View>

        {isInstructor(roleName) ||
          isParent(roleName) ||
          isParent(roleName) ||
          isStudent(roleName) ? (
          <_View
            style={{
              height: 55,
              width: 55,
              position: 'absolute',
              bottom: 40,
              right: 10,
              zIndex: 10,
              justifyContent: 'center',
              alignSelf: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(true);
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: whiteThemeColors.primary,
                height: '100%',
                width: '100%',
                borderRadius: 20,
              }}
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
      </_View>

      <Modal
        animationType='fade'
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
        supportedOrientations={['portrait', 'landscape']}
      >
        <UploadAttachment
          isVisible={isModalVisible}
          assignmentId={props?.route?.params.studentId || props.stdId}
          visibleModal={handleVisibleModal}
          uploadedAttachment={handleUploadedAttachment}
          dependentId={isInstructor(roleName) ? userID : 0}
          itemId={props?.route?.params.studentId || props.stdId}
          // moduleFolder={AttachmentTypes.StudentDriveAttachments.folderName}
          itemType={AttachmentTypes.StudentDriveAttachments.value}
        />
      </Modal>
      {showAlert && (
        <CustomAlert
          visible={showAlert}
          title={'Warning'}
          msg={alertMsg}
          firstBtn={'Okay'}
          firstBtnFunc={() => {
            deleteAttachment(deleteItemId);
            setShowAlert(false);
          }}
          secondBtn={'Cancel'}
          secondBtnFunc={() => {
            setDeleteItemId('');
            setShowAlert(false);
          }}
        />
      )}
    </_Screen>
  );
};
export { Drive };
