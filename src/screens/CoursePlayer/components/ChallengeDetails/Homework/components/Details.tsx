import { HomeworkDetailsInterface } from '../../../../../../interfaces';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import {
  RemoveHTML,
  convertUTCDateToLocalDateStringFormat,
  isStudent,
  whiteThemeColors,
  StudentInterface,
} from '../../../../../../Utilities';
import { _Text, _VectorIcons, _View } from '../../../../../../components';
import ScreensNames from '../../../../../../screenNames';
import { Appstate } from '../../../../../../reducers/Appstate';
import CommonStyles from '../../../../../CommonStyles';

const Details: React.FC<HomeworkDetailsInterface> = ({
  data,
  saveData,
  setEditable,
  tabName,
  navigation,
  homeWorkId,
  editable,
}) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [Data, setData] = useState<any>();
  const user: any = useSelector((state: Appstate) => state.User.UserInfo);
  const selectedStudent = useSelector(
    (state: any) => state.courseAssignStudentsReducer.data,
  );
  useEffect(() => {
    setTitle(data.homeWorkTitle);
    let priorityVal: any = getPriority(data.priority);
    setPriority(priorityVal);
    setData(data);
    setDueDate(data.dueDate);
  }, [data]);

  const getPriority = (value: number | string) => {
    if (value == 1) {
      return 'High';
    } else if (value == 2) {
      return 'Medium';
    } else if (value == 3) {
      return 'Low';
    } else if (value === 'High') {
      return 1;
    } else if (value === 'Medium') {
      return 2;
    } else if (value === 'Low') {
      return 3;
    } else return '';
  };
  const updateParent = (data: any) => {
    setData(data);
  };

  const submitHomework = () => {
    navigation.navigate(ScreensNames.submitChallenge.name, {
      homeworkAssignmentId: Data?.homeworkAssignmentId,
      description: Data?.description,
      instructorFeedback: Data?.instructorFeedback,
      parentFeedback: Data?.parentFeedback,
      isFromHomework: true,
      homeWorkId: homeWorkId,
      data,
      updateParent: updateParent,
    });
  };
  return (
    <_View style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <_View style={styles.titleContainer}>
          <_Text style={styles.titleTxt}>{tabName}</_Text>
        </_View>
        <_View style={styles.bodyContainer}>
          <_View style={styles.container}>
            <_View style={styles.rowContainer}>
              <_VectorIcons
                type={'MaterialCommunityIcons'}
                name={'subtitles-outline'}
                size={20}
                color={whiteThemeColors.primary}
              />
              <_Text style={styles.subTitleTxt}>Title:</_Text>
              <_Text numberOfLines={2} style={styles.subTitleValue}>
                {title}
              </_Text>
            </_View>
            <_View style={styles.rowContainer}>
              <_VectorIcons
                type={'MaterialCommunityIcons'}
                name={'progress-check'}
                size={20}
                color={whiteThemeColors.primary}
              />
              <_Text style={styles.priorityTxt}>Priority:</_Text>
              <_Text numberOfLines={1} style={styles.priorityValueTxt}>
                {priority}
              </_Text>
            </_View>
            <_View style={styles.rowContainer}>
              <_VectorIcons
                type={'MaterialCommunityIcons'}
                name={'clock-time-ten-outline'}
                size={20}
                color={whiteThemeColors.primary}
              />
              <_Text style={styles.dueDateTxt}>Due Date:</_Text>
              <_Text numberOfLines={1} style={styles.dueDateValueTxt}>
                {convertUTCDateToLocalDateStringFormat(dueDate)}
              </_Text>
            </_View>
            {data?.description ? (
              <_View style={[styles.rowContainer, { paddingRight: 10 }]}>
                <_VectorIcons
                  type={'MaterialIcons'}
                  name={'description'}
                  size={20}
                  color={whiteThemeColors.primary}
                />
                <_Text style={styles.descripTxt}>Description:</_Text>
                <_Text numberOfLines={2} style={styles.descripValueTxt}>
                  {Boolean(RemoveHTML(data.description))
                    ? ''
                    : RemoveHTML(data.description)}
                </_Text>
              </_View>
            ) : null}
          </_View>
          {isStudent(user.roleName as StudentInterface) ||
          selectedStudent != null ? (
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={() => {
                submitHomework();
              }}
            >
              <_VectorIcons
                type='AntDesign'
                name={'save'}
                size={18}
                color={whiteThemeColors.white}
              />
              <_Text style={styles.btnText}>Submit Work</_Text>
            </TouchableOpacity>
          ) : null}
        </_View>
      </ScrollView>
    </_View>
  );
};

export { Details };

const styles = StyleSheet.create({
  scrolling: {
    backgroundColor: whiteThemeColors.white,
    paddingBottom: 30,
    borderRadius: 5,
    marginHorizontal: 7,
    paddingVertical: 15,
  },
  container: {
    marginBottom: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
    justifyContent: 'space-around',
  },
  titleValue: {
    fontSize: 15,
    color: whiteThemeColors.greyDark,
    paddingRight: 10,
    paddingLeft: 10,
    paddingVertical: 2,
  },
  btnText: {
    textTransform: 'capitalize',
    fontSize: 15,
    color: whiteThemeColors.white,
    marginLeft: 5,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  submitBtn: {
    paddingHorizontal: 14,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: whiteThemeColors.primary,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    marginVertical: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: whiteThemeColors.primary + 15,
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 20,
    width: '100%',
    marginBottom: 10,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: whiteThemeColors.background,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    paddingBottom: 15,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  titleTxt: {
    fontSize: 20,
    color: whiteThemeColors.primary,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  bodyContainer: {
    borderRadius: 15,
    marginHorizontal: 10,
    paddingVertical: 25,
    backgroundColor: whiteThemeColors.white + 90,
  },
  subTitleTxt: {
    fontSize: 13,
    color: whiteThemeColors.black,
    marginRight: 45,
    marginLeft: 10,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  subTitleValue: {
    fontSize: 14,
    color: whiteThemeColors.greyDark,
    alignSelf: 'center',
    width: '65%',
    fontFamily: CommonStyles.fonts.regular,
  },
  priorityTxt: {
    fontSize: 13,
    color: whiteThemeColors.black,
    marginRight: 35,
    marginLeft: 10,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  priorityValueTxt: {
    fontSize: 14,
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.regular,
  },
  dueDateTxt: {
    fontSize: 13,
    color: whiteThemeColors.black,
    marginRight: 21,
    marginLeft: 10,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  dueDateValueTxt: {
    fontSize: 14,
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.regular,
  },
  descripTxt: {
    fontSize: 13,
    color: whiteThemeColors.black,
    marginRight: 11,
    marginLeft: 10,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  descripValueTxt: {
    fontSize: 14,
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.regular,
    width: '60%',
  },
});
