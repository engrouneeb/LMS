import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { EndpointType } from '../../../interfaces';
import React, { FC, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { Appstate } from '../../../../reducers/Appstate';
import { CustomAlert, whiteThemeColors } from '../../../Utilities';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import { _Screen, _Text, _VectorIcons, _View } from '../../../components';
import CstHeader from '../../Headers';
import { _ActivityIndicator } from '../../Loader';
import TransactionCard from './components/TransactionCard/TransactionCard';
import { styles } from './styles';

export const Transactions: FC = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const { storeScreen } = useSelector((state: Appstate) => state.language);
  const [allTransactions, setAllTransactions] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertText, setAlertText] = useState<string>('');
  const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);
  const { Get } = DataAccess();
  const getTransactions = () => {
    setIsLoading(true);
    let url: EndpointType = ApiEndpoints.GetAllStoreTransactions;
    Get(url).then((res: any) => {
      if (res.error) {
        setAlertText(res.error_description);
        setAlertModalVisible(true);
        setIsLoading(false);
      } else {
        setAllTransactions(res);
        setIsLoading(false);
      }
    });
  };
  useEffect(() => {
    getTransactions();
  }, []);
  const onAndroidBack = () => {
    navigation.goBack();
    return true;
  };
  return (
    <_Screen
      header={
        <CstHeader
          isBack
          GoBack={() => navigation.goBack()}
          Screen={storeScreen.Tabs[2].TabName}
        />
      }
      onAndroidBack={onAndroidBack}
      backgroundColor={whiteThemeColors.background}
      hideTopSafeArea
      flex={1}
    >
      {isLoading ? (
        <_ActivityIndicator
          size={'large'}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        />
      ) : (
        <>
          {allTransactions.length > 0 ? (
            <FlatList
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
              data={allTransactions}
              renderItem={({ item }) => (
                <>
                  <TransactionCard item={item} />
                </>
              )}
              keyExtractor={({ index }) => index}
            />
          ) : (
            <_View style={styles.emptyList}>
              <_VectorIcons
                type='FontAwesome'
                name={'exchange'}
                size={80}
                color={whiteThemeColors.primary + 90}
              />
              <_Text style={styles.emptyListText}>
                {'No Transactions Found'}
              </_Text>
            </_View>
          )}
        </>
      )}
      {alertModalVisible && (
        <CustomAlert
          visible={alertModalVisible}
          title={'Error'}
          msg={alertText}
          firstBtn={'Okay'}
          firstBtnFunc={() => {
            setAlertModalVisible(false);
          }}
        />
      )}
    </_Screen>
  );
};
