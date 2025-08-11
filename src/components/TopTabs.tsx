import React, { FC, useEffect, useState } from 'react';
import { _View, _Text, _VectorIcons } from './index';
import {
  whiteThemeColors,
  CustomAlert,
  TerminologyMap,
  getTerminologyLabel,
} from '../Utilities';
import { TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
//import { getSelectedTab } from '../screens/Store/StoreHome/helper';
import { TopTabsInterfaces, TabTypes } from '../interfaces';
import CommonStyles from "../screens/CommonStyles";
export const TopTabs: FC<TopTabsInterfaces> = ({
  activeTab,
  setActiveTab,
  tabs,
  cartItems = [],
  showTabName = false,
  isDisable = false,
  showIcon = true,
  setitem,
}) => {
  const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);
  const [alertText, setAlertText] = useState<string>('');
  const dispatch = useDispatch();
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
  const onPressTab = (tab: TabTypes, index: number) => {
    setitem!([]);
    if (index > 0 && isDisable) {
      setAlertModalVisible(true);
      setAlertText('Kindly save changes before proceeding to next step');
    } else {
      if (cartItems.length >= 1) {
        setAlertModalVisible(true);
        setAlertText(
          `You have already added item(s) in cart from this ${terminologies['Category(Event)']?.label},Please remove or pay for those item(s) to proceed.`,
        );
      } else {
        setActiveTab!(tab);
      //dispatch(getSelectedTab(tab.id));
      }
    }
  };  
  return (
    <_View>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.scrollContainer}
        centerContent={true}
        showsHorizontalScrollIndicator={false}
        style={styles.topView}
      >
        {tabs?.map((tab: any, index: number) => (          
          <TouchableOpacity
            disabled={activeTab?.name === tab?.name}
            key={tab?.name}
            activeOpacity={0.6}
            style={[
              styles.topViewButton,
              {
                backgroundColor:
                  activeTab?.name === tab?.name
                    ? whiteThemeColors.primary
                    : whiteThemeColors.white + 90,
                // width: showTabName ? 120 : 65,
                padding: showTabName ? 18 : 22,
                borderRadius: showTabName ? 20 : 60,
              },
            ]}
            onPress={() => onPressTab(tab, index)}
          >
            {showIcon && (
              <_VectorIcons
                type='MaterialCommunityIcons'
                name={tab.icon ? tab.icon : 'storefront'}
                size={20}
                color={
                  activeTab?.name === tab?.name
                    ? whiteThemeColors.white
                    : whiteThemeColors.primary
                }
              />
            )}
            {showTabName && (
              <_Text
                numberOfLines={1}
                style={{
                  fontSize: 10,
                  fontFamily: CommonStyles.fonts.medium,
                  paddingHorizontal: 10,
                  color:
                    activeTab?.name == tab?.name
                      ? whiteThemeColors.white
                      : whiteThemeColors.primary,
                }}
              >
                {tab?.name}
              </_Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      {alertModalVisible && (
        <CustomAlert
          visible={alertModalVisible}
          title={'Error'}
          msg={alertText}
          firstBtn={'Okay'}
          firstBtnFunc={() => {
            setAlertModalVisible(false);
          }}
        ></CustomAlert>
      )}
    </_View>
  );
};

const styles = StyleSheet.create({
  topView: {
    width: '100%',
    paddingBottom: 15,
  },
  topViewButton: {
    marginBottom: 8,
    backgroundColor: whiteThemeColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  scrollContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});
