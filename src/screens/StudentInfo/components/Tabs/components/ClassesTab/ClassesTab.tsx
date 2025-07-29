import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ClassesTabPropsInterface,
  ClassListInterface,
  ClassDaysTiming,
  DayTimeSubList,
  FromToInterface,
  SaveAutoLoginResponseInterface,
} from '../../../../../../interfaces';
import React, {Fragment, useEffect, useState} from 'react';
import {Alert, FlatList, Linking, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {Appstate} from '../../../../../../../reducers/Appstate';
import {isStudent, whiteThemeColors} from '../../../../../../Utilities';
import {InstructorDiscSvg} from '../../../../../../../assets/Icons';
import ApiEndpoints from '../../../../../../../data/ApiEndpoints';
import {DataAccess} from '../../../../../../../data/DAL';
import {
  _Button,
  _Text,
  _VectorIcons,
  _View,
} from '../../../../../../components';
import {InstructorListModal} from './components/InstructorListModal/InstructorListModal';
import {TimingsModal} from './components/TimingsModal/TimingsModal';
import {styles} from './styles';
import {_ActivityIndicator} from '../../../../../Loader/_ActivityIndicator';
import {NoDataFound} from '../NoDataFound';
import CommonStyles from '../../../../../../screens/CommonStyles';
import {useNavigation} from '@react-navigation/native';
import ScreensNames from '../../../../../../screenNames';
import WhiteLabelConfig from '../../../../../../WhiteLabelConfig';
import {useAppModulePermission} from '../../../../../../customHooks';

const _ClassesTab: React.FC<ClassesTabPropsInterface> = ({
  name,
  courseLabel,
  levleLabel,
  classLabel,
}) => {
  const {filterMenuOptions} = useAppModulePermission();
  let isAddToClass = filterMenuOptions('AddPaymentMethod');
  const navigation = useNavigation();
  const {classes, loading} = useSelector((state: Appstate) => ({
    classes: state.StudentInfoReducer?.classes,
    loading: state.StudentInfoReducer?.isClassesLoading,
  }));
  const UserInfo: any = useSelector((state: Appstate) => state.User.UserInfo);
  const [showClassTiming, setShowClassTiming] = useState<boolean>(false);
  const [showClassInstructor, setShowClassInstructor] =
    useState<boolean>(false);
  const [dayTimeSubLists, setDayTimeSubLists] = useState<string | undefined>(
    '',
  );
  const [instructorList, setInstructorList] = useState<string[] | []>([]);
  const [selectedClassTiming, setSelectedClassTiming] = useState<
    ClassDaysTiming[] | []
  >([]);
  const [Class, setClass] = useState<ClassListInterface[] | []>([]);

  useEffect(() => {
    const cls: ClassListInterface[] = classes.classesList?.map(
      (Obj: ClassListInterface) => {
        return Obj;
      },
    );
    setClass(cls);
  }, [classes?.classesList]);

  const addToClass = async () => {
    navigation.navigate(ScreensNames.addToClass.name);
  };

  const handleTimingsOnPress = (item: ClassListInterface) => {
    try {
      setDayTimeSubLists(
        item.classBatchTimeList[0]?.dayTimeSubLists[0]?.timingLists,
      );
      setSelectedClassTiming(item.classBatchTimeList);
      var arr =
        item.classBatchTimeList[0]?.dayTimeSubLists[0]?.instructorName?.split(
          ',',
        );
      if (arr[0] == '') arr = [];
      setInstructorList(arr);
    } catch (e) {
      console.log('Error', e);
    }
    setShowClassTiming(true);
  };

  const handleInstructorsOnPress = (item: ClassListInterface) => {
    try {
      var arr =
        item.classBatchTimeList[0]?.dayTimeSubLists[0]?.instructorName.split(
          ',',
        );
      arr = arr.filter((name: string) => name.trim());
      setInstructorList(arr);
    } catch (e) {
      console.log('Error', e);
    }
    setShowClassInstructor(true);
  };
  const classCard = (item: ClassListInterface, index: any) => {
    return (
      <_View key={index} flex={1} style={styles.innerContainer}>
        <_View style={styles.nameView}>
          <_Text
            numberOfLines={2}
            style={[
              styles.valueText,
              {
                color: whiteThemeColors.primary,
                fontSize: 18,
                fontFamily: CommonStyles.fonts.semiBold,
                width: '75%',
              },
            ]}>
            {item.className}
          </_Text>
          <TouchableOpacity onPress={() => handleTimingsOnPress(item)}>
            <_View style={styles.calenderIcon}>
              <_VectorIcons
                type="AntDesign"
                name="clockcircleo"
                size={20}
                color={whiteThemeColors.white}
                style={{
                  alignSelf: 'center',
                }}
              />
            </_View>
          </TouchableOpacity>
        </_View>

        <_View style={{flexDirection: 'row', marginTop: 10}}>
          <_Text numberOfLines={1} style={styles.keyText}>
            {`${courseLabel} & ${levleLabel} : `}
          </_Text>
          <_Text numberOfLines={1} style={[styles.valueText, {width: '55%'}]}>
            {item.courseLevelName}
          </_Text>
        </_View>

        <_View style={{flexDirection: 'row'}}>
          <_Text style={styles.keyText}>{`Amount : `}</_Text>
          <_Text numberOfLines={1} style={styles.valueText}>
            {item.price}
          </_Text>
        </_View>
        <_View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <_View style={{flexDirection: 'row'}}>
            <_Text
              numberOfLines={1}
              style={styles.keyText}>{`Coupon : `}</_Text>
            <_Text numberOfLines={1} style={styles.valueText}>
              {Boolean(item.isCouponExist) ? item.isCouponExist : 'No Coupon'}
            </_Text>
          </_View>
          {WhiteLabelConfig.APP_VARIANT_NAME !== 'stemtree' && (
            <TouchableOpacity onPress={() => handleInstructorsOnPress(item)}>
              <_View style={styles.iconsStyles}>
                <_VectorIcons
                  type="FontAwesome"
                  name="users"
                  size={20}
                  color={whiteThemeColors.white}
                  style={{
                    alignSelf: 'center',
                  }}
                />
              </_View>
            </TouchableOpacity>
          )}
        </_View>
      </_View>
    );
  };
  return (
    <_View flex={1} backgroundColor={whiteThemeColors.background}>
      {loading ? (
        <_ActivityIndicator size="large" />
      ) : (
        <Fragment>
          {isAddToClass && (
            <_Button
              submitting={true}
              width={'95%'}
              borderRadius={10}
              style={styles.btn}
              BtnTxt={{
                color: whiteThemeColors.white,
                alignSelf: 'center',
                fontFamily: CommonStyles.fonts.bold,
                fontSize: 15,
              }}
              // class label add from terminolgy
              btnText={`Add to ${classLabel}`}
              callback={addToClass}
            />
          )}
          <TimingsModal
            modalVisible={showClassTiming}
            setModalVisible={setShowClassTiming}
            name={name}
            classDaysTimingList={selectedClassTiming}
          />
          <InstructorListModal
            modalVisible={showClassInstructor}
            setModalVisible={setShowClassInstructor}
            instructorList={instructorList}
          />
          <FlatList
            showsVerticalScrollIndicator={false}
            data={Class}
            renderItem={({item, index}) => classCard(item, index)}
            ListEmptyComponent={() => <NoDataFound />}
          />
        </Fragment>
      )}
    </_View>
  );
};
export const ClassesTab = React.memo(_ClassesTab);
