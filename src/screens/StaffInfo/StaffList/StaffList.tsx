import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import { _Screen, _View, endpoint } from '../../../components';
import ScreensNames from '../../../screenNames';
import CstHeader from '../../Headers';
import Loader from '../../Loader/loader';
import Search from '../../Search';
import { NoData, RenderItem } from './components';
interface props {
  franchiseId: number | undefined;
}
const StaffList: React.FC<props> = ({ franchiseId }) => {
  const [loader, setLoader] = useState(false);
  const [staffList, setStaffList] = useState();
  const [searchList, setSearchList] = useState();
  const navigation: any = useNavigation();
  const { Get } = DataAccess();
  const [isVisible, setisVisible] = useState(false);
  useEffect(() => {
    if (franchiseId) getStaffDetailsList();
  }, [franchiseId]);

  const getStaffDetailsList = () => {
    setLoader(true);
    var EndPoint: endpoint = ApiEndpoints.GetAllStaffDataGrid;
    EndPoint.params = `?FranchiseIds=${franchiseId}`;
    Get(EndPoint)
      .then((res: any) => {
        if (res) {
          setStaffList(res);
          setSearchList(res);
        }
      })
      .catch((e: any) => console.log('Error: ', e))
      .finally(() => setLoader(false));
  };

  const backPress = () => {
    navigation.goBack();
    return true;
  };

  return (
    <_Screen
      header={
        <CstHeader
          isBack
          isSearchBtn
          OpenSearch={() => {
            setisVisible(true);
          }}
          GoBack={backPress}
          Screen={ScreensNames.StaffList.name}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={backPress}
    >
      {isVisible && (
        <Search
          onInputChange={(data: any) => setStaffList(data)}
          onClose={() => {
            setisVisible(false);
          }}
          animSpeed={100}
          data={searchList && searchList}
          searchKey='instructorFirstName,instructorLastName,instructorName'
          isVisible={isVisible}
          outPos={-110}
          inPos={-10}
          height={60}
        />
      )}
      <_View style={styles.container}>
        {loader ? (
          <Loader />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={staffList}
            style={{ width: '100%' }}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
            ListEmptyComponent={() => <NoData />}
            ListHeaderComponent={() => (
              <_View style={{ width: '100%', height: 10 }} />
            )}
            renderItem={({ item, index }) => (
              <RenderItem
                user={item}
                index={index}
                key={index.toString() + '0--'}
              />
            )}
          />
        )}
      </_View>
    </_Screen>
  );
};

export { StaffList };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: whiteThemeColors.background,
  },
});
