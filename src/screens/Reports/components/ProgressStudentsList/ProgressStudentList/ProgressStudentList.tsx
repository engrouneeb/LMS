import React, { useEffect, useRef, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { whiteThemeColors, width } from 'utilities';
import ApiEndpoints from '../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../data/DAL';
import {
  _Screen,
  _Text,
  _VectorIcons,
  _View,
  progressStudentListInterface,
} from '../../../../../components';
import DrawerScreens from '../../../../../navigation/Drawer/DrawerScreenNames';
import ScreensNames from '../../../../../screenNames';
import Header from '../../../../Headers';
import Loader from '../../../../Loader/loader';
import Search from '../../../../Search';
import { styles } from './style';
const index: React.FC<progressStudentListInterface> = ({
  route,
  navigation,
}) => {
  const { Get } = DataAccess();
  const [stdList, setStdList] = useState([]);
  const [filterdStdList, setFilterdStdList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [prop, setprop] = useState<any>();
  let searchRef = useRef();
  const [isVisible, setisVisible] = useState(false);
  useEffect(() => {
    GetStudent();
  }, []);
  useEffect(() => setprop(route?.params), [route]);

  const GetStudent = () => {
    setLoading(true);
    var EndPoint = ApiEndpoints.GetStudentsAgainstCourses;
    Get(EndPoint).then((res: any) => {
      setLoading(false);
      if (!res.error) {
        setStdList(res);
        setFilterdStdList(res);
      } else {
        console.log('Something went wrong');
      }
    });
  };

  const handleCardOnPress = (item: any) => {
    const { isFromStudentProgress } = prop;
    if (isFromStudentProgress) {
      navigation.navigate(ScreensNames.StudentProgress.name, {
        goBackScreen: ScreensNames.StudentProgressList.name,
        studentId: item.studentId,
        studentName: item.studentName,
        courseId: item.courseId,
        isFromStd: false,
        header: route?.params?.header,
        parentgoBackScreen: prop?.goBackScreen,
      });
    } else {
      navigation.navigate(DrawerScreens.HomeworkAssignment.name, {
        goBackScreen: ScreensNames.StudentProgressList.name,
        studentId: item.studentId,
        studentName: item.studentName,
        header: route?.params?.header,
        parentgoBackScreen: prop?.goBackScreen,
      });
    }
  };

  const renderItem = ({ item }: any) => {
    const { studentName } = item;
    return (
      <TouchableOpacity
        key={item.studentId + '--'}
        activeOpacity={0.8}
        onPress={() => handleCardOnPress(item)}
        style={styles.mainView}
      >
        <_View style={styles.touchView}>
          <_View style={styles.renderItemSubContainer}>
            <_View style={styles.leftView}>
              {/* <UserImg
                UserInfo={{
                  FirstName: studentName,
                  LastName: studentName.split(' ')[1],
                  UserImage: '',
                  UserImageColor: whiteThemeColors.primary,
                }}
                size={60}
              /> */}
              <_VectorIcons
                type='AntDesign'
                name='user'
                color={whiteThemeColors.primary}
                size={40}
              />
              {/* <_Text
                style={{
                  fontFamily: CommonStyles.fonts.bold,
                  textTransform: 'uppercase',
                  color: whiteThemeColors.primary,
                }}
              >
                {studentName?.split('')[0] + studentName?.split(' ')[1][0]}
              </_Text> */}
            </_View>

            <_View style={styles.midView}>
              <_Text numberOfLines={1} style={styles.mainText}>
                {studentName}
              </_Text>
            </_View>
            <_View style={styles.reportView}>
              <_VectorIcons
                type='AntDesign'
                name='right'
                color={whiteThemeColors.white}
                size={15}
              />
            </_View>
          </_View>
        </_View>
      </TouchableOpacity>
    );
  };

  const NoData = () => (
    <_View style={styles.noDataContainer}>
      <_VectorIcons
        type={'SimpleLineIcons'}
        name={'notebook'}
        size={80}
        color={whiteThemeColors.primary + 70}
      />
      <_Text style={styles.noDataTxt}>{`No items Found`}</_Text>
    </_View>
  );

  const onChangeText = (data: any) => setFilterdStdList(data);

  const onBackPress = () => {
    navigation.navigate(prop?.goBackScreen);
    return true;
  };

  const OpenCloseSearch = () => setisVisible(true);

  return (
    <_Screen
      header={
        <Header
          isBack
          isSearchBtn
          GoBack={() => navigation.navigate(prop?.goBackScreen)}
          OpenSearch={OpenCloseSearch}
          Screen={prop?.header || route?.params?.header}
        />
      }
      flex={1}
      hideTopSafeArea
      hideBottomSafeArea
      backgroundColor={whiteThemeColors.background}
      onAndroidBack={onBackPress}
    >
      {isVisible && (
        <Search
          onInputChange={onChangeText}
          onClose={() => setisVisible(false)}
          animSpeed={100}
          data={stdList}
          searchKey='studentName,courseName'
          isVisible={isVisible}
          outPos={-110}
          inPos={-10}
          height={60}
        />
      )}
      {loading ? (
        <Loader />
      ) : (
        <_View style={styles.mainContainer}>
          {filterdStdList.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={filterdStdList}
              ListHeaderComponent={() => <_View style={{ height: 10 }} />}
              renderItem={renderItem}
              numColumns={width > 500 ? 2 : 1}
              ListEmptyComponent={<NoData />}
            />
          ) : (
            <NoData />
          )}
        </_View>
      )}
    </_Screen>
  );
};

export const ProgressStudentList = React.memo(index);
