import {useNavigation} from '@react-navigation/native';
import {AdminListInterface} from '../../../../../../../interfaces';
import React from 'react';
import {Alert, TouchableHighlight} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {whiteThemeColors} from '../../../../../../../Utilities';
import ApiEndpoints from '../../../../../../../../data/ApiEndpoints';
import {DataAccess} from '../../../../../../../../data/DAL';
import {
  _Text,
  _VectorIcons,
  _View,
  endpoint,
} from '../../../../../../../components';
import {UserImg} from '../../../../../../ThumbNail';
import {style} from '../styles';
var clrCode = -1;
export const _getAdminList: React.FC<AdminListInterface> = ({
  getCourseDetails,
  permission,
  findColor,
  index,
  Obj,
  downloadDocsRef,
  setIsLoadingRecords,
  setAlertMessage,
  setAlertTitle,
  setShowAlert,
}) => {
  clrCode++;
  const navigation: any = useNavigation();
  if (clrCode == 7) clrCode = 0;
  const getZoomCloudRecording = (meetingId: number | string | null) => {
    const {Get} = DataAccess();
    setIsLoadingRecords(true);
    var EndPoint: endpoint = ApiEndpoints.GetZoomCloudRecording;
    EndPoint.params = `?MeetingId=${meetingId}`;
    Get(EndPoint)
      .then((res: any) => {
        setIsLoadingRecords(false);
        if (!res?.flag) {
          setAlertTitle('Error');
          setAlertMessage(res?.message);
          setShowAlert(true);
          return;
        } else {
          const {share_url} = res?.data;
          openZoomRecordings(share_url);
        }
      })
      .catch((err: any) => {});
  };

  const openZoomRecordings = async (playBackUrl: string) => {
    if (await InAppBrowser.isAvailable()) {
      InAppBrowser.open(playBackUrl, {
        dismissButtonStyle: 'done',
        preferredBarTintColor: whiteThemeColors.primary,
        preferredControlTintColor: 'white',
        animated: true,
        modalPresentationStyle: 'overCurrentContext',
        forceCloseOnRedirection: true,
        showInRecents: true,
        toolbarColor: whiteThemeColors.primary,
        navigationBarColor: whiteThemeColors.primary,
        navigationBarDividerColor: whiteThemeColors.primary,
        enableUrlBarHiding: true,
        enableDefaultShare: true,
      });
    }
  };
  return (
    <_View style={style.listItem}>
      <TouchableHighlight
        underlayColor={whiteThemeColors.primary + '50'}
        key={index}
        onPress={() => getCourseDetails(Obj)}
        style={[style.touchableCard]}>
        <_View
          style={[
            style.cardConatiner,
            {
              backgroundColor:
                index % 2 == 0
                  ? whiteThemeColors.primary + '10'
                  : whiteThemeColors.white + 90,
            },
          ]}>
          {permission?.view && (
            <TouchableHighlight
              style={style.microphoneBtn}
              underlayColor={whiteThemeColors.primary + '50'}
              onPress={() => {
                const {isZoomRecording, meetingId, playBackUrl}: any = Obj;
                console.log({isZoomRecording, meetingId});

                if (isZoomRecording) {
                  getZoomCloudRecording(meetingId);
                } else if (Obj?.playBackUrl == null) {
                  Alert.alert(
                    'Error',
                    'Unable to process your request Please contact your admin',
                    [
                      {text: 'Cancel', style: 'destructive'},
                      {text: 'Okay', style: 'cancel'},
                    ],
                  );
                } else if (playBackUrl != null) openZoomRecordings(playBackUrl);
                // navigation.navigate(Screens.notesRecording.name, {
                //   header: Obj?.title,
                //   url: Obj?.playBackUrl,
                // });
              }}>
              <_VectorIcons
                type="Ionicons"
                name="videocam-outline"
                size={15}
                color={whiteThemeColors.primary}
              />
            </TouchableHighlight>
          )}
          {Obj?.playBackUrl && permission?.edit && (
            <TouchableHighlight
              style={[style.microphoneBtn, {top: 65}]}
              underlayColor={whiteThemeColors.primary + '50'}
              onPress={() => {
                downloadDocsRef?.current?.downloadFile(
                  Obj?.playBackUrl,
                  '',
                  1,
                  '',
                  '',
                );
              }}>
              <_VectorIcons
                type="AntDesign"
                name="download"
                size={15}
                color={whiteThemeColors.primary}
              />
            </TouchableHighlight>
          )}
          <_View style={style.creatorDetailContainer}>
            {Obj?.imageUrl !== '' && (
              <UserImg
                UserInfo={{
                  FirstName: Obj?.createdByName,
                  LastName: Obj?.createdByName,
                  UserImage: Obj?.imageUrl,
                  UserImageColor: findColor(clrCode),
                }}
                size={30}
              />
            )}
            <_Text numberOfLines={1} style={style.userName}>
              {Obj?.createdByName}
            </_Text>
          </_View>
          <_View style={{flexDirection: 'row', flex: 1}}>
            <_Text numberOfLines={2} style={style.titleTxt}>
              {Obj?.title}
            </_Text>
          </_View>
          <_View style={{flex: 1}}>
            <_View style={style.dateTimeContainer}>
              <_VectorIcons
                name={'calendar'}
                type={'AntDesign'}
                size={12}
                color={whiteThemeColors.primary}
              />
              <_Text style={style.textSizeWeight}>{Obj.date}</_Text>
              <_VectorIcons
                name={'time-slot'}
                type={'Entypo'}
                size={12}
                color={whiteThemeColors.primary}
                style={{
                  marginLeft: 30,
                  marginTop: -2,
                }}
              />

              <_Text style={style.textSizeWeight}>{Obj?.time}</_Text>
            </_View>
          </_View>
        </_View>
      </TouchableHighlight>
    </_View>
  );
};
