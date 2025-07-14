import React, { memo, useEffect, useState } from 'react';
import {
  _VectorIcons,
  _Screen,
  _Text,
  _View,
  endpoint,
} from '../../../../../../components';
import { style } from './styles';
import { _getAdminList } from '../..';
import { CustomAlert, whiteThemeColors } from 'utilities';
import Headers from '../../../../../Headers';
import Screens from '../../../../../../screenNames';
import { useDispatch, useSelector } from 'react-redux';
import { DownloadDocs } from 'utilities';
import { FlatList, SafeAreaView } from 'react-native';
import { DataAccess } from '../../../../../../../data/DAL';
import ApiEndPoint from '../../../../../../../data/ApiEndpoints';
import { SetAttachmentNavigateScreen } from '../../../../../../actions/CoursePlayerAction';
import { getNotesDetial } from '../../../../../../actions/OnlineNotesActions';
import { useFindPermissions } from '../../../../../../customHooks';
import { _ActivityIndicator } from '../../../../../Loader';
import { UserPermissionsEnums } from '../../../../../values/english';
import Loader from 'screens/Loader/loader';
import { Appstate } from '../../../../../../reducers/Appstate';
import { useNavigation } from '@react-navigation/native';
import {
  ClassNotesListInterface,
  ClassNotesPropsInterface,
  GetNotesDetialInterace,
} from 'interfaces';

const _OnlineNotes: React.FC<ClassNotesPropsInterface> = ({ route }) => {
  const { Get } = DataAccess();
  const navigation: any = useNavigation();
  const { classNotesScreen } = useSelector((state: Appstate) => state.language);
  const dispatch: any = useDispatch();
  const downloadDocsRef = React.createRef();
  const [list, setList] = useState<ClassNotesListInterface[]>([]);
  const [isLoadingRecords, setIsLoadingRecords] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertTitle, setAlertTitle] = useState<string>('');
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [permission] = useFindPermissions(
    UserPermissionsEnums.ClassNotesRecordings,
  );
  const getNotesData = () => {
    var EndPoint: endpoint = ApiEndPoint.getCourseClassNote;
    EndPoint.params = `?classId=${route.params.classId}`;
    setLoadingData(true);
    Get(EndPoint)
      .then((res: ClassNotesListInterface[]) => {
        setList(res);
        setLoadingData(false);
        return;
      })
      .catch((Error) => {
        console.log({ Error });
      });
  };

  const ListEmpty = () => {
    return (
      <_View style={style.emptyListContainer}>
        <_VectorIcons
          type={'FontAwesome'}
          name={'clipboard'}
          size={100}
          color={whiteThemeColors.primary}
        />
        <_Text style={style.emptyListTxt}>{'No Notes Found'}</_Text>
      </_View>
    );
  };

  const _findColor = (day: number) => {
    const colors: string[] = [
      whiteThemeColors.calenderDayColors.day1,
      whiteThemeColors.calenderDayColors.day2,
      whiteThemeColors.calenderDayColors.day3,
      whiteThemeColors.calenderDayColors.day4,
      whiteThemeColors.calenderDayColors.day5,
      whiteThemeColors.calenderDayColors.day6,
      whiteThemeColors.calenderDayColors.day7,
    ];
    if (day >= 0 && day < colors.length) return colors[day];
    else return whiteThemeColors.calenderDayColors.default;
  };

  const _getCourseDetails = (Obj: ClassNotesListInterface) => {
    dispatch(getNotesDetial(Obj.id, route.params.classId)).then(
      (res: GetNotesDetialInterace) => {
        navigation.navigate(Screens.NoteDetials.name, {
          downloads: res?.data?.notesAttachment,
          discription: res?.data?.notesDescription,
          header: classNotesScreen?.ClassNotes,
        });
      },
    );
  };

  useEffect(() => {
    dispatch(SetAttachmentNavigateScreen(Screens.NoteDetials.name));
    getNotesData();
  }, []);

  const handleBack = () => {
    navigation.goBack();
    return true;
  };

  return (
    <_Screen
      header={
        <Headers
          isBack
          Screen={classNotesScreen.ClassNotes}
          goBack={() => navigation.goBack()}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={handleBack}
    >
      <_View style={style.container}>
        {list?.length > 0 ? (
          <SafeAreaView>
            <FlatList
              showsVerticalScrollIndicator={false}
              style={style.dataList}
              data={list}
              renderItem={({ item, index }) => (
                <_View
                  style={{
                    flex: 1,
                  }}
                >
                  <_getAdminList
                    Obj={item}
                    index={index}
                    findColor={_findColor}
                    permission={permission}
                    getCourseDetails={_getCourseDetails}
                    downloadDocsRef={downloadDocsRef}
                    setIsLoadingRecords={setIsLoadingRecords}
                    setAlertMessage={(val: string) => setAlertMessage(val)}
                    setAlertTitle={(val: string) => setAlertTitle(val)}
                    setShowAlert={setShowAlert}
                  />
                </_View>
              )}
              keyExtractor={(item: ClassNotesListInterface) =>
                item.id.toString()
              }
            />
          </SafeAreaView>
        ) : loadingData ? (
          <_ActivityIndicator size={'large'} />
        ) : (
          <ListEmpty />
        )}
        <_View style={style.download}>
          <DownloadDocs ref={downloadDocsRef}></DownloadDocs>
        </_View>
        {showAlert && (
          <CustomAlert
            visible={showAlert}
            title={alertTitle}
            msg={alertMessage}
            firstBtn={'Okay'}
            firstBtnFunc={() => setShowAlert(false)}
          />
        )}
        {isLoadingRecords && <Loader />}
      </_View>
    </_Screen>
  );
};

export const OnlineNotes = memo(_OnlineNotes);
