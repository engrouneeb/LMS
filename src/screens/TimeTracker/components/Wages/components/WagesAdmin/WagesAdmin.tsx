import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  UIManager,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Appstate } from 'reducers/Appstate';
import { whiteThemeColors } from 'utilities';
import { _Screen } from '../../../../../../components';
import CstHeader from '../../../../../Headers';
import Search from '../../../../../Search';
import { WagesItem } from '../WagesItem';

export const WagesAdmin = () => {
  const navigation: any = useNavigation();
  const { data, timeTrackerScreen } = useSelector((state: Appstate) => ({
    data: state.msAdminWagesReducer.data,
    timeTrackerScreen: state.language.timeTrackerScreen,
  }));
  const [isVisible, setisVisible] = useState(false);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    Platform.select({
      android: () => {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      },
    });
  }, []);

  const handleBack = () => {
    navigation.goBack();
    return true;
  };

  return (
    <_Screen
      header={
        <CstHeader
          isBack
          isSearchBtn
          Screen={timeTrackerScreen.Wages}
          GoBack={() => navigation.goBack()}
          OpenSearch={() => setisVisible(true)}
          backgroundColor={whiteThemeColors.background}
          bottomSafeAreaColor={whiteThemeColors.background}
          flex={1}
          hideTopSafeArea
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={handleBack}
    >
      {isVisible && (
        <Search
          onInputChange={(data: any) => setFilteredData(data)}
          onClose={() => setisVisible(false)}
          animSpeed={100}
          data={data}
          searchKey='userName,role'
          isVisible={isVisible}
          outPos={-110}
          inPos={-10}
          height={60}
        />
      )}
      <SafeAreaView style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.flatListStyle}
          data={filteredData}
          renderItem={({ item, index }) => (
            <WagesItem Obj={item} key={index + ''} />
          )}
          keyExtractor={(item: any) => item.uniqueId}
        />
      </SafeAreaView>
    </_Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteThemeColors.background,
  },
  flatListStyle: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});
