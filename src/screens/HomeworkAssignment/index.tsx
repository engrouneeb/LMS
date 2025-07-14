import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { NoApprovels } from '../../../assets/Icons';
import ApiEndpoints from '../../../data/ApiEndpoints';
import { DataAccess } from '../../../data/DAL';
import {
  _Image,
  _Screen,
  _Text,
  _VectorIcons,
  _View,
  endpoint,
  homeWorkAssignmentInterface,
} from '../../components';
import ScreensNames from '../../screenNames';
import Header from '../Headers';
import Search from '../Search';
import { styles } from './styles';
import { _ActivityIndicator } from '../Loader';

import defaultImagePath from '../../../assets/courseDefault.jpg';
import CommonStyles from 'screens/CommonStyles';

const Item = ({ item, navigation, studentId }: any) => (
  <TouchableOpacity
    onPress={() => {
      navigation.navigate(ScreensNames.HomeWorks.name, {
        studentId: studentId,
        courseId: item.courseId,
      });
    }}
    style={styles.itemContainer}
  >
    {item?.courseImage[0] == '/' ? (
      <Image source={defaultImagePath} style={styles.img} />
    ) : (
      <_Image uri={item.courseImage} style={styles.img} />
    )}
    <_View style={styles.nameContainer}>
      <_Text numberOfLines={2} style={styles.itemTitle}>
        {item.courseName}
      </_Text>
      <_View style={styles.titleCounterContainer}>
        <_Text style={styles.itemHomeworkText}>{'Homeworks'}</_Text>
        <_Text
          style={{
            color: whiteThemeColors.primaryTextColor,
            marginTop: 10,
            fontFamily: CommonStyles.fonts.regular,
            fontSize: 10,
          }}
        >
          {`(${item.homeworkCount})`}
        </_Text>
      </_View>
    </_View>
    <_View style={styles.getBtn}>
      <_VectorIcons
        name={'arrowright'}
        type={'AntDesign'}
        color={whiteThemeColors.white}
        size={17}
      />
    </_View>
  </TouchableOpacity>
);

const HomeworkAssignment: React.FC<homeWorkAssignmentInterface> = ({
  route,
  navigation,
}) => {
  const { Get } = DataAccess();
  const [courseList, setCourseList] = useState<any>();
  const [filteredCourseList, setFilteredCourseList] = useState<any>();
  const [prop, setprop] = useState<any>();
  let searchRef: any = useRef();
  const [loading, setloading] = useState(false);
  const [isVisible, setisVisible] = useState(false);
  useEffect(() => {
    if (route.params) {
      setprop(route.params);
      fetchHomeworks();
    }
  }, [route.params]);

  const fetchHomeworks = async () => {
    setloading(true);
    var EndPoint: endpoint = ApiEndpoints.GetHomeworkCourses;
    EndPoint.params = `?studentId=${route.params.studentId}`;
    Get(EndPoint)
      .then((res: any) => {
        if (!res.error) {
          setFilteredCourseList(res);
          setCourseList(res);
        } else {
          console.log('Error while fetching homeworks');
        }
      })
      .finally(() => setloading(false));
  };

  const onChangeText = (data: any) => setFilteredCourseList(data);

  const renderItem = ({ item }: any) => (
    <Item
      item={item}
      navigation={navigation}
      studentId={route.params.studentId}
    />
  );
  const handleBack = () => {
    Boolean(!route?.params?.parentgoBackScreen)
      ? navigation.navigate(prop?.goBackScreen)
      : navigation.navigate(prop?.goBackScreen, {
          goBackScreen: route?.params?.parentgoBackScreen,
          header: route?.params?.header,
          isFromStudentProgress: false,
          studentId: route?.params?.studentId,
          studentName: route?.params?.studentName,
        });
    return true;
  };

  const handleGoBack = () => {
    if (Boolean(!route?.params?.parentgoBackScreen)) {
      navigation.navigate(prop?.goBackScreen);
    } else {
      navigation.navigate(prop?.goBackScreen, {
        goBackScreen: route?.params?.parentgoBackScreen,
        header: route?.params?.header,
        isFromStudentProgress: false,
        studentId: route?.params?.studentId,
        studentName: route?.params?.studentName,
      });
    }
  };

  const OpenCloseSearch = () => setisVisible(true);

  const NoDateFound = () => {
    return (
      <View style={styles.noDataFoundContainer}>
        <NoApprovels />
        <_Text style={styles.noDataFoundTxt}>
          No Homework/Assignment found
        </_Text>
      </View>
    );
  };

  return (
    <_Screen
      header={
        <Header
          isBack
          isSearchBtn
          GoBack={() => handleGoBack()}
          Screen={Boolean(prop?.header) ? prop?.header : prop?.studentName}
          OpenSearch={OpenCloseSearch}
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
          animSpeed={100}
          data={courseList}
          searchKey='courseName'
          outPos={-110}
          inPos={-10}
          onClose={() => setisVisible(false)}
          height={60}
          isVisible={isVisible}
        />
      )}
      {!loading ? (
        <FlatList
          data={filteredCourseList}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <_View style={{ height: 10 }} />}
          ListHeaderComponent={() => <_View style={{ height: 10 }} />}
          ListEmptyComponent={() => <NoDateFound />}
        />
      ) : (
        <_ActivityIndicator size='large' />
      )}
    </_Screen>
  );
};
export default HomeworkAssignment;
