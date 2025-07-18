import React from 'react';
import { FlatList, TouchableHighlight } from 'react-native';
import { whiteThemeColors } from '../../../../../Utilities';
import { Collapsible } from '.';

import { _Text, _View, _VectorIcons } from '../../../../../components';
import Screens from '../../../../../screenNames';
import { styles } from '../styles';
import ChallengeSVG from '../../../../../../assets/challengeSVG';
import { CourseContentListInterface } from '../../../../../interfaces';
import CommonStyles from '../../../../CommonStyles';

export const CourseContentList: React.FC<CourseContentListInterface> = ({
  data,
  openScreen,
  navigation,
}) => {
  return (
    <_View style={styles.safeAView}>
      <FlatList
        style={styles.flatList}
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any) => item.id}
        ItemSeparatorComponent={() => <_View style={{ height: 6 }} />}
        renderItem={({ item, index }) => {
          return item.backlogType === 3 ? (
            <Collapsible
              title={item.name}
              content={item.challenges}
              openScreen={openScreen}
              key={index.toString() + '-'}
              navigation={navigation}
            />
          ) : (
            <_View
              key={index.toString() + '-1'}
              style={{
                borderRadius: 5,
                justifyContent: 'center',
              }}
            >
              <TouchableHighlight
                underlayColor={whiteThemeColors.greyDark + '20'}
                style={styles.stepsBtn}
                onPress={() => {
                  console.log('pressed');
                  // openScreen(Screens.challengeDetail.name, item.id, item.name);
                  openScreen('Challenge Detail', item.id, item.name);
                }}
              >
                <_View style={styles.touleableRowContainer}>
                  <_View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <_View style={styles.svgContainer}>
                      <ChallengeSVG size={23} />
                    </_View>

                    <_View style={{ marginLeft: 10, width: '85%' }}>
                      <_Text
                        numberOfLines={2}
                        style={{
                          fontSize: 13,
                          alignSelf: 'flex-start',
                          color: whiteThemeColors.textColor.lightBlackText,
                          fontFamily: CommonStyles.fonts.regular,
                        }}
                      >
                        {item.name}
                      </_Text>
                    </_View>
                  </_View>
                  <_View
                    style={[
                      styles.svgContainer,
                      { backgroundColor: 'white', marginLeft: -15 },
                    ]}
                  >
                    <_VectorIcons
                      type={'AntDesign'}
                      name='right'
                      color={whiteThemeColors.primary}
                      size={13}
                    />
                  </_View>
                </_View>
              </TouchableHighlight>
            </_View>
          );
        }}
      />
    </_View>
  );
};
