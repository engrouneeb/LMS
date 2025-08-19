import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import moment from 'moment';
import {useEffect, useReducer, useState} from 'react';
import {
  FlatList,
  Keyboard,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CommonStyles from '../../CommonStyles';
import {
  CustomAlert,
  DateTimePickerIos,
  TerminologyMap,
  convertUTCDateToLocalDateStringFormat,
  getTerminologyLabel,
  whiteThemeColors,
} from '../../../Utilities';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import {DataAccess} from '../../../../data/DAL';
import {error} from '../../../actions/AsyncStorage';
import {createMakeUpClass} from '../../../actions/AttendanceActions';
import {
  AddMakeUpClassDetailsResponseInterface,
  CourseLevelResponseInterface,
  InstructorInterface,
  LevelClass,
  TimeZoneInterface,
  _Screen,
  _Text,
  _TextInput,
  _VectorIcons,
  _View,
  classesNamesInterface,
  endpoint,
  filteredDataInterface,
} from '../../../components';
import DrawerScreens from '../../../navigation/Drawer/DrawerScreenNames';
import {Appstate} from '../../../reducers/Appstate';
import CstHeader from '../../Headers';
import {_ActivityIndicator} from '../../Loader';
import {Title_DateTimePicker} from './components';
import {
  CreateMakeUpClassResponseInterface,
  ReducerDataType,
  initialState,
  initialStateConstants,
  reducer,
} from './state';
import {styles} from './style';
import {Dropdown} from 'react-native-element-dropdown';

let instructorLists: number[] = [];
let _selectedTimeZone: number = -1;

export const MakeUpClass = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const dispatch: any = useDispatch();
  const classes = useSelector((state: Appstate) => state.class);
  const [mode, setmode] = useState('date');
  const [state, _setState] = useReducer(reducer, initialState);
  const setState = (type: string, data: ReducerDataType) =>
    _setState({type, data});
  const [IsVisible, setIsVisible] = useState(false);
  const {Get} = DataAccess();
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

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setState(initialStateConstants.isKeyboardOpened, true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setState(initialStateConstants.isKeyboardOpened, false),
    );

    setState(initialStateConstants.filteredData, [...classes.Courses]);
    fetchInstructorsAndTimeZones();

    return () => {
      setState(initialStateConstants.instructorList, []);
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const fetchInstructorsAndTimeZones = () => {
    Get(ApiEndpoints.AddMakeUpClassDetails)
      .then((res: AddMakeUpClassDetailsResponseInterface) => {
        if (res?.instructors && res?.timeZones) {
          setState(initialStateConstants.instructorList, res?.instructors);
          setState(initialStateConstants.timeZoneList, res?.timeZones);
        } else {
          console.log(
            'There is error fetching Instructor List & Timezone List',
          );
        }
      })
      .catch((ERROR: any) => console.log({ERROR}));
  };

  const handlePicker = (date: Date) => {
    if (!(date instanceof Date)) {
      return false;
    }
    setState(
      initialStateConstants.dateFrom,
      state.isFrom === 'dateFrom' ? new Date(date) : state.dateFrom,
    );
    setState(
      initialStateConstants.dateTo,
      state.isFrom === 'dateFrom' ? new Date(date) : state.dateTo,
    );
    setState(
      initialStateConstants.timeFrom,
      state.isFrom === 'timeFrom'
        ? moment(new Date(date)).format('h:mm A')
        : state.timeFrom,
    );
    setState(
      initialStateConstants.timeTo,
      state.isFrom === 'timeTo'
        ? moment(new Date(date)).format('h:mm A')
        : state.timeTo,
    );
    setState(initialStateConstants.pickerDateTime, new Date(date));
  };

  const handleCustomAlert = (
    show: boolean,
    title: string,
    message: string,
    btn: string,
  ) => {
    setState(initialStateConstants.showAlert, show);
    setState(initialStateConstants.alertTitle, title);
    setState(initialStateConstants.alertMessage, message);
    setState(initialStateConstants.firstBtn, btn);
  };

  const navigateClassList = () => {
    if (state.dateFrom > state.dateTo) {
      handleCustomAlert(
        true,
        'Error',
        'Please select a proper Date interval',
        'ReEnter',
      );
      return;
    }
    if (
      !moment(state.timeTo, 'h:mmA').isAfter(moment(state.timeFrom, 'h:mmA'))
    ) {
      handleCustomAlert(
        true,
        'Error',
        'Please select a proper Time interval',
        'Enter Again',
      );
      return;
    }
    setState(initialStateConstants.isLoading, true);

    dispatch(
      createMakeUpClass(
        state.classesNames[+state.selectedCourse]?.id,
        new Date(state.dateFrom).toISOString(),
        new Date(state.dateFrom).toISOString(),
        state.timeFrom,
        state.timeTo,
        '',
        state.timeZoneList[_selectedTimeZone]
          ? state.timeZoneList[_selectedTimeZone]
          : '',
        instructorLists,
      ),
    )
      .then((res: CreateMakeUpClassResponseInterface) => {
        handleCustomAlert(
          true,
          'Success',
          res.data.msg ||
            `Make-up ${terminologies['Class']?.label} added successfully`,
          'Okay',
        );
      })
      .catch((Error: any) => console.log({Error}))
      .finally(() => {
        instructorLists = [];
        setState(initialStateConstants.isLoading, false);
      });
  };
  const onValueChange = (value: number) => {
    setState(initialStateConstants.classesNames, []);
    if (value) {
      setState(initialStateConstants.selected, value.toString());
      setState(initialStateConstants.selectedCourse, '');
      fetchCourseLevels(value);
    }
  };

  const fetchCourseLevels = async (courseId: number) => {
    try {
      const EndPoint: endpoint = ApiEndpoints.CourseLevel;
      EndPoint.params = `?courseId=${courseId}`;
      setState(initialStateConstants.classLoader, true);
      let response: CourseLevelResponseInterface[] = await Get(EndPoint);
      let classesList: classesNamesInterface[] = [];
      if (response[0].levelClasses.length > 0) {
        response.map((item: CourseLevelResponseInterface) => {
          if (item.levelClasses.length != 0) {
            item.levelClasses.map((item: LevelClass) =>
              classesList.push({name: item.className, id: item.classId}),
            );
          }
        });
        setState(initialStateConstants.classesNames, classesList);
      } else {
        handleCustomAlert(
          true,
          'Error',
          `There is no ${terminologies['Class']?.label} against selected course`,
          'Okay',
        );
      }
    } catch (err) {
      console.log(err, 'catch');
      dispatch(error('Something Went Wrong' || 'ERROR'));
    } finally {
      setState(initialStateConstants.classLoader, false);
    }
  };

  const _showAlert = () =>
    handleCustomAlert(
      true,
      'Error',
      `Please select a ${terminologies['Course']?.label}/${terminologies['Class']?.label}`,
      'Okay',
    );

  const handleBack = () => {
    navigation.goBack();
    return true;
  };

  const onChangeText = (str: string) => {
    if (str.length === 0) {
      setState(initialStateConstants.filteredData, classes.Courses);
      return;
    }
    const filtered = classes.Courses.filter((word: filteredDataInterface) =>
      word.subscriptionName.includes(str),
    );
    setState(initialStateConstants.filteredData, filtered);
  };

  const handleDateTimePicker = (type: string, FromTo: string) => {
    setmode(type);
    setIsVisible(true);
    setState(initialStateConstants.isFrom, FromTo);
  };

  const handleInstructorChange = (selected: InstructorInterface[]) => {
    const ids = selected.map(item => item.value);
    const names = selected.map(item => item.text).join(',');
    setState(initialStateConstants.ids, ids);
    setState(initialStateConstants.selectedInstructor, names);
    instructorLists = ids;
  };
  const handleOnSelect = (rowData: string, rowID: string) => {
    const selectedIns = state.instructorList.filter(
      (item: InstructorInterface) => item.text === rowData,
    );
    if (state.ids.includes(+rowID)) {
      setState(
        initialStateConstants.ids,
        state.ids.filter((item: number) => item != +rowID),
      );
      const selectedInstructorList = state.selectedInstructor
        .split(',')
        .filter((item: string) => item != rowData);
      setState(
        initialStateConstants.selectedInstructor,
        selectedInstructorList.toString(),
      );
      instructorLists.filter((item: number) => item != selectedIns[0].value);
    } else {
      setState(initialStateConstants.ids, [...state.ids, +rowID]);

      if (state.selectedInstructor === '') {
        setState(initialStateConstants.selectedInstructor, rowData);
      } else {
        setState(
          initialStateConstants.selectedInstructor,
          state.selectedInstructor + ',' + rowData,
        );
      }
      instructorLists.push(selectedIns[0].value);
    }
  };
  return (
    <_Screen
      header={
        <CstHeader
          isBack
          GoBack={() => navigation.goBack()}
          Screen={`Add MakeUp ${terminologies['Class']?.label}`}
        />
      }
      hideTopSafeArea
      onAndroidBack={handleBack}
      flex={1}
      backgroundColor={whiteThemeColors.background}>
      <ScrollView
        scrollEnabled={!state.isKeyboardOpened}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled>
        <_Text
          style={
            styles.headerText
          }>{`Add Makeup ${terminologies['Class']?.label}`}</_Text>
        <_Text style={styles.detailText}>
          {`Fill in the details below to schedule a new makeup ${terminologies['Class']?.label}:`}
        </_Text>
        <_View style={styles.mainContainer}>
          <_Text
            style={
              styles.labelTxt
            }>{`Select ${terminologies['Course']?.label}`}</_Text>
          <TouchableOpacity
            activeOpacity={9}
            onPress={() =>
              setState(initialStateConstants.dropdown, !state.dropdown)
            }
            style={styles.dropdown}>
            <_Text
              numberOfLines={1}
              style={{
                width: '90%',
                fontFamily: CommonStyles.fonts.regular,
                color: whiteThemeColors.greyDark,
              }}>
              {state.courseName
                ? state.courseName
                : `Select a ${terminologies['Course']?.label}`}
            </_Text>
            <_View style={styles.iconContainer}>
              <_VectorIcons
                type={'Feather'}
                name={'chevron-down'}
                size={25}
                color={whiteThemeColors.white}
              />
            </_View>
          </TouchableOpacity>

          {state.dropdown && (
            <_View style={styles.dropdownMainCon}>
              <_View style={styles.search}>
                <_VectorIcons
                  type={'EvilIcons'}
                  name={'search'}
                  size={20}
                  color={whiteThemeColors.greyDark}
                />
                <_TextInput
                  autoFocus
                  autoCapitalize="none"
                  placeholder="Search"
                  onChangeText={onChangeText}
                  style={styles.dropDownSearchTxtInp}
                />
              </_View>
              <_View style={styles.dropdownCon}>
                <FlatList
                  data={state.filteredData}
                  keyExtractor={(item, index) => item.subscriptionID.toString()}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={styles.dropDownItemContainer}
                      onPress={() => {
                        setState(
                          initialStateConstants.courseName,
                          item.subscriptionName,
                        );
                        setState(initialStateConstants.dropdown, false);

                        onValueChange(item.subscriptionID);
                      }}>
                      <_Text numberOfLines={1} style={styles.dropDownItemTxt}>
                        {item.subscriptionName}
                      </_Text>
                    </TouchableOpacity>
                  )}
                  ListEmptyComponent={() => (
                    <_View style={styles.noCourseTxtContainer}>
                      <_Text
                        style={{
                          color: whiteThemeColors.primary,
                        }}>
                        {`No ${terminologies['Course']?.label} is Matched`}
                      </_Text>
                    </_View>
                  )}
                />
              </_View>
            </_View>
          )}

          <_Text
            style={
              styles.labelTxt
            }>{`Select ${terminologies['Class']?.label}`}</_Text>

          <_View
            style={[
              styles.dropdown,
              {
                backgroundColor:
                  state.classesNames.length > 0
                    ? whiteThemeColors.white
                    : whiteThemeColors.primary + 40,
              },
            ]}>
            {state.classLoader ? (
              <_View style={{flex: 1, justifyContent: 'center'}}>
                <_ActivityIndicator
                  size={'small'}
                  color={whiteThemeColors.primary}
                />
              </_View>
            ) : state.classesNames.length > 0 ? (
              <_View
                style={{
                  height: 40,
                  width: '100%',
                  borderRadius: 5,
                  backgroundColor: whiteThemeColors.white,
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                <Dropdown
                  data={state.classesNames.map(
                    (classname: any, idx: number) => ({
                      label: classname.name,
                      value: idx.toString(),
                    }),
                  )}
                  labelField="label"
                  valueField="value"
                  value={state.selectedCourse}
                  placeholder={`Select a ${terminologies['Class']?.label}`}
                  //  style={styles.dropDownContainer}
                  containerStyle={styles.dropdownStyle}
                  itemTextStyle={styles.dropDownTxt}
                  selectedTextStyle={[
                    styles.dropDownTxt,
                    {
                      color: whiteThemeColors.greyDark,
                      fontSize: 13,
                      width: '97%',
                    },
                  ]}
                  onChange={item => {
                    setState(initialStateConstants.selectedCourse, item.value);
                  }}
                  renderRightIcon={() => (
                    <_View
                      style={{
                        width: 50,
                        height: 45,
                        backgroundColor: whiteThemeColors.primary + 40,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <_VectorIcons
                        type={'Feather'}
                        name={'chevron-down'}
                        size={25}
                        color={whiteThemeColors.white}
                        style={{}}
                      />
                    </_View>
                  )}
                />
              </_View>
            ) : (
              <_Text style={styles.noClassFoundTxt}>
                {`No ${terminologies['Class']?.pluralLabel} against selected ${terminologies['Course']?.label}`}
              </_Text>
            )}
          </_View>

          <_Text style={styles.labelTxt}>Date From</_Text>
          <Pressable
            onPress={() => handleDateTimePicker('date', 'dateFrom')}
            style={styles.input}>
            <_Text
              onPress={() => handleDateTimePicker('date', 'dateFrom')}
              style={styles.dateTimeTxt}>
              {convertUTCDateToLocalDateStringFormat(state.dateFrom)}
            </_Text>
            <_View style={styles.iconContainer}>
              <_VectorIcons
                type={'SimpleLineIcons'}
                name={'calendar'}
                size={18}
                color={whiteThemeColors.white}
              />
            </_View>
          </Pressable>
          <_View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Title_DateTimePicker
              title={'Time From'}
              value={state.timeFrom}
              handleOnPress={() => handleDateTimePicker('time', 'timeFrom')}
              icon={{name: 'clock', type: 'Entypo'}}
            />

            <Title_DateTimePicker
              title={'Time To'}
              value={state.timeTo}
              handleOnPress={() => handleDateTimePicker('time', 'timeTo')}
              icon={{name: 'clock', type: 'Entypo'}}
            />
          </_View>

          <_Text style={styles.labelTxt}>{'Assign Instructor'}</_Text>
          <_View style={styles.dropdown}>
            <_View
              style={{
                height: 40,
                width: '100%',
                borderRadius: 5,
                backgroundColor: whiteThemeColors.white,
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <Dropdown
                data={state.instructorList.map((item: InstructorInterface) => ({
                  label: item.text,
                  value: item.value.toString(),
                  text: item.text,
                }))}
                disable={state.instructorList?.length === 0}
                placeholder={
                  state.ids.length !== 0
                    ? state.selectedInstructor
                    : 'Select an Instructor'
                }
                value={state.selectedInstructor}
                style={[styles.dropDownContainer, {width: '100%'}]}
                placeholderStyle={[styles.dropDownTxt, {width: '97%'}]}
                selectedTextStyle={[
                  styles.dropDownTxt,
                  {
                    color: whiteThemeColors.greyDark,
                    fontSize: 13,
                    width: '97%',
                  },
                ]}
                dropdownPosition="auto"
                containerStyle={styles.dropdownStyle}
                itemTextStyle={styles.dropDownTxt}
                renderItem={item => (
                  <TouchableOpacity
                    onPress={() => handleOnSelect(item.text, item.value)}
                    style={{
                      backgroundColor: whiteThemeColors.white,
                      padding: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: 15,
                    }}>
                    <_Text
                      style={{fontFamily: CommonStyles.fonts.regular}}
                      numberOfLines={1}>
                      {item.label}
                    </_Text>
                    <_VectorIcons
                      type={'MaterialCommunityIcons'}
                      name={
                        state.ids.includes(+item.value)
                          ? 'checkbox-intermediate'
                          : 'checkbox-blank-outline'
                      }
                      color={whiteThemeColors.primary}
                      size={18}
                    />
                  </TouchableOpacity>
                )}
                renderRightIcon={() => (
                  <_View
                    style={{
                      width: 50,
                      height: 45,
                      backgroundColor: whiteThemeColors.primary + '40',
                      borderTopRightRadius: 10,
                      borderBottomRightRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <_VectorIcons
                      type={'Feather'}
                      name={'chevron-down'}
                      size={25}
                      color={whiteThemeColors.white}
                    />
                  </_View>
                )}
                onChange={() => {}}
              />
            </_View>
          </_View>

          <_Text style={styles.labelTxt}>{'Select Timezone'}</_Text>
          <_View style={styles.dropdown}>
            <_View
              style={{
                height: 40,
                width: '100%',
                borderRadius: 5,
                backgroundColor: whiteThemeColors.white,
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <Dropdown
                data={state.timeZoneList.map(
                  (item: TimeZoneInterface, idx: number) => ({
                    label: item.displayName,
                    value: idx.toString(),
                  }),
                )}
                labelField="label"
                valueField="value"
                value={state.selectedTimeZone}
                placeholder={'Select a Timezone'}
                //  style={styles.dropDownContainer}
                containerStyle={styles.dropdownStyle}
                itemTextStyle={styles.dropDownTxt}
                selectedTextStyle={[
                  styles.dropDownTxt,
                  {
                    color: whiteThemeColors.greyDark,
                    fontSize: 13,
                    width: '97%',
                  },
                ]}
                renderRightIcon={() => (
                  <_View
                    style={{
                      width: 50,
                      height: 45,
                      backgroundColor: whiteThemeColors.primary + 40,
                      borderTopRightRadius: 10,
                      borderBottomRightRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <_VectorIcons
                      type={'Feather'}
                      name={'chevron-down'}
                      size={25}
                      color={whiteThemeColors.white}
                      style={{}}
                    />
                  </_View>
                )}
                onChange={item => {
                  setState(initialStateConstants.selectedTimeZone, item.value);
                  _selectedTimeZone = +item.value;
                }}
              />
            </_View>
          </_View>

          {IsVisible && (
            <DateTimePickerIos
              minimumDate={new Date()}
              onConfirm={handlePicker}
              data={state.pickerDateTime}
              mode={mode}
              isVisible={IsVisible}
              setisVisible={setIsVisible}
            />
          )}
          <_View style={styles.btnContainer}>
            <TouchableOpacity
              onPress={() => {
                [state.selected.length, state.selectedCourse.length].includes(0)
                  ? _showAlert()
                  : navigateClassList();
              }}
              style={styles.btn}>
              {state.isLoading ? (
                <_ActivityIndicator
                  color={whiteThemeColors.white}
                  size={'small'}
                />
              ) : (
                <_Text
                  style={
                    styles.btnTxt
                  }>{`Add Makeup ${terminologies['Class']?.label}`}</_Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(DrawerScreens.attendance.name, {
                  refresh: true,
                })
              }
              style={styles.CloseBtn}>
              <_Text style={styles.CloseBtnTxt}>Close</_Text>
            </TouchableOpacity>
          </_View>
        </_View>
      </ScrollView>
      {state.showAlert && (
        <CustomAlert
          visible={state.showAlert}
          title={state.alertTitle}
          msg={state.alertMessage}
          firstBtn={state.firstBtn ? state.firstBtn : 'Okay'}
          firstBtnFunc={() => {
            if (state.alertTitle == 'Success') navigation.goBack();
            handleCustomAlert(false, '', '', '');
          }}
        />
      )}
    </_Screen>
  );
};
