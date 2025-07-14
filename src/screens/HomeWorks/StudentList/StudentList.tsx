import React, { FC, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { whiteThemeColors } from 'utilities';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import {
  _Screen,
  _View,
  progressStudentListInterface,
} from '../../../components';
import ScreensNames from '../../../screenNames';
import Header from '../../Headers';
import Loader from '../../Loader/loader';
import Search from '../../Search';
import { EmptyList, ListHeaderComponent, RenderItem } from './components';
import { styles } from './style';

export const StudentList: FC<progressStudentListInterface> = ({
  route,
  navigation,
}) => {
  const { Get } = DataAccess();
  const [stdList, setStdList] = useState([]);
  const [filterdStdList, setFilterdStdList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [prop, setprop] = useState<any>();
  const [isVisible, setisVisible] = useState(false); 
  useEffect(() => setprop(route?.params), [route]);
  useEffect(() => {
    GetStudent();
  }, []);

  const GetStudent = () => {
    setLoading(true);
    var EndPoint = ApiEndpoints.GetStudentsAgainstCourses;
    Get(EndPoint)
      .then((res: any) => {
        if (!res.error) {
          setStdList(res);
          setFilterdStdList(res);
        } else {
          console.log(`Something went wrong response=${res}`);
        }
      })
      .catch((e) => console.log(`Error fetching student: ${e}`))
      .finally(() => setLoading(false));
  };

  const onChangeText = (data: any) => setFilterdStdList(data);
  const onBackPress = () => {
    navigation.navigate(prop?.goBackScreen);
    return true;
  };
  const OpenCloseSearch = () => setisVisible(false);

  const handleCardOnPress = (item: any) => {
    navigation.navigate('HomeWorks', {
      goBackScreen: ScreensNames.StudentListForHomework.name,
      studentId: item.studentId,
      studentName: item.studentName,
      header: prop.header,
      parentgoBackScreen: prop?.goBackScreen,
    });
  };

  const renderItem = ({ item }: any) => {
    return (
      <RenderItem
        studentName={item.studentName}
        onItemPress={() => handleCardOnPress(item)}
        studentId={item.studentId}
      />
    );
  };

  return (
    <_Screen
      header={
        <Header
          isSearchBtn
          isMenu
          OpenMenu={() => navigation.toggleDrawer()}
          OpenSearch={() => setisVisible(true)}
          Screen={'Student List'}
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
          onClose={OpenCloseSearch}
          animSpeed={100}
          data={stdList}
          searchKey='studentName,courseName'
          // ref={searchRef}
          outPos={-110}
          inPos={-10}
          height={60}
          isVisible={isVisible}
        />
      )}
      {loading ? (
        <Loader />
      ) : (
        <_View style={styles.mainContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filterdStdList}
            ListHeaderComponent={ListHeaderComponent}
            renderItem={renderItem}
            ListEmptyComponent={EmptyList}
          />
        </_View>
      )}
    </_Screen>
  );
};
