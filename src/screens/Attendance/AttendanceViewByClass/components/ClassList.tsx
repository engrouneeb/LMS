import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { whiteThemeColors } from '../../../../Utilities';
import { NoData } from '../../../../../assets/Icons';
import { getClassDate } from '../../../../actions/AttendanceActions';
import {
  _Text,
  _View,
  classListAttendanceInterface,
} from '../../../../components';
import { _ActivityIndicator } from '../../../Loader';
import ClassListCard from './ClassListCard';
const ClassList: React.FC<classListAttendanceInterface> = props => {
  const [value] = useState('');
  const [startDate] = useState(new Date().toDateString());
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const filtercourseClasses = (courseClassesArr: any, text: any) => {
    var CourClass = courseClassesArr.filter(
      (classObj: any) => classObj.className.toUpperCase().indexOf(text) != -1,
    );
    return CourClass;
  };
  const filterlevelClasses = (levelClasses: any, text: any) => {
    var levelClasses = levelClasses.filter(
      (LevelCObj: any) => LevelCObj.className.toUpperCase().indexOf(text) != -1,
    );
    return levelClasses;
  };
  const filterLevels = (LevelArr: any, text: any) => {
    var CourLevels: any = [];
    LevelArr.map((levelObj: any) => {
      if (filterlevelClasses(levelObj.levelClasses, text).length > 0) {
        CourLevels.push(levelObj);
      }
    });
    return CourLevels;
  };

  const renderData = (Obj: any) => {
    if (
      filtercourseClasses(Obj.courseClasses, value.toUpperCase()).length > 0 ||
      filterLevels(Obj.courseLevels, value.toUpperCase()).length > 0
    ) {
      return renderList(Obj);
    }
  };
  const renderList = (Obj: any) => {
    return [renderLevel(Obj), renderClasses(Obj)];
  };
  const renderLevel = (Obj: any) => {
    var courseName = Obj.subscriptionName;
    var courseImage = Obj.courseImage;
    var levelName: any;
    if (Obj.courseLevels.length > 0) {
      if (filterLevels(Obj.courseLevels, value.toUpperCase()).length > 0) {
        return Obj.courseLevels.map((LevelObj: any) => {
          if (
            filterlevelClasses(LevelObj.levelClasses, value.toUpperCase())
              .length > 0
          ) {
            levelName = LevelObj.levelName;
            return LevelObj.levelClasses.map(
              (LevelClassObj: any, ClassIndex: any) => {
                return renderClassList(
                  LevelClassObj,
                  ClassIndex,
                  LevelClassObj.classId,
                  courseName,
                  courseImage,
                  levelName,
                );
              },
            );
          }
        });
      }
    }
  };

  const renderClasses = (Obj: any) => {
    if (Obj.courseClasses.length > 0) {
      if (
        filtercourseClasses(Obj.courseClasses, value.toUpperCase()).length > 0
      ) {
        return Obj.courseClasses.map((ClassObj: any, ClassIndex: any) => {
          return renderClassList(
            ClassObj,
            ClassIndex,
            ClassObj.classId,
            Obj.subscriptionName,
            Obj.courseImage,
          );
        });
      }
    }
  };
  const getDate = (date: any) => {
    var Today = new Date();
    var ValidityDayNo = 15;
    if (date == 'start') {
      return new Date(
        Today.setDate(Today.getDate() - ValidityDayNo),
      ).toDateString();
    } else {
      return new Date(
        Today.setDate(Today.getDate() + ValidityDayNo),
      ).toDateString();
    }
  };
  const onPressBatches = async (batchObj: any) => {
    await dispatch(
      getClassDate(batchObj.batchkey, true, getDate('start'), getDate('end')),
    ).then(() => {
      props.navigation.navigate('attendanceClassTimings', {
        screenVariant: props.screenVariant,
      });
    });
  };
  const onPressCourse = async (CourseID: any) => {
    setIsLoading(true);
    getClassDate(CourseID, false, startDate, getOneMonth());
    await dispatch(
      getClassDate(CourseID, false, startDate, getDate('end')),
    ).then(() => {
      setIsLoading(false);
      props.navigation.navigate('attendanceClassTimings', {
        screenVariant: props.screenVariant,
      });
    });
  };
  const renderClassList: any = (
    Obj: any,
    index: any,
    CourseID: any,
    courseName: any,
    courseImage: any,
    levelName?: any,
  ) => {
    var CourseName = courseName;
    const imageUri = courseImage;
    if (Obj.classBatches.length > 0)
      return Obj.classBatches.map((batchObj: any) => {
        if (batchObj.batchName.indexOf(value) != -1) {
          return (
            <Pressable
              style={styles.cardComponet}
              onPress={() => onPressBatches(batchObj)}>
              <ClassListCard
                CourseName={CourseName}
                levelName={levelName}
                Obj={Obj}
                imageUri={imageUri}
              />
            </Pressable>
          );
        }
      });
    else {
      if (Obj.className.toUpperCase().indexOf(value.toUpperCase()) != -1) {
        return (
          <Pressable
            style={styles.cardComponet}
            onPress={() => onPressCourse(CourseID)}>
            <ClassListCard
              CourseName={CourseName}
              levelName={levelName}
              Obj={Obj}
              imageUri={imageUri}
            />
          </Pressable>
        );
      }
    }
  };
  const getOneMonth = () => {
    var Today = new Date();
    var ValidityDayNo = 30;
    return new Date(
      Today.setDate(Today.getDate() + ValidityDayNo),
    ).toDateString();
  };

  const NoDataFound = () => (
    <_View style={styles.noDataFoundContainer}>
      <NoData />
      <_Text style={styles.noDataFoundTxt}>No Classes Found</_Text>
    </_View>
  );
  return (
    <_View style={{flex: 1, justifyContent: 'center'}}>
      {props.loading || isLoading ? (
        <_ActivityIndicator size={'large'} />
      ) : props.CoursesList.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={props.CoursesList}
          renderItem={({item}) => renderData(item)}
          keyExtractor={(item, index) => index.toString()}
          scrollEventThrottle={1}
        />
      ) : (
        <NoDataFound />
      )}
    </_View>
  );
};

export default ClassList;

const styles = StyleSheet.create({
  cardComponet: {
    paddingVertical: 15,
    backgroundColor: whiteThemeColors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: whiteThemeColors.cardColor.cardGrayBorder,
    borderRadius: 15,
    width: '97%',
    alignSelf: 'center',
    marginVertical: 5,
  },
  leftIcon: {
    width: '30%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2.84,
    elevation: 5,
  },
  cardIcon: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  cardBody: {
    width: '50%',
    paddingLeft: 5,
  },
  noDataFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataFoundTxt: {
    fontSize: 13,
    color: whiteThemeColors.greyDark,

    marginTop: -20,
  },
});
