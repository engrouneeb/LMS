import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { RemoveHTML, whiteThemeColors } from '../../../Utilities';
import { _VectorIcons } from '../../../components';
import CommonStyles from '../../CommonStyles';
interface props {
  title: string;
  time: any;
  writerName: string;
  description: string;
}
const Card: React.FC<props> = ({ title, time, writerName, description }) => {
  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{time}</Text>
      </View>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <_VectorIcons
            size={18}
            type={'Ionicons'}
            name={'md-newspaper-outline'}
            color={whiteThemeColors.primary}
          />
          <Text numberOfLines={3} style={styles.titleText}>
            {RemoveHTML(title)}
          </Text>
        </View>
      </View>
      <View style={{ paddingVertical: 10 }}>
        <Text numberOfLines={5} style={styles.description}>
          {RemoveHTML(description)}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Image
          style={styles.img}
          source={require('../../../../assets/TeamPlaceholder.png')}
        />
        <View style={{ marginLeft: 7 }}>
          <Text style={styles.byText}>{'Written by'}</Text>
          <Text style={styles.nameText}>{writerName}</Text>
        </View>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    backgroundColor: whiteThemeColors.white + 90,
    borderRadius: 20,
    minHeight: 100,
    paddingHorizontal: 25,
    paddingVertical: 15,
    marginVertical: 5,
    width: '98%',
    alignSelf: 'center',
  },
  description: {
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.regular,
    textAlign: 'justify',
    fontSize: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    color: whiteThemeColors.black,
    width: '90%',
    marginLeft: 6,
    fontSize: 15,
    textAlign: 'left',
    fontFamily: CommonStyles.fonts.semiBold,
  },
  nameText: {
    color: whiteThemeColors.black,
    fontSize: 12,
    fontFamily: CommonStyles.fonts.regular,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  timeText: {
    color: whiteThemeColors.greyDark + 70,
    lineHeight: 13,
    marginLeft: 4,
    fontSize: 10,
    fontFamily: CommonStyles.fonts.regular,
  },
  byText: {
    color: whiteThemeColors.greyDark + 90,
    fontStyle: 'italic',
    fontSize: 10,
    fontFamily: CommonStyles.fonts.regular,
  },
  headerContainer: {
    marginTop: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  img: {
    borderRadius: 15,
    height: 35,
    width: 35,
  },
  timeContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
    top: 5,
    marginBottom: 5,
  },
});
