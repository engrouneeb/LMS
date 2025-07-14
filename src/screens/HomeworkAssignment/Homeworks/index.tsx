import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { isStudent, whiteThemeColors } from 'utilities';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import {
  HomeworkLoading,
  HomeworkSuccess,
  HomeworkFailed,
} from '../../../actions/HomeworkAction';
import {
  _Screen,
  _Text,
  _VectorIcons,
  _View,
  endpoint,
  homeWorkListInterface,
} from '../../../components';
import { Appstate } from '../../../reducers/Appstate';
import ScreensNames from '../../../screenNames';
import EmptyList from '../../EmptyList';
import Header from '../../Headers';
import { _ActivityIndicator } from '../../Loader';
import Search from '../../Search';
import { styles } from '../styles';

const Item = ({ item, navigation }: any) => {
  const user: any = useSelector((state: Appstate) => state.User.UserInfo);
  const PriorityStatus: any = {
    [1]: 'high',
    [2]: 'medium',
  };

  const handlePress = () => {
    submittHomework(
      item?.homeworkId,
      item?.stepId,
      item?.challengeId,
      navigation,
    );
  };

  return (
    <TouchableOpacity
      disabled={!isStudent(user.roleName)}
      onPress={() => handlePress()}
      style={[styles.cardSubContainer]}
    >
      <_View
        style={{
          backgroundColor: whiteThemeColors.primary + 30,
          height: '100%',
          width: 80,
          borderTopLeftRadius: 15,
          borderBottomLeftRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <_VectorIcons
          name={'my-library-books'}
          type={'MaterialIcons'}
          color={whiteThemeColors.white}
          size={30}
        />
      </_View>
      <_View style={{ width: '70%' }}>
        <_View style={styles.item}>
          <_Text numberOfLines={2} style={styles.title}>
            {item.title}
          </_Text>
        </_View>
        <_View
          style={[
            styles.statusContainer,
            {
              backgroundColor: item.isSubmitted
                ? whiteThemeColors.green
                : whiteThemeColors.greyDark + 95,
            },
          ]}
        >
          <_Text style={styles.homeworkText}>
            {item.isSubmitted ? 'Submitted' : 'Not Submitted'}
          </_Text>
        </_View>
        <_View style={styles.dateStatusContainer}>
          <_View style={styles.dateStatusSubContainer}>
            <_Text style={styles.labelText}>{'Priority : '}</_Text>

            <_Text style={styles.priorityTxt}>
              {PriorityStatus[item.priority] || 'low'}
            </_Text>
          </_View>
          <_View style={styles.dateContainer}>
            <_Text style={styles.labelText}>{'Date : '}</_Text>
            <_Text style={styles.priorityTxt}>
              {item.dueDate != null &&
                moment(item.dueDate).format('MMM Do, YYYY')}
            </_Text>
          </_View>
        </_View>

        <ScoreStatus status={item.status} color={item.color} />

        <_View style={styles.btn}>
          <_VectorIcons
            name={'arrowright'}
            type={'AntDesign'}
            color={whiteThemeColors.primary}
            size={18}
          />
        </_View>
      </_View>
    </TouchableOpacity>
  );
};

const submittHomework = (
  homeWorkId: any,
  stepId: any,
  challengeId: any,
  navigation: any,
) => {
  navigation.navigate(ScreensNames.homeWork.name, {
    challengeId: challengeId,
    homeWorkId: homeWorkId,
    stepId: stepId,
  });
};
const Homework: React.FC<homeWorkListInterface> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: any) => state.HomeworkReducer);
  const [homeworkList, setHomeworkList] = useState(data);
  const [filteredHomeworkList, setFilteredHomeworkList] = useState(data);
  let searchRef: any = useRef(null);
  const [laoding, setloading] = useState(false);
  const { Get } = DataAccess();
  const [isVisible, setisVisible] = useState(false);
  useEffect(() => {
    fetchHomeworks();
  }, [route.params.courseId]);
  useEffect(() => {
    setHomeworkList(data);
    setFilteredHomeworkList(data);
  }, [data]);

  const fetchHomeworks = async () => {
    dispatch(HomeworkLoading());
    setloading(true);
    var EndPoint: endpoint = ApiEndpoints.GetCourseHomeworks;
    EndPoint.params = `?courseId=${route.params.courseId}&studentId=${route.params.studentId}`;
    Get(EndPoint)
      .then((res: any) => {
        if (!res.error) {
          dispatch(HomeworkSuccess(res));
        } else {
          console.log('Error while fetching homework list');
          dispatch(HomeworkFailed());
        }
      })
      .finally(() => setloading(false));
  };

  const onChangeText = (data: any) => setFilteredHomeworkList(data);

  const renderItem = ({ item }: any) => (
    <Item item={item} navigation={navigation} />
  );

  const handleBack = () => {
    navigation.goBack();
    return true;
  };

  const OpenCloseSearch = () => setisVisible(true);

  const FooterComponent = () => {
    return <_View width={'100%'} height={40} />;
  };
  console.log('FooterComponent');

  return (
    <_Screen
      header={
        <Header
          isBack
          isSearchBtn
          goBack={() => navigation.goBack()}
          Screen={'Homework'}
          OpenSearch={OpenCloseSearch}
        />
      }
      hideTopSafeArea
      onAndroidBack={handleBack}
      backgroundColor={whiteThemeColors.background}
    >
      {isVisible && (
        <Search
          onInputChange={onChangeText}
          animSpeed={100}
          data={homeworkList}
          searchKey='title'
          outPos={-110}
          inPos={-10}
          onClose={() => setisVisible(false)}
          height={60}
          isVisible={isVisible}
        />
      )}
      {laoding ? (
        <_ActivityIndicator size='large' />
      ) : (
        <_View
          style={{
            flex: 1,
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredHomeworkList}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <_View style={{ height: 10 }} />}
            ListHeaderComponent={() => <_View style={{ height: 10 }} />}
            keyExtractor={(item) => item.id}
            ListFooterComponent={FooterComponent}
            ListEmptyComponent={() => (
              <EmptyList
                image={
                  <_VectorIcons
                    type={'MaterialIcons'}
                    name={'menu-book'}
                    size={70}
                    color={whiteThemeColors.primary}
                    style={{ marginBottom: 10 }}
                  />
                }
                text={'No Homework Found'}
              />
            )}
          />
        </_View>
      )}
    </_Screen>
  );
};

const ScoreStatus = ({ status, color }: any) => {
  const stausAccordingToValue: any = {
    [1]: 'Assigned',
    [2]: 'InProgress',
    [3]: 'NeedAttention',
    [4]: 'Completed',
  };
  return (
    <_View style={styles.scoreStatusContainer}>
      <_Text style={styles.labelText} numberOfLines={1}>
        Status
      </_Text>
      <_View
        style={[styles.scoreStatusSubContainer, { backgroundColor: color }]}
      >
        <_Text style={styles.scoreStatusTxt}>
          {stausAccordingToValue[status] || 'InProgress'}
        </_Text>
      </_View>
    </_View>
  );
};

export default Homework;
