import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CustomAlert, isTablet, whiteThemeColors } from '../../../Utilities';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import { alertHide } from '../../../actions/CustomAlert';
import {
  _Screen,
  _Text,
  _VectorIcons,
  _View,
  endpoint,
} from '../../../components';
import { ClassNotStartedModal } from '../../../components/ClassNotStartedModal';
import { useMeetingLogoutHook } from '../../../customHooks';
import { Appstate } from '../../../reducers/Appstate';
import Header from '../../Headers';
import Loader from '../../Loader/loader';
import Search from '../../Search';
import style from '../style';

const img1 = '../../../../assets/courseDefault.jpg';

function StudentOnlineClassesList(props: any) {
  const { JoinClass } = useMeetingLogoutHook();
  const { show, message } = useSelector((state: Appstate) => state.CustomAlert);
  const user: any = useSelector((state: Appstate) => state.User.UserInfo);
  const [classes, setClasses] = useState([]);
  const [filterdClasses, setFilterdClasses] = useState([]);
  const [showAlert, setShowAlert] = useState(show);
  const [alertMessage, setAlertMessage] = useState(message);
  const [classStartedModal, setClassStartedModal] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(0);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const [isVisible, setisVisible] = useState(false);
  const { Get } = DataAccess();
  let searchRef: any = useRef();
  useEffect(() => {
    let url: endpoint = ApiEndpoints.GetStudentCourseClasses;
    url.params = `?StudentId=${user.userID}`;
    setLoader(true);
    Get(url)
      .then((res: any) => {
        if (!res.error) {
          setClasses(res);
          setFilterdClasses(res);
        }
      })
      .catch((err: any) => {
        return err;
      })
      .finally(() => setLoader(false));
  }, [user.userID]);
  useEffect(() => {
    setShowAlert(show);
    setAlertMessage(message);
  }, [show, message]);

  const onChangeText = (data: any) => {
    let array = [];
    data.forEach((element: any) => {
      array.push(element);
    });
    setFilterdClasses(data);
  };
  const handleBack = () => {
    navigation.goBack();
    return true; //disable back button
  };
  const handleJoinClass = (classId: any, isOnPress?: any) => {
    isOnPress && setSelectedClassId(classId);
    JoinClass(classId, setClassStartedModal, classStartedModal);
  };

  const renderItem = (item: any, index: number) => {
    return (
      <_View key={index + '--'}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={style.onlineClassCard}
          onPress={() => handleJoinClass(item.classId, true)}
        >
          <_View style={style.imgContainer}>
            <Image
              source={require(img1)}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
                borderRadius: 5,
              }}
            />
          </_View>

          <_View style={style.textContainer}>
            <_Text
              numberOfLines={2}
              style={{
                fontSize: isTablet ? 16 : 13,
                textTransform: 'capitalize',
                color: whiteThemeColors.Black,
              }}
            >
              {item.className}
            </_Text>
          </_View>
        </TouchableOpacity>
        <_VectorIcons
          type='Feather'
          name='arrow-right'
          size={18}
          color={whiteThemeColors.primary}
          style={{ position: 'absolute', bottom: 10, right: 20 }}
        />
      </_View>
    );
  };

  const renderEmpty = () => {
    return (
      <_View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 50,
        }}
      >
        <_VectorIcons
          type={'MaterialCommunityIcons'}
          name={'google-classroom'}
          size={100}
          color={whiteThemeColors.greyDark}
        />
        <_Text style={{ fontSize: 13, color: whiteThemeColors.greyDark }}>
          No Classes Found
        </_Text>
      </_View>
    );
  };

  return (
    <_Screen
      header={
        <Header
          isBack={true}
          isSearchBtn={true}
          OpenSearch={() => {
            setisVisible(true);
          }}
          Screen={'Online Classes'}
          GoBack={() => {
            navigation.goBack();
          }}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={handleBack}
      backgroundColor={whiteThemeColors.background}
    >
      {isVisible && (
        <Search
          onInputChange={onChangeText}
          onClose={() => {
            setisVisible(false);
          } }
          animSpeed={100}
          data={classes}
          searchKey='className'
          isVisible={isVisible}
          outPos={-110}
          inPos={-10}
          height={60} showCross={true}        />
      )}
      <_View>
        <_View
          style={{
            height: '100%',
          }}
        >
          {loader ? (
            <Loader />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={(item: any) => item?.classId.toString()}
              data={filterdClasses}
              ItemSeparatorComponent={() => <_View style={{ height: 10 }} />}
              ListFooterComponent={() => <_View style={{ height: 100 }} />}
              renderItem={({ item, index }) => renderItem(item, index)}
              ListEmptyComponent={() => renderEmpty()}
            />
          )}
        </_View>
      </_View>

      {classStartedModal && (
        <ClassNotStartedModal
          visible={classStartedModal}
          setVisible={setClassStartedModal}
          handleOnlineClass={() => {
            handleJoinClass(selectedClassId);
          }}
          selectedClassId={selectedClassId}
        />
      )}
      {showAlert && (
        <CustomAlert
          visible={showAlert}
          title={'Error'}
          msg={alertMessage}
          firstBtn={'Okay'}
          firstBtnFunc={() => {
            setShowAlert(false);
            dispatch(alertHide());
          }}
        />
      )}
    </_Screen>
  );
}

export default React.memo(StudentOnlineClassesList);
