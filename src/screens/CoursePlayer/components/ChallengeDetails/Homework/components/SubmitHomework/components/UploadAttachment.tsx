import { UploadAttachmentInterface } from 'interfaces';
import React, { useEffect, useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import DocumentPicker from '@react-native-documents/picker';
import { ScrollView } from 'react-native-gesture-handler';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import {
  CustomAlert,
  Orientation,
  isStudent,
  whiteThemeColors,
} from 'utilities';
import ApiEndpoints from '../../../../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../../../../data/DAL';
import {
  _Camera,
  _Text,
  _VectorIcons,
  _View,
  endpoint,
  requestCameraPermission,
} from '../../../../../../../../components';
import { Appstate } from '../../../../../../../../reducers/Appstate';
import CommonStyles from '../../../../../../../CommonStyles';
import Loader from '../../../../../../../Loader/loader';
import { styles } from '../styles';

const _UploadAttachment: React.FC<UploadAttachmentInterface> = ({
  attachmentFor,
  isVisible,
  itemId,
  itemType,
  moduleFolder,
  uploadedAttachment,
  visibleModal,
  dependentId,
}) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(
    'No File Selected',
  );
  const [fileName, setFileName] = useState<string | null>('');
  const [file, setFile] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const user: any = useSelector((state: Appstate) => state.User.UserInfo);
  const selectedStudent = useSelector(
    (state: Appstate) => state.courseAssignStudentsReducer.data,
  );
  const { PostSecuredFormData } = DataAccess();
  useEffect(() => {
    setSelectedFile('No File Selected');
  }, [isVisible]);

  const handleSelectFile = async () => {
    try {
      const file = await DocumentPicker.pickSingle({
        type:
          attachmentFor == 'InventoryImage'
            ? [DocumentPicker.types.images]
            : [DocumentPicker.types.allFiles],
      });
      if (file) {
        setFileName(file?.name);
        setFile(file);
        setSelectedFile(file.name);
      }
    } catch (err) {}
  };

  const handleFileUpload = async () => {
    if (fileName == '') {
      setAlertTitle('Error');
      setAlertMessage('Please select File');
      setShowAlert(true);
    } else {
      // dispatch(loading(true));
      setLoading(true);
      let endPoint: endpoint = ApiEndpoints.SaveAttachment;
      let stdId;
      if (dependentId) {
        stdId = dependentId;
      } else if (isStudent(user.roleName)) {
        stdId = dependentId;
      } else {
        stdId = selectedStudent == null ? 0 : selectedStudent?.id;
      }
      // }
      const data = new FormData();
      data.append('File', file);
      data.append('Name', fileName);
      data.append('ItemId', itemId);
      data.append('DependentId', stdId);
      data.append('ItemType', itemType);
      data.append('ModuleFolder', moduleFolder);

      PostSecuredFormData(endPoint, data)
        .then((res: any) => {
          if (!res) {
            setAlertTitle('Error');
            setAlertMessage(res.error_description);
            setShowAlert(true);
            // dispatch(loading(false));
            setLoading(false);
          } else {
            visibleModal();
            uploadedAttachment(fileName, res);
            // dispatch(loading(false));
            setLoading(false);
          }
        })
        .catch((err) => console.log('err===>', err));
    }
  };

  const checkCameraPermission = async () => {
    const requestPermission = await requestCameraPermission();
    if (requestPermission) return true;
    return false;
  };
  const handleLaunchCamera = async () => {
    const isCameraPermission = await checkCameraPermission();
    if (isCameraPermission) {
      const response = await _Camera();
      if (response?.assets) {
        console.log(response?.assets[0]);
        let fileData = response?.assets[0];

        let extnsn = fileData?.uri?.split('.').pop();
        let fileName: any = fileData?.fileName;

        const camera_file = {
          uri: fileData.uri,
          name: fileData.fileName,
          exten: extnsn,
          type: fileData.type,
        };

        setFileName(fileName);
        setFile(camera_file);
        setSelectedFile(fileName);
      }
    }
  };

  const handleLaunchImageLibrary = () => {
    let options: any = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
      } else if (response.error) {
        setAlertTitle('Error');
        setAlertMessage(response.error);
        setShowAlert(true);
      } else {
        let fileData = response.assets[0];
        let extnsn = fileData.uri.split('.').pop();
        let fileName = fileData.fileName;

        const camera_file = {
          uri: fileData.uri,
          name: fileName,
          exten: extnsn,
          type: fileData.type,
        };
        setFileName(fileName);
        setFile(camera_file);
        setSelectedFile(fileName);
      }
    });
  };

  return (
    <_View style={styles.container}>
      {/* <LoadingSc /> */}
      {loading && <Loader />}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollView}>
        <Orientation getOrientation={() => {}}>
          <_View style={[styles.modalPage]}>
            <_View style={styles.modalHeader}>
              <_Text style={[styles.headerText]}>Upload Attachment</_Text>

              <TouchableOpacity
                onPress={() => {
                  visibleModal();
                }}
                activeOpacity={0.9}
                style={{
                  backgroundColor: whiteThemeColors.primary + 30,
                  borderRadius: 5,
                  position: 'absolute',
                  right: 15,
                }}
              >
                <_VectorIcons
                  name={'close'}
                  type={'AntDesign'}
                  color={whiteThemeColors.black}
                  size={21}
                />
              </TouchableOpacity>
            </_View>
            <_Text
              style={{
                paddingLeft: 20,
                fontFamily: CommonStyles.fonts.light,
                color: 'gray',
                fontSize: 11,
              }}
            >
              We support a wide range of file types, including images, videos,
              documents, PDFs, and more.
            </_Text>
            <_View
              style={{
                marginTop: 40,
              }}
            >
              <TouchableOpacity
                onPress={handleSelectFile}
                style={styles.addFile}
              >
                <_VectorIcons
                  color={whiteThemeColors.primary}
                  type='AntDesign'
                  name='addfile'
                  size={18}
                />
                <_Text
                  style={{
                    marginLeft: 10,
                    paddingLeft: 0,
                    color: whiteThemeColors.primary,
                    fontFamily: CommonStyles.fonts.semiBold,
                  }}
                >
                  Choose File
                </_Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleLaunchCamera}
                style={styles.cameraBtn}
              >
                <_VectorIcons
                  type='FontAwesome'
                  color={whiteThemeColors.primary}
                  name='camera'
                  size={18}
                />
                <_Text style={styles.cameraText}>Camera</_Text>
              </TouchableOpacity>
              {Platform.OS == 'ios' && (
                <TouchableOpacity
                  onPress={handleLaunchImageLibrary}
                  style={styles.photoBtn}
                >
                  <_VectorIcons
                    size={18}
                    type='MaterialIcons'
                    name='library-add'
                    color={whiteThemeColors.primary}
                  />
                  <_Text style={styles.photoTxt}>Photos</_Text>
                </TouchableOpacity>
              )}
            </_View>
            <_View style={styles.selectedFileContainer}>
              <_Text
                style={{
                  alignSelf: 'center',
                  fontFamily: CommonStyles.fonts.medium,
                }}
              >
                {selectedFile}
              </_Text>
            </_View>
            <_View style={styles.uploadBtn}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  handleFileUpload();
                }}
                style={styles.CancleTimeViewButton}
              >
                <_Text
                  style={[
                    CommonStyles.className,
                    {
                      fontSize: 14,
                      color: 'white',
                      fontFamily: CommonStyles.fonts.semiBold,
                    },
                  ]}
                >
                  Upload
                </_Text>
              </TouchableOpacity>
            </_View>
          </_View>
        </Orientation>
      </ScrollView>
      {showAlert && (
        <CustomAlert
          visible={showAlert}
          title={alertTitle}
          msg={alertMessage}
          firstBtn={'Okay'}
          firstBtnFunc={() => {
            if (alertTitle == 'Success') {
              setShowAlert(false);
              // goBack();
            }

            console.log('vha,je');
            setShowAlert(false);
          }}
        />
      )}
    </_View>
  );
};

export const UploadAttachment = React.memo(_UploadAttachment);
