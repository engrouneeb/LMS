import {
  useNavigation,
  ParamListBase,
  NavigationProp,
} from '@react-navigation/native';
import { MyRequestDetailsInterface, RequestDetailInterface } from 'interfaces';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';
import ApiEndpoints from '../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../data/DAL';
import { _Screen, _Text, _View, endpoint } from '../../../../components';
import Header from '../../../Headers';
import Loader from '../../../Loader/loader';
import { HeaderCard, NoDataFound, RenderItem } from './components';
import CommonStyles from 'screens/CommonStyles';

const MyRequestDetails: React.FC<MyRequestDetailsInterface> = ({ route }) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const { data, type } = route?.params;
  const [requestDetail, setRequestDetail] = useState<RequestDetailInterface[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { Get } = DataAccess();

  useEffect(() => {
    GetRequestApprovalsStaus();
  }, []);

  const GetRequestApprovalsStaus = () => {
    setIsLoading(true);
    var EndPoint: endpoint = ApiEndpoints.GetRequestApprovalsStaus;
    EndPoint.params = `?id=${data?.itemId}&itemType=${type}`;
    Get(EndPoint)
      .then((res: any) => {
        if (!res.error) setRequestDetail(res);
      })
      .catch((Error) => console.log({ Error }))
      .finally(() => setIsLoading(false));
  };

  const handleBackBtn = () => {
    navigation.goBack();
    return true;
  };

  return (
    <_Screen
      header={
        <Header
          isBack
          Screen={'Request Details'}
          GoBack={() => navigation.goBack()}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={handleBackBtn}
    >
      <_View style={styles.container}>
        <HeaderCard
          userName={
            type == 'Cover' ? data?.requestedFromUserName : data?.itemName
          }
          type={type}
          data={data}
        />
        <_Text style={styles.commentsHeader}>Approvals Status</_Text>
        {isLoading ? (
          <_View flex={1}>
            <Loader size={'small'} />
          </_View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <RenderItem item={item} />}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => <NoDataFound />}
          />
        )}
      </_View>
    </_Screen>
  );
};

export { MyRequestDetails };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: whiteThemeColors.background,
  },
  commentsHeader: {
    fontSize: 15,
    color: whiteThemeColors.primary,
    margin: 10,
    marginTop: 20,
    fontFamily: CommonStyles.fonts.semiBold,
  },
});
