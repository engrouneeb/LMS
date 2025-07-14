import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { FlatList, Modal, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { UserImg } from 'screens/ThumbNail';
import { whiteThemeColors } from 'utilities';
import { NoApprovels } from '../../../../../../assets/Icons';
import ApiEndpoints from '../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../data/DAL';
import {
  assignStudentsFailed,
  assignStudentsLoading,
  assignStudentsSuccess,
} from '../../../../../actions/CourseAssignStudentsAction';
import {
  _Screen,
  _Text,
  _VectorIcons,
  _View,
  endpoint,
} from '../../../../../components';
import Header from '../../../../Headers';
import Search from '../../../../Search';
import { styles } from './styles';
import { _ActivityIndicator } from 'screens/Loader';
import { Appstate } from '../../../../../reducers/Appstate';
interface props {
  courseId: number;
  isFromWhiteBoard: boolean;
  studentWhiteBoard?: (id: any, name: string) => void;
  userID: number;
  changeVisibleState?: any;
  getStudentDetails?: any;
  ref?: any;
  isVisible: boolean;
  setisVisible: (isvisble: boolean) => void;
}
const _StudentsList: React.FC<props> = (
  {
    courseId,
    isFromWhiteBoard,
    studentWhiteBoard,
    changeVisibleState,
    getStudentDetails,
    isVisible,
    setisVisible,
  },
  ref,
) => {
  const { Get } = DataAccess();
  const [isvisible, setisvisible] = useState(false);
  const [students, setStudents] = useState<any>([]);
  const [selectedStudent, setSelectedStudent] = useState<any>();
  const [filteredStudentList, setFilteredStudentList] = useState<any>([]);
  let searchRef: any = useRef();
  const dispatch = useDispatch();
  const { loading, failed } = useSelector(
    (state: Appstate) => state.courseAssignStudentsReducer,
  );
  const { courseContentScreen } = useSelector(
    (state: Appstate) => state.language,
  );
  useEffect(() => {
    getStudents(); //Update students list
  }, []);
  const getStudents = () => {
    const arr: any = [];
    let url: endpoint = ApiEndpoints.GetCourseAssignStudents;
    url.params = `?courseId=${courseId}`;
    dispatch(assignStudentsLoading());
    Get(url)
      .then((res: any) => {
        for (let i = 0; i < res.length; i++) {
          const obj = {
            id: res[i].value,
            name: res[i].text,
            isSelected: false,
          };
          arr.push(obj);
        }
        setStudents(arr);
        setFilteredStudentList(arr);
        return dispatch(assignStudentsSuccess(null));
      })
      .catch(() => {
        return dispatch(assignStudentsFailed());
      });
  };

  const reduceText = (word = '') => {
    return word.length > 17 ? word.substring(0, 17).concat('...') : word;
  };

  const assignSelectedStudent = (student: any, index: number) => {
    if (
      selectedStudent !== null &&
      selectedStudent !== undefined &&
      selectedStudent !== ''
    ) {
      if (selectedStudent.id === student.id) {
        student.isSelected = !student.isSelected;
        setSelectedStudent(student);
        students[index] = student;
        dispatch(assignStudentsSuccess(student.isSelected ? student : null));
        return;
      }

      selectedStudent.isSelected = false;
    }
    student.isSelected = true;
    setSelectedStudent(student);
    students[index] = student;
    return dispatch(assignStudentsSuccess(student));
  };

  const itemClicked = (item: any, index: number) => {
    if (isFromWhiteBoard) {
      studentWhiteBoard(item.id, item.name);
    } else {
      assignSelectedStudent(item, index);
      getStudentDetails(item.isSelected ? item.id : 0);
    }
    setisVisible(false);
  };
  const onChangeText = (data: any) => {
    let array: any = [];
    data.forEach((element: any) => {
      array.push(element);
    });
    setFilteredStudentList(data);
  };
  return (
    <Modal
      visible={isVisible}
      animationType='slide'
      onDismiss={changeVisibleState}
      onRequestClose={() => setisVisible(false)}
      supportedOrientations={['portrait', 'landscape']}
    >
      <_Screen
        header={
          <Header
            isBack={true}
            isSearchBtn={true}
            OpenSearch={() => {
              setisvisible(true);
            }}
            isLogout={false}
            Screen={
              isFromWhiteBoard
                ? courseContentScreen.WhiteBoardFor
                : courseContentScreen.StudentProgress
            }
            GoBack={() => {
              setisVisible(false);
            }}
          />
        }
        hideTopSafeArea
        flex={1}
        backgroundColor={whiteThemeColors.background}
      >
        {isvisible && (
          <Search
            onInputChange={onChangeText}
            onClose={() => {
              setisVisible(false);
            }}
            animSpeed={100}
            data={students}
            searchKey='name'
            isVisible={isvisible}
            outPos={-110}
            inPos={-10}
            height={60}
          />
        )}
        <_View style={styles.container}>
          {loading ? (
            <_ActivityIndicator size={'large'} />
          ) : (
            <_View
              style={{
                flex: 1,
              }}
            >
              <FlatList
                showsVerticalScrollIndicator={false}
                data={filteredStudentList}
                ListHeaderComponent={() => <_View style={{ height: 10 }} />}
                ListFooterComponent={() => <_View style={{ height: 10 }} />}
                ItemSeparatorComponent={() => <_View style={{ height: 6 }} />}
                renderItem={({ item, index }) => {
                  return (
                    <_View key={index} style={styles.itemContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          itemClicked(item, index);
                        }}
                        style={styles.itemBtn}
                      >
                        <_View style={styles.innerContainer}>
                          <UserImg
                            UserInfo={{
                              FirstName: item.name.split(' ')[0],
                              LastName: item.name.split(' ')[1],
                              UserImage: '',
                              UserImageColor: whiteThemeColors.primary,
                            }}
                            size={50}
                          />
                          <_Text numberOfLines={1} style={styles.nameTxt}>
                            {reduceText(item.name)}
                          </_Text>
                        </_View>
                        {item.isSelected ? (
                          <_VectorIcons
                            type={'Fontisto'}
                            name='checkbox-active'
                            size={16}
                            color={whiteThemeColors.green}
                          />
                        ) : (
                          <_VectorIcons
                            type={'Fontisto'}
                            name='checkbox-passive'
                            size={16}
                            color={whiteThemeColors.greyDark}
                          />
                        )}
                      </TouchableOpacity>
                    </_View>
                  );
                }}
                ListEmptyComponent={() => (
                  <_View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      padding: 30,
                    }}
                  >
                    <NoApprovels />
                    <_Text style={styles.noStdFoundTxt}>No Student found</_Text>
                  </_View>
                )}
              />
              {failed ? (
                <_View style={styles.failureContainer}>
                  <_Text style={styles.failureMsgTxt}>
                    Failed to load data
                  </_Text>
                </_View>
              ) : null}
            </_View>
          )}
        </_View>
      </_Screen>
    </Modal>
  );
};

export const StudentsList = React.memo(_StudentsList);
