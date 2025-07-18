import { CollapsibleInterrace } from '../../../../../interfaces';
import PropsTypes from 'prop-types';
import React, { useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  TouchableHighlight,
  UIManager,
} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import { whiteThemeColors } from '../../../../../Utilities';
import ChallengeSVG from '../../../../../../assets/challengeSVG';
import { _Text, _VectorIcons, _View } from '../../../../../components';

const _Collapsible: React.FC<CollapsibleInterrace> = ({
  content,
  openScreen,
  title,
}) => {
  const [expand, setExpanded] = useState<boolean>(false);

  const animateCard = () => {
    if (
      Platform.OS === 'android' &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
  };
  return (
    <_View style={styles.containerMain}>
      <TouchableHighlight
        underlayColor={whiteThemeColors.greyDark + '20'}
        style={styles.btnContainer}
        onPress={() => {
          animateCard();
          setExpanded(!expand);
        }}
      >
        <_View style={styles.container}>
          <_View style={styles.singleRow}>
            <_View style={styles.svgContainer}>
              <_VectorIcons
                type={Platform.OS === 'ios' ? 'Feather' : 'FontAwesome'}
                name={'sliders'}
                size={16}
                color={whiteThemeColors.primary}
              />
            </_View>
            <_View style={{ flex: 0.9 }}>
              <_Text style={styles.titleTxt}>{title}</_Text>
            </_View>
            <_View style={styles.cardIndicatorContainer}>
              {expand ? (
                <_View
                  style={[
                    styles.svgContainer,
                    { backgroundColor: 'white', marginRight: 5 },
                  ]}
                >
                  <_VectorIcons
                    type={'AntDesign'}
                    name='up'
                    color={whiteThemeColors.primary}
                    size={13}
                  />
                </_View>
              ) : (
                <_View
                  style={[
                    styles.svgContainer,
                    { backgroundColor: 'white', marginRight: 5 },
                  ]}
                >
                  <_VectorIcons
                    type={'AntDesign'}
                    name='down'
                    color={whiteThemeColors.primary}
                    size={13}
                  />
                </_View>
              )}
            </_View>
          </_View>
          {expand ? (
            <_View style={styles.expandedContainer}>
              {content.length > 0 ? (
                content.map((i: any, ind: any) => (
                  <_View
                    key={ind.toString() + i.name}
                    style={{
                      backgroundColor: whiteThemeColors.transparent,
                    }}
                  >
                    <TouchableHighlight
                      underlayColor={whiteThemeColors.greyDark + '20'}
                      key={ind}
                      onPress={() => {
                        openScreen(
                          // ScreensNames.challengeDetail.name,
                          'Challenge Detail',
                          i.id,
                          i.name,
                        );
                      }}
                      style={styles.btnExpandedContainer}
                    >
                      <_View style={styles.expandedSingleRowContainer}>
                        <_View style={styles.expandedRowItemsContainer}>
                          <_View
                            style={{
                              backgroundColor: whiteThemeColors.primary + 30,
                              width: 30,
                              height: 30,
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: 5,
                            }}
                          >
                            <ChallengeSVG size={20} />
                          </_View>

                          <_Text
                            numberOfLines={1}
                            style={styles.expandedItemTxt}
                          >
                            {i.name}
                          </_Text>
                        </_View>
                        <_View style={styles.arrowIcon}>
                          <_VectorIcons
                            type={'AntDesign'}
                            name='right'
                            color={whiteThemeColors.white}
                            size={10}
                          />
                        </_View>
                      </_View>
                    </TouchableHighlight>
                  </_View>
                ))
              ) : (
                <_View style={styles.noExpansionItemsContainer}>
                  <_View style={styles.noExpansionRowContainer}>
                    <_Text style={styles.noExpansionTxt}>
                      No Challenges Found
                    </_Text>
                  </_View>
                </_View>
              )}
            </_View>
          ) : null}
        </_View>
      </TouchableHighlight>
    </_View>
  );
};

_Collapsible.propTypes = {
  title: PropsTypes.string,
  content: PropsTypes.array.isRequired,
  openScreen: PropsTypes.func.isRequired,
};

export const Collapsible = React.memo(_Collapsible);

const styles = StyleSheet.create({
  containerMain: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: whiteThemeColors.white + 90,
    borderRadius: 15,
  },
  btnContainer: {
    justifyContent: 'center',
    minHeight: 65,
    paddingBottom: 5,
    paddingHorizontal: 10,
  },
  container: {
    width: '100%',
    marginTop: 12,
  },
  singleRow: {
    flexDirection: 'row',
    width: '100%',

    alignItems: 'center',
  },
  svgContainer: {
    marginRight: 20,
    marginLeft: 10,
    backgroundColor: whiteThemeColors.primary + 30,
    width: 30,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTxt: {
    fontSize: 14,
    alignSelf: 'flex-start',
    fontFamily: CommonStyles.fonts.regular,
    color: whiteThemeColors.lightBlack,
  },
  cardIndicatorContainer: {
    flex: 0.1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  expandedContainer: {
    width: '100%',
    marginTop: 15,
    backgroundColor: whiteThemeColors.primary + 10,
    borderRadius: 20,
    padding: 15,
  },
  btnExpandedContainer: {
    justifyContent: 'center',
    height: 45,
    paddingHorizontal: 10,

    borderRadius: 10,
    marginVertical: 5,
    borderBottomColor: whiteThemeColors.primary,
    backgroundColor: whiteThemeColors.white + 90,
  },
  expandedSingleRowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  expandedRowItemsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    paddingRight: 10,
  },
  expandedItemTxt: {
    color: whiteThemeColors.primaryTextColor,
    marginLeft: 10,
    fontSize: 12,
    fontFamily: CommonStyles.fonts.light,
  },
  noExpansionItemsContainer: {
    justifyContent: 'center',
    height: 45,
    marginVertical: 2,
    borderBottomColor: whiteThemeColors.primary,
    backgroundColor: whiteThemeColors.white + 90,
    borderRadius: 15,
  },
  noExpansionRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  noExpansionTxt: {
    fontSize: 12,
    color: 'black',
    fontFamily: CommonStyles.fonts.regular,
  },
  arrowIcon: {
    backgroundColor: whiteThemeColors.primary,
    height: 25,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    marginLeft: -10,
  },
});
