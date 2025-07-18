import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { _Screen } from '../../components';
import { whiteThemeColors } from '../../Utilities';
import screeNames from '../../navigation/Drawer/DrawerScreenNames';
import Header from '../Headers';
import { NewPaymentComponents } from './components';

export const Transactions: React.FC = () => {
  const navigation = useNavigation();

  return (
    <_Screen
      header={
        <Header
          isBack
          goBack={() => navigation.goBack()}
          Screen={screeNames.transactions.name}
        />
      }
      backgroundColor={whiteThemeColors.background}
      onAndroidBack={() => {
        navigation.goBack();
        return true;
      }}
      hideTopSafeArea
      flex={1}
    >
      <NewPaymentComponents pageName='Transaction' />
    </_Screen>
  );
};

export default Transactions;
