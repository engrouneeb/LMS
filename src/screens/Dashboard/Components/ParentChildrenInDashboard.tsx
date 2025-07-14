import React, { FC, useRef } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Image, _Text, _VectorIcons, _View } from '../../../components';
import { Dimensions } from 'react-native';
import CommonStyles from 'screens/CommonStyles';

interface props {
  children: any[];
  onSelect: (item: any) => void;
  active?: string;
  setactive: (value: string) => void;
}
export const ParentChildrenInDashboard: FC<props> = ({
  children,
  onSelect,
  active,
  setactive,
}) => {
  const tabRef: any = useRef();
  const scrollToElement = (index: number) => {
    tabRef.current.scrollTo({ x: index * 100, animated: true });
  };
  return (
    children.length > 0 && (
      <_View style={styles.main}>
        <ScrollView
          ref={tabRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.childrenContainer}
        >
          {children.map((item: any, index: number) => {
            return (
              <Pressable
                style={[
                  styles.ChildIcon,
                  {
                    backgroundColor:
                      active === item?.name ? whiteThemeColors.primary : null,
                  },
                ]}
                onPress={() => {
                  scrollToElement(index);
                  onSelect(item);
                  setactive(item?.name);
                }}
              >
                {item?.image ? (
                  <_Image uri={item?.image} style={styles.profileImage} />
                ) : (
                  <_VectorIcons
                    name={'user-circle'}
                    type={'FontAwesome'}
                    color={
                      active === item?.name
                        ? whiteThemeColors.white
                        : whiteThemeColors.primary
                    }
                    size={20}
                  />
                )}
                <_Text
                  style={[
                    styles.ChildName,
                    {
                      color:
                        active === item?.name
                          ? whiteThemeColors.white
                          : whiteThemeColors.primary,
                      fontFamily: CommonStyles.fonts.medium,
                    },
                  ]}
                >
                  {item?.name}
                </_Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </_View>
    )
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'flex-start',
    width: Dimensions.get('window').width - 20,
    alignSelf: 'center',
    backgroundColor: whiteThemeColors.background + 40,
    borderRadius: 10,
    justifyContent: 'center',
  },
  childrenContainer: {
    alignItems: 'center',
    // paddingRight: 10,
    justifyContent: 'flex-start',
    paddingVertical: 2,
  },
  ChildIcon: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    padding: 8,
    paddingRight: 5,
    borderRadius: 8,
  },
  ChildName: {
    marginLeft: 5,
    fontSize: 11,
    marginTop: 4,
    paddingRight: 10,
  },
  profileImage: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
});
