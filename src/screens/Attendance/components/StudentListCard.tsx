import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet,TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import {
  collapsiableAnimation,
  getTerminologyLabel,
  isParent,
  isStudent,
  TerminologyMap,
  whiteThemeColors,
} from '../../../Utilities';
import {
  _Text,
  _VectorIcons,
  _View,
  studentListCardInterface,
} from '../../../components';
import { Appstate } from '../../../reducers/Appstate';
import CommonStyles from '../../CommonStyles';
import {
  AttendanceEnum,
  AttendanceTypes,
  RenderAttendanceTypes,
} from './AttendanceConstants';
const AttendanceMoreOpt = ({
  options,
  selectedItem,
  uniqueId,
  showDropDown,
  setSelectedOption,
  onSelect,
  selectedOption,
  setShowDropDown,
}: any) => {
  const [terminologies, setTerminologies] = useState<Partial<TerminologyMap>>(
    {},
  );
  useEffect(() => {
    const fetchTerminologies = async () => {
      const terms = await getTerminologyLabel();
      setTerminologies(terms);
    };
    fetchTerminologies();
  }, []);
  return (
    <_View
      style={[
        styles.attendanceMoreOptContainer,
        {
          borderTopEndRadius: showDropDown ? 0 : 10,
          borderTopStartRadius: showDropDown ? 0 : 10,
        },
      ]}
    >
      <_View style={styles.moreOptHeaderContainer}>
        <_VectorIcons
          type={'Ionicons'}
          name={'options'}
          size={16}
          color={whiteThemeColors.black}
        />
        <_Text style={styles.moreOptHeaderTxt}>Attendance Option</_Text>
      </_View>
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
        {options.slice(2).map((obj: any, index: any) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedOption(obj);
                onSelect(uniqueId, AttendanceEnum[obj], selectedItem);
                collapsiableAnimation();
                setShowDropDown(!showDropDown);
              }}
              style={[
                styles.singleOptContainer,
                {
                  marginTop: index == 0 ? 5 : 0,
                  backgroundColor:
                    RenderAttendanceTypes[selectedItem?.status] === obj
                      ? whiteThemeColors.primary + 25
                      : whiteThemeColors.greyDark + 15,
                },
              ]}
            >
              <_VectorIcons
                type={'MaterialIcons'}
                name={
                  RenderAttendanceTypes[selectedItem?.status] === obj
                    ? 'radio-button-checked'
                    : 'radio-button-unchecked'
                }
                size={15}
                color={
                  RenderAttendanceTypes[selectedItem?.status] === obj
                    ? whiteThemeColors.primary
                    : whiteThemeColors.greyDark
                }
              />
              <_Text
                style={[
                  styles.singleOptTxt,
                  {
                    color:
                      RenderAttendanceTypes[selectedItem?.status] === obj
                        ? whiteThemeColors.primary
                        : whiteThemeColors.black,
                  },
                ]}
              >
                {`${obj.replace('Class', terminologies['Class']?.label)}`}
              </_Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </_View>
  );
};
const StudentListCard: React.FC<studentListCardInterface> = ({
  item,
  props,
  index,
  onItrate,
}) => {
  const {
    markedAttendance,
    setMarkedAttendence,
    filteredStudentlist,
    setFilteredStudentlist,
    isClassAttendance,
    selectedAttendacneTypeAll,
  } = props;
  const UserInfo: any = useSelector((state: Appstate) => state.User.UserInfo);
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedOption, setSelectedOption] = useState<any>(
    selectedAttendacneTypeAll || RenderAttendanceTypes[item?.status],
  );
  useEffect(() => {
    setSelectedOption(
      selectedAttendacneTypeAll || RenderAttendanceTypes[item?.status],
    );
  }, [selectedAttendacneTypeAll]);

  const onSelect = (uniqueId: any, present: any, selectedItem: any) => {
    const itemIndex = filteredStudentlist.findIndex(
      (item: any) => item.uniqueId == uniqueId,
    );

    const markedItemIndex = markedAttendance.findIndex(
      (item: any) => item.uniqueId == uniqueId,
    );
    let isPresent = filteredStudentlist[itemIndex].status;
    if (isPresent == present) {
      // markedAttendance.splice(markedItemIndex, 1);
      selectedItem.isDelete = true;
    } else if (selectedItem?.isDelete) {
      delete selectedItem.isDelete;
    }
    // else {
    if (markedItemIndex > -1) {
      setMarkedAttendence(
        [...markedAttendance],
        [(markedAttendance[markedItemIndex] = selectedItem)],
      );
    } else {
      setMarkedAttendence([...markedAttendance, selectedItem]);
    }
    // }
    setFilteredStudentlist(
      [...filteredStudentlist],
      [
        present == 1
          ? (filteredStudentlist[itemIndex].status =
              filteredStudentlist[itemIndex].status == 1 && present == 1
                ? 0
                : 1)
          : present >= 3 && present <= 15
          ? (filteredStudentlist[itemIndex].status =
              filteredStudentlist[itemIndex].status == present
                ? (0, setSelectedOption(''))
                : present)
          : (filteredStudentlist[itemIndex].status =
              filteredStudentlist[itemIndex].status == 2 && present == 2
                ? 0
                : 2),
      ],
    );
  };
  return (
    <_View style={styles.mainContainer}>
      <_View style={styles.container}>
        <_View style={styles.cardContainer}>
          {item?.time ? (
            <>
              <_View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <_Text style={styles.timeTxt}>
                  {item?.time?.split(' ')[0]}
                </_Text>
                <_Text style={styles.AmText}>{item?.time?.split(' ')[1]}</_Text>
              </_View>
              <_Text style={styles.toText}>To</_Text>
              <_View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <_Text style={styles.timeTxt}>
                  {item?.time?.split(' ')[3]}
                </_Text>
                <_Text style={styles.AmText}>{item?.time?.split(' ')[4]}</_Text>
              </_View>
            </>
          ) : (
            <_VectorIcons
              type={'FontAwesome'}
              name={'user'}
              size={35}
              color={whiteThemeColors.primary}
            />
          )}
        </_View>

        <_View style={styles.cardMiddle}>
          <_View style={styles.section}>
            <_Text numberOfLines={1} style={styles.nameText}>
              {`${item.firstName} ${item.lastName}`}
            </_Text>
          </_View>

          {!isClassAttendance && (
            <>
              <_View style={styles.section}>
                <_Text numberOfLines={2} style={styles.text}>
                  {item?.className}
                </_Text>
              </_View>

              {item?.status > 0 && (
                <_View style={styles.section}>
                  <_VectorIcons
                    type={'MaterialCommunityIcons'}
                    name={'progress-check'}
                    size={15}
                    color={whiteThemeColors.greyDark}
                    style={{ marginTop: 5 }}
                  />
                  <_Text
                    numberOfLines={1}
                    style={[styles.text, { marginTop: 5, marginLeft: 5 }]}
                  >
                    {RenderAttendanceTypes[item?.status]}
                  </_Text>
                </_View>
              )}
            </>
          )}
        </_View>
        <_View style={styles.iconsContainer}>
          <TouchableOpacity
            disabled={
              isStudent(UserInfo.roleName) || isParent(UserInfo.roleName)
            }
            style={styles.actionIcon}
            onPress={() => onSelect(item.uniqueId, 1, item)}
          >
            <_VectorIcons
              type={'Feather'}
              name={'check-square'}
              size={15}
              color={
                item?.status == AttendanceEnum['Present']
                  ? whiteThemeColors.green
                  : whiteThemeColors.greyDark
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={
              isStudent(UserInfo.roleName) || isParent(UserInfo.roleName)
            }
            onPress={() => onSelect(item.uniqueId, 2, item)}
            style={[styles.actionIcon, { marginLeft: 5 }]}
          >
            <_VectorIcons
              type={'MaterialCommunityIcons'}
              name={'close-box-outline'}
              size={15}
              color={
                item?.status == AttendanceEnum['Absent']
                  ? whiteThemeColors.red
                  : whiteThemeColors.greyDark
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={
              isStudent(UserInfo.roleName) || isParent(UserInfo.roleName)
            }
            onPress={() => {
              onItrate(index);
              collapsiableAnimation();
              // setShowDropDown(!showDropDown);
            }}
            style={[styles.actionIcon, { marginLeft: 5 }]}
          >
            <_VectorIcons
              type={'AntDesign'}
              name={
                item?.status >= 3 && item?.status < 16
                  ? 'downcircle'
                  : 'downcircleo'
              }
              size={15}
              color={
                item?.status >= 3 && item?.status < 16
                  ? whiteThemeColors.primary
                  : whiteThemeColors.greyDark
              }
            />
          </TouchableOpacity>
        </_View>
      </_View>
      {item?.showDropDown && (
        <AttendanceMoreOpt
          options={AttendanceTypes}
          selectedItem={item}
          uniqueId={item.uniqueId}
          showDropDown={item?.showDropDown}
          setSelectedOption={setSelectedOption}
          selectedOption={selectedOption}
          onSelect={onSelect}
          setShowDropDown={setShowDropDown}
        />
      )}
    </_View>
  );
};

export default StudentListCard;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: whiteThemeColors.white,
    flexDirection: 'row',
    flex: 1,
    marginTop: 14,
    width: '100%',
    alignSelf: 'center',
    height: 100,
  },
  cardContainer: {
    flex: 0.35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  cardMiddle: {
    flex: 0.6,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: whiteThemeColors.primary + 30,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 16,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: whiteThemeColors.primaryTextColor,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  text: {
    color: whiteThemeColors.greyDark,
    fontSize: 12,
    fontFamily: CommonStyles.fonts.regular,
  },
  iconsContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: whiteThemeColors.primary + 30,
  },
  attendanceMoreOptContainer: {
    backgroundColor: whiteThemeColors.white,
    height: 170,
    width: '100%',
    paddingBottom: 5,
    alignSelf: 'center',
    paddingTop: 10,
  },
  moreOptHeaderContainer: {
    width: '100%',
    height: 35,
    paddingLeft: 10,
    backgroundColor: whiteThemeColors.primary + 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  moreOptHeaderTxt: {
    color: whiteThemeColors.black,
    fontFamily: CommonStyles.fonts.medium,
    marginLeft: 5,
  },
  singleOptContainer: {
    width: '95%',
    height: 25,
    alignSelf: 'center',

    marginBottom: 5,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
  },
  singleOptTxt: {
    fontSize: 13,
    fontFamily: CommonStyles.fonts.regular,
    marginLeft: 5,
  },
  actionIcon: {
    width: 30,
    height: 30,
    backgroundColor: whiteThemeColors.white + 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  toText: {
    fontSize: 8,
    paddingVertical: 10,
    fontFamily: CommonStyles.fonts.light,
  },
  timeTxt: {
    fontFamily: CommonStyles.fonts.semiBold,
    fontSize: 16,
    color: 'gray',
  },
  AmText: {
    fontFamily: CommonStyles.fonts.regular,
    fontSize: 8,
    marginLeft: 5,
    color: 'gray',
  },
});
