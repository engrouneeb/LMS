import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'navigation';
import React, { FC } from 'react';
import { Dimensions } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { whiteThemeColors } from 'utilities';
import { _Screen, _Text, _VectorIcons, _View } from '../../../components';
import DrawerScreens from '../../../navigation/Drawer/DrawerScreenNames';
import { Appstate } from '../../../reducers/Appstate';
import CstHeader from '../../Headers';
import { styles } from './styles';
import { StoreAdminOptionsProps, Tabs } from '../../../interfaces';
import { getUserTabs } from './UserTabs';

const StoreAdminOptions: FC<StoreAdminOptionsProps> = (props) => {
  const navigation: any = useNavigation<NavigationProps>();
  const { storeScreen } = useSelector((state: Appstate) => state.language);
  const { isUserAdmin } = props;
  const windowWidth = Dimensions.get('window').width;
  const userTabs = getUserTabs(isUserAdmin);
  const onAndroidBack = () => {
    navigation.navigate(DrawerScreens.dashboard.name);
    return true;
  };
  return (
    <_Screen
      header={
        <CstHeader
          isBack={false}
          isMenu={true}
          OpenMenu={() => {
            navigation.openDrawer();
          }}
          Screen={storeScreen.Store}
          isLogout={false}
        />
      }
      onAndroidBack={onAndroidBack}
      hideTopSafeArea
      bottomSafeAreaColor={whiteThemeColors.white + 40}
      hideBottomSafeArea
      flex={1}
      backgroundColor={whiteThemeColors.background}
    >
      <FlatList
        bounces={false}
        scrollEnabled={false}
        contentContainerStyle={styles.flatlistContainer}
        data={userTabs}
        numColumns={2}
        keyExtractor={(index) => index.toString()}
        renderItem={({ item }) => (
          <_View style={[styles.cardContainer, { width: windowWidth / 2.2 }]}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(item.navigateTo);
              }}
            >
              <_View style={styles.iconView}>
                <_VectorIcons
                  type={item.type}
                  color={whiteThemeColors.primary}
                  name={item.icon}
                  size={40}
                />
              </_View>
              <_View style={styles.textView}>
                <_Text style={styles.cardText}>{item.name}</_Text>
              </_View>
            </TouchableOpacity>
          </_View>
        )}
      />
    </_Screen>
  );
};

export default StoreAdminOptions;
