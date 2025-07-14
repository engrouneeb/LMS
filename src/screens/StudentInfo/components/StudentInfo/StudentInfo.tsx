import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { whiteThemeColors } from 'utilities';
import ApiEndpoints from '../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../data/DAL';
import * as StudentInfoStuff from '../../../../actions/StudentInfoAction';

import {
  endpoint,
  _Screen,
  _Text,
  _VectorIcons,
  _View,
} from '../../../../components';
import DrawerScreens from '../../../../navigation/Drawer/DrawerScreenNames';
import ScreensNames from '../../../../screenNames';
import Header from '../../../Headers';
import { _ActivityIndicator } from '../../../Loader';
import { UserImg } from '../../../ThumbNail';
import { styles } from './styles';
import { EndpointType } from 'interfaces';
import Search from 'screens/Search';
interface props {
  navigation: any;
  route: any;
}
const StudentInfo: React.FC<props> = ({ navigation, route }) => {
  const { Get } = DataAccess();
  const dispatch = useDispatch();
  const [studentList, setStudentList] = useState([]);
  const [filteredStudentList, setFilteredStudentList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showSearch, setIsShowSearch] = useState(false);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getStudentList();
    });
    return unsubscribe;
  }, [navigation]);
  const getStudentList = async () => {
    setLoader(true);
    const Endpoint: EndpointType = ApiEndpoints.GetStudentList;
    Endpoint.params = '?isOnlyActiveStd=false';
    await Get(Endpoint).then((res: any) => {
      setStudentList(res);
      setFilteredStudentList(res);
    });
    setLoader(false);
  };
  const RenderList = ({ Obj, id }: any) => {
    return (
      <_View key={id + '--'} style={styles.list}>
        <TouchableOpacity
          style={styles.ListItem}
          onPress={() => {
            loadStudentData(Obj.studentId);
            dispatch(StudentInfoStuff.studentInfo(Obj));
            navigation.navigate(ScreensNames?.StudentInfoDetials?.name, {
              studentName: Obj.studentName,
              studentId: Obj.studentId,
              goBack: DrawerScreens.studentTab.name,
              billing: route?.params?.billing,
              uniqueId: new Date().getTime(), // ensures uniqueness
            });
          }}
        >
          <_View style={styles.card}>
            <UserImg
              UserInfo={{
                FirstName: Obj?.studentName.split(' ')[0],
                LastName: Obj?.studentName.split(' ')[1]
                  ? Obj?.studentName.split(' ')[1]
                  : '',
                UserImage: Obj?.imageURL,
                UserImageColor: whiteThemeColors.primary,
              }}
              size={50}
            />
            <_View style={styles.textContainer}>
              <_Text numberOfLines={1} style={styles.stdName}>
                {Obj.studentName}
              </_Text>
              <_View flexDirection='row' marginTop={5}>
                {Obj.familyName && (
                  <_Text numberOfLines={2} style={styles.stdFamilyName}>
                    {Obj.familyName}
                  </_Text>
                )}
                <_Text
                  style={[
                    styles.badge,
                    Obj.isActive ? styles.active : styles.inActive,
                  ]}
                >
                  {Obj.isActive ? 'Active' : 'InActive'}
                </_Text>
              </_View>
            </_View>
            <_View style={styles.iconContainer}>
              <_VectorIcons
                type='AntDesign'
                name='right'
                color='white'
                size={15}
              />
            </_View>
          </_View>
        </TouchableOpacity>
      </_View>
    );
  };

  const handleLoader = () => {
    dispatch(StudentInfoStuff.studentInfoOverviewLoading());
  };

  const loadStudentData = async (studentId: string) => {
    try {
      const endpoints: endpoint[] = [
        {
          url: ApiEndpoints.getStudentOverview.url,
          params: `?studentId=${studentId}`,
        },
      ];

      handleLoader();
      const responses = await Promise.allSettled(
        endpoints.map((endpoint) => Get(endpoint)),
      );

      responses.forEach((result, index) => {
        const res = result.status === 'fulfilled' ? result.value : null;
        const actionType = getActionType(index);
        const successAction = getSuccessAction(actionType);
        const failureAction = getFailureAction(actionType);

        if (result.status === 'fulfilled' && !res.error) {
          Boolean(actionType == 'classes')
            ? dispatch(successAction(res.classesList))
            : dispatch(successAction(res));
        } else {
          dispatch(failureAction());
        }
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getActionType = (index: number): string => {
    const actionTypes = ['overview'];
    return actionTypes[index];
  };

  const getSuccessAction = (actionType: string) => {
    const successActions: any = {
      overview: StudentInfoStuff.studentInfoOverviewSuccess,
    };
    return successActions[actionType];
  };

  const getFailureAction = (actionType: string) => {
    const failureActions: any = {
      overview: StudentInfoStuff.studentInfoOverviewFailed,
    };
    return failureActions[actionType];
  };

  const NoStudentFound = () => {
    return (
      <_View style={styles.noStdFoundContainer}>
        <_VectorIcons
          type={'FontAwesome'}
          name={'users'}
          size={80}
          color={whiteThemeColors.greyDark}
        />
        <_Text style={styles.noStdFoundTxt}>No Users Found</_Text>
      </_View>
    );
  };
  const handleBack = () => {
    navigation.navigate(DrawerScreens.dashboard.name);
    return true;
  };
  return (
    <_Screen
      header={
        <Header
          isMenu
          OpenMenu={() => navigation.toggleDrawer()}
          Screen={'Student Info'}
          isSearchBtn={true}
          OpenSearch={() => {
            setIsShowSearch(true);
          }}
        />
      }
      flex={1}
      hideTopSafeArea
      backgroundColor={whiteThemeColors.background}
      onAndroidBack={handleBack}
    >
      {showSearch && (
        <Search
          onInputChange={(data) => setFilteredStudentList(data)}
          onClose={() => setIsShowSearch(false)}
          animSpeed={100}
          data={studentList}
          searchKey='familyName,studentName'
          isVisible={showSearch}
          outPos={-110}
          inPos={-10}
          height={60}
          showCross
        />
      )}
      {loader ? (
        <_ActivityIndicator
          size={'large'}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        />
      ) : (
        <_View style={styles.container}>
          <FlatList
            data={filteredStudentList}
            renderItem={({ item, index }) => (
              <RenderList Obj={item} index={index} />
            )}
            ListEmptyComponent={NoStudentFound}
            keyExtractor={(Obj: any) => Obj?.studentId}
          />
        </_View>
      )}
    </_Screen>
  );
};
export { StudentInfo };
