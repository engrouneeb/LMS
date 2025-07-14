import React, { useEffect, useState } from 'react';
import {
  viewAttendanceBCInterface,
  _Screen,
  _Text,
  _View,
} from '../../../components';
import DrawerScreenNames from '../../../navigation/Drawer/DrawerScreenNames';
import CstHeader from '../../Headers';
import Search from '../../Search';
import {
  getTerminologyLabel,
  TerminologyMap,
  whiteThemeColors,
} from 'utilities';
import { _ActivityIndicator } from '../../Loader';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import ClassListCard from './components/ClassListCard';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import { EndpointType } from 'interfaces';
import EmptyList from 'screens/EmptyList';
import { useNavigation } from '@react-navigation/native';

const ScreenTitle: any = {
  ['viewByClass']: 'View by Class',
  ['cancelClass']: 'Cancel Class',
};

const AttendanceViewByClass: React.FC<viewAttendanceBCInterface> = ({
  navigation,
  route,
}) => {
  const [loading, setLoading] = useState(false);
  const [screenVariant] = useState(route?.params?.variant);
  const [filteredClasslist, setFilteredClasslist] = useState([]);
  const [classesList, setClassesList] = useState([]);
  const onChangeText = (data: any) => {
    setFilteredClasslist(data);
  };
  // const navigation = useNavigation();
  const { Get } = DataAccess();
  const [isVisible, setisVisible] = useState(false);
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
  const GetClassesList = async () => {
    setLoading(true);
    try {
      var ViewClassEndPoint: EndpointType = ApiEndpoints.GetAllCompanyClasses;
      var CancelledEndPoint: EndpointType =
        ApiEndpoints.GetCompanyCancelClasses;
      var EndPoint =
        ScreenTitle[screenVariant] === 'View by Class'
          ? ViewClassEndPoint
          : CancelledEndPoint;

      let response = await Get(EndPoint);
      if (response.error) {
        console.log('Error', response.error);
      } else {
        setClassesList(response);
        setFilteredClasslist(response);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    GetClassesList();
  }, []);

  const onAndroidBack = () => {
    navigation.goBack();
    return true;
  };

  const onPressCourse = async (item: any) => {
    ScreenTitle[screenVariant] === 'View by Class'
      ? navigation.navigate('attendanceClassTimings', {
          screenVariant: screenVariant,
          ClassDetais: item,
        })
      : navigation.navigate('CancelledClassTimings', {
          screenVariant: screenVariant,
          ClassDetais: item,
        });
  };
  return (
    <>
      <_Screen
        header={
          <CstHeader
            isBack
            isSearchBtn
            goBack={() =>
              navigation.navigate(DrawerScreenNames.attendance.name, {
                refresh: true,
              })
            }
            Screen={ScreenTitle[screenVariant].replace(
              'Class',
              terminologies['Class']?.label,
            )}
            OpenSearch={() => setisVisible(true)}
          />
        }
        onAndroidBack={onAndroidBack}
        hideTopSafeArea
        hideBottomSafeArea
        backgroundColor={whiteThemeColors.background}
      >
        {isVisible && (
          <Search
            onInputChange={onChangeText}
            onClose={() => setisVisible(false)}
            animSpeed={100}
            data={classesList}
            searchKey='className'
            outPos={-110}
            inPos={-10}
            height={60}
            isVisible={isVisible}
          />
        )}
        {loading ? (
          <_ActivityIndicator size={'large'} />
        ) : filteredClasslist?.length == 0 || classesList?.length == 0 ? (
          <EmptyList text={`No ${terminologies['Class']?.label} Found!`} />
        ) : (
          <FlatList
            data={filteredClasslist || classesList}
            renderItem={({ item }) => (
              <Pressable
                style={styles.pressContainer}
                onPress={() => onPressCourse(item)}
              >
                <ClassListCard classData={item} />
              </Pressable>
            )}
          />
        )}
      </_Screen>
    </>
  );
};
const styles = StyleSheet.create({
  pressContainer: {
    paddingVertical: 15,
    backgroundColor: whiteThemeColors.white + 90,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    width: '95%',
    alignSelf: 'center',
    marginVertical: 5,
  },
});
export { AttendanceViewByClass };
