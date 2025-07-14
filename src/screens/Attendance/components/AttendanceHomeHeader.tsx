import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import CommonStyles from 'screens/CommonStyles';
import {
  DateTimePickerIos,
  convertUTCDateToLocalDateStringFormat,
  isParent,
  isStudent,
  whiteThemeColors,
} from 'utilities';
import {
  _Text,
  _VectorIcons,
  _View,
  attendanceHomeHeaderInterface,
} from '../../../components';
import AttendanceHeaderOptions from './AttendanceHeaderOptions';
import AttendanceHomeDropdown from './AttendanceHomeDropdown';

const AttendanceHomeHeader: React.FC<attendanceHomeHeaderInterface> = ({
  setMarkedAttendence,
  filteredStudentlist,
  setFilteredStudentlist,
  UserInfo,
  setLoading,
  setChosenDate,
  chosenDate,
  navigation,
  showMenu = true,
  markedAttendance,
  AttendanceTypes,
  setSelectedAttendanceTypeAll,
  classId = null,
  setSelected,
  selected,
  setIsAllAbsent,
  isAllAbsent,
  setIsAllPresent,
  isAllPresent,
  fetchAll,
}) => {
  const [isAllSelected, setAllSelected] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [isAllType, setIsAllType] = useState(false);
  const [selectedOptionHeader, setSelectedOptionHeader] = useState('');
  const [showAttendanceOptsDropDown, setShowAttendanceOptsDropDown] =
    useState(false);
  const [_visible, setVisibleState] = useState(false);
  const showPicker = () => {
    setShowAttendanceOptsDropDown(false);
    setShowDropDown(false);
    setVisibleState(true);
  };
  const setAllParesent = () => {
    setShowAttendanceOptsDropDown(false);
    setSelected(false);
    setShowDropDown(false);
    setIsAllAbsent(false);
    setIsAllType(false);
    setSelectedOptionHeader('');
    if (!isAllPresent) {
      for (let i = 0; i < filteredStudentlist.length; i++) {
        setFilteredStudentlist(
          [...filteredStudentlist],
          [(filteredStudentlist[i].status = 1)],
        );
      }
      setIsAllPresent(true);
    } else {
      for (let i = 0; i < filteredStudentlist.length; i++) {
        setFilteredStudentlist(
          [...filteredStudentlist],
          [(filteredStudentlist[i].status = 0)],
        );
      }
      setIsAllPresent(false);
    }
    setAllSelected(true);
    if (!isAllPresent) setMarkedAttendence(filteredStudentlist);
    else setMarkedAttendence([]);
  };
  const setAllAbsent = () => {
    setSelected(false);
    setShowAttendanceOptsDropDown(false);
    setShowDropDown(false);
    setIsAllPresent(false);
    setIsAllType(false);

    if (!isAllAbsent) {
      for (let i = 0; i < filteredStudentlist.length; i++) {
        setFilteredStudentlist(
          [...filteredStudentlist],
          [(filteredStudentlist[i].status = 2)],
        );
      }
      setIsAllAbsent(true);
    } else {
      for (let i = 0; i < filteredStudentlist.length; i++) {
        setFilteredStudentlist(
          [...filteredStudentlist],
          [(filteredStudentlist[i].status = 0)],
        );
      }
      setIsAllAbsent(false);
    }
    setAllSelected(false);
    if (!isAllAbsent) setMarkedAttendence(filteredStudentlist);
    else setMarkedAttendence([]);
  };

  const setAllAttendanceType = (attendanceTypeValue = 3) => {
    setShowAttendanceOptsDropDown(false);
    setSelected(false);
    setShowDropDown(false);
    setIsAllAbsent(false);
    setIsAllPresent(false);
    let statusFlag = false;
    if (filteredStudentlist[0].status == attendanceTypeValue) {
      for (let i = 0; i < filteredStudentlist.length; i++) {
        setFilteredStudentlist(
          [...filteredStudentlist],
          [(filteredStudentlist[i].status = 0)],
        );
      }
      setSelected(false);
      setIsAllType(false);
      statusFlag = false;
    } else {
      for (let i = 0; i < filteredStudentlist.length; i++) {
        setFilteredStudentlist(
          [...filteredStudentlist],
          [(filteredStudentlist[i].status = attendanceTypeValue)],
        );
      }
      setSelected(true);
      setIsAllType(true);
      statusFlag = true;
    }

    setAllSelected(true);
    if (statusFlag) setMarkedAttendence(filteredStudentlist);
    else setMarkedAttendence([]);
  };

  const identifySign = (sign = 'Present') => {
    if (sign == 'Absent') {
      for (var item in filteredStudentlist) {
        if (
          filteredStudentlist[item].status == null ||
          filteredStudentlist[item].status == 0
        )
          return true;
      }
    } else {
      for (var item in filteredStudentlist) {
        if (
          filteredStudentlist[item].status == 0 ||
          filteredStudentlist[item].status == null
        )
          return true;
      }
    }
  };

  const countSign = (val: any) => {
    const cnt = filteredStudentlist.filter((obj) => obj.status === val).length;
    return cnt;
  };
  return (
    <_View style={styles.container}>
      <TouchableOpacity onPress={showPicker} style={styles.dateContainer}>
        <_View
          style={{
            width: '100%',
            height: 40,
            // backgroundColor: whiteThemeColors.white + 90,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 8,
            marginLeft: 5,
          }}
        >
          <_VectorIcons
            type='Ionicons'
            name='calendar'
            color={whiteThemeColors.white}
            style={styles.calenderIcon}
            size={30}
          />
          <_Text style={styles.dateText}>
            {convertUTCDateToLocalDateStringFormat(chosenDate)}
          </_Text>
        </_View>

        {_visible && (
          <DateTimePickerIos
            onConfirm={(date: any) => {
              setChosenDate(new Date(date).toISOString());
              fetchAll(date);
            }}
            data={chosenDate ? new Date(chosenDate) : new Date()}
            mode='date'
            isVisible={_visible}
            setisVisible={setVisibleState}
          />
        )}
      </TouchableOpacity>
      <_View style={styles.menuContainer}>
        {!isStudent(UserInfo?.roleName) && !isParent(UserInfo?.roleName) && (
          <_View
            style={{
              flex: 1,
              justifyContent: 'space-around',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            {filteredStudentlist?.length > 0 && (
              <TouchableOpacity
                style={styles.iconStyle}
                onPress={setAllParesent}
              >
                <_VectorIcons
                  type={'Feather'}
                  name={'check-square'}
                  size={
                    isAllPresent && filteredStudentlist.length == countSign(1)
                      ? 30
                      : 16
                  }
                  color={
                    isAllPresent == null ||
                      markedAttendance.length != filteredStudentlist.length ||
                      identifySign('Present')
                      ? whiteThemeColors.white
                      : isAllPresent
                        ? whiteThemeColors.green
                        : whiteThemeColors.white
                  }
                />
              </TouchableOpacity>
            )}

            {filteredStudentlist?.length > 0 && (
              <TouchableOpacity style={styles.iconStyle} onPress={setAllAbsent}>
                <_VectorIcons
                  type={'MaterialCommunityIcons'}
                  name={'close-box-outline'}
                  size={
                    isAllAbsent && filteredStudentlist.length == countSign(2)
                      ? 30
                      : 16
                  }
                  color={
                    isAllAbsent == null ||
                      markedAttendance.length != filteredStudentlist.length ||
                      identifySign('Absent')
                      ? whiteThemeColors.white
                      : isAllAbsent
                        ? whiteThemeColors.red
                        : whiteThemeColors.white
                  }
                />
              </TouchableOpacity>
            )}
            {filteredStudentlist?.length > 0 && (
              <TouchableOpacity
                onPress={() => {
                  setShowAttendanceOptsDropDown(!showAttendanceOptsDropDown);
                  setShowDropDown(false);
                }}
                style={styles.iconStyle}
              >
                <_VectorIcons
                  type='AntDesign'
                  name={
                    isAllType &&
                      filteredStudentlist.length ==
                      countSign(filteredStudentlist[0].status)
                      ? 'downcircle'
                      : 'downcircleo'
                  }
                  color={
                    isAllType == null ||
                      markedAttendance.length != filteredStudentlist.length ||
                      identifySign('Other')
                      ? whiteThemeColors.white
                      : isAllType
                        ? whiteThemeColors.white
                        : whiteThemeColors.white
                  }
                  size={18}
                />
              </TouchableOpacity>
            )}
          </_View>
        )}

        {showAttendanceOptsDropDown && (
          <_View style={styles.dropdownContainer}>
            <AttendanceHeaderOptions
              selected={selected}
              // showDropDown={showAttendanceOptsDropDown}
              setShowDropDown={setShowAttendanceOptsDropDown}
              UserInfo={UserInfo}
              selectedOptionHeader={selectedOptionHeader}
              setSelectedOptionHeader={setSelectedOptionHeader}
              // AttendanceTypes={AttendanceTypes}
              setAllAttendanceType={(typeEnum: any) =>
                setAllAttendanceType(typeEnum)
              }
              setSelectedAttendanceTypeAll={setSelectedAttendanceTypeAll}
            />
          </_View>
        )}
        {showMenu && (
          <TouchableOpacity
            onPress={() => {
              setShowAttendanceOptsDropDown(false);
              setShowDropDown(!showDropDown);
            }}
            style={styles.iconStyle}
          >
            <_VectorIcons
              type='FontAwesome'
              name='ellipsis-v'
              size={18}
              color={whiteThemeColors.white}
            />
          </TouchableOpacity>
        )}
        {showDropDown && (
          <_View style={styles.dropdownContainer}>
            <AttendanceHomeDropdown
              showDropDown={showDropDown}
              setShowDropDown={setShowDropDown}
              navigation={navigation}
              UserInfo={UserInfo}
            />
          </_View>
        )}
      </_View>
    </_View>
  );
};
const styles = StyleSheet.create({
  calenderIcon: {
    marginLeft: 10,
  },

  container: {
    zIndex: 10,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    // borderBottomColor: whiteThemeColors.cyan,
    backgroundColor: whiteThemeColors.primary,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  dateContainer: {
    flex: 5,
    flexDirection: 'row',
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    marginLeft: 7,
    marginTop: 4,
    fontFamily: CommonStyles.fonts.semiBold,
    color: 'white',
  },
  menuContainer: {
    flexDirection: 'row',
    flex: 4,
    justifyContent: 'flex-end',
    // alignSelf: 'stretch',
    alignItems: 'center',
  },

  menuBtn: {
    height: 50,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    color: whiteThemeColors.greyDark,
    fontWeight: '900',
  },
  dropdownContainer: {
    flex: 1,
    position: 'absolute',
    right: 20,
    top: -1,
    zIndex: 1,
    backgroundColor: 'tomato',
  },
  iconStyle: {
    marginRight: 10,
    width: 30,
    height: 30,
    backgroundColor: whiteThemeColors.white + 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
export default AttendanceHomeHeader;
