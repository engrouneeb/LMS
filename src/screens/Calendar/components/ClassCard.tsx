import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import CommonStyles from 'screens/CommonStyles';
import { whiteThemeColors, isAdmin, isCoordinator, isExecutive } from 'utilities';
import { _Text, _VectorIcons, _View } from '../../../components';
import { ClassCardProps } from '../../../interfaces';
import { useSelector } from 'react-redux';

const ClassCard: FC<ClassCardProps> = ({ item, onPress }) => {
  let { roleName } = useSelector((state: any) => state.User.UserInfo);
  const navigation = useNavigation();
  return (
    <_View style={styles.card}>
      <_View
        style={{
          width: '30%',
          height: 120,
          backgroundColor: whiteThemeColors.white + 90,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <_Text style={styles.timeText}>{`${item?.timeFrom}`}</_Text>
        <_VectorIcons type='Entypo' name='dot-single' color='gray' size={10} />
        <_VectorIcons type='Entypo' name='dot-single' color='gray' size={10} />
        <_VectorIcons type='Entypo' name='dot-single' color='gray' size={10} />

        <_Text style={styles.timeText}>{`${item?.timeTo}`}</_Text>
        {item.isLocalTime && <_Text style={styles.localText}>{`Local`}</_Text>}
      </_View>
      <Pressable onPress={() => onPress(item)}
        style={{
          width: '70%',
          height: 120,
          borderLeftWidth: 3,
          borderLeftColor: whiteThemeColors.primary,
          backgroundColor: whiteThemeColors.primary + 30,
          justifyContent: 'center',
          paddingRight: 40,
        }}
      >
        <_View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <_VectorIcons
            type='Entypo'
            name='dot-single'
            color={whiteThemeColors.primary}
            size={30}
          />
          <_Text numberOfLines={1} style={styles.courseTxt}>
            {`${item?.courseName}`}
          </_Text>
        </_View>
        <_Text numberOfLines={1} style={styles.classText}>
          {`${item?.className}`}
        </_Text>
        {item?.instructorName && (
          <_Text numberOfLines={1} style={styles.instructorText}>
            By
          </_Text>
        )}
        <_Text numberOfLines={1} style={[styles.instructorText]}>
          {item?.instructorName
            ? `${item?.instructorName}`
            : 'No Instructor Assigned'}
        </_Text>
        {item?.isMakeUpClass && (
          <_View style={styles.makeupclassContainer}>
            <_Text
              numberOfLines={1}
              style={[
                styles.instructorText,
                {
                  color: whiteThemeColors.greyDark,
                  marginLeft: 0,
                  fontFamily: CommonStyles.fonts.medium,
                  fontSize: 9,
                  marginTop: 0,
                },
              ]}
            >
              Makeup Class
            </_Text>
          </_View>
        )}
      </Pressable>
      {(isAdmin(roleName) || isExecutive(roleName) || isCoordinator(roleName)) &&
        <Pressable onPress={(e) => {
          e.stopPropagation(); // Prevent TouchableOpacity's onPress
          navigation.navigate("ClassRoster", { classId: item?.classId });
        }} style={{ zIndex: 100, position: "absolute", backgroundColor: whiteThemeColors.white, borderRadius: 8, top: 5, right: 5, height: 30, justifyContent: "center", paddingHorizontal: 5 }}>
          <_Text style={{ size: 8, fontFamily: CommonStyles.fonts.medium }}>Class Roster</_Text>
        </Pressable>
      }
    </_View>
  );
};
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
    justifyContent: 'center',
  },
  cardIcon: {
    backgroundColor: whiteThemeColors.primary,
    height: '100%',
    width: '23%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    backgroundColor: whiteThemeColors.primary + 70,
    height: '100%',
    width: '70%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    paddingRight: 10,
  },
  courseTxt: {
    color: whiteThemeColors.black,
    fontSize: 15,
    fontFamily: CommonStyles.fonts.semiBold,

    textTransform: 'capitalize',
  },
  classText: {
    color: whiteThemeColors.greyDark,
    fontSize: 13,

    fontFamily: CommonStyles.fonts.medium,
    marginLeft: 30,
  },
  instructorText: {
    color: whiteThemeColors.greyDark,
    fontSize: 10,
    fontFamily: CommonStyles.fonts.medium,
    marginLeft: 30,
    marginTop: 5,
  },
  timeText: {
    color: whiteThemeColors.black,
    fontSize: 12,
    fontFamily: CommonStyles.fonts.medium,
    marginLeft: 10,
    paddingVertical: 5,
  },
  localText: {
    color: whiteThemeColors.black,
    fontSize: 9,
    fontFamily: CommonStyles.fonts.regular,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    //   paddingLeft: 10,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  icon: {
    backgroundColor: 'lightgray',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  makeupclassContainer: {
    width: 80,
    height: 20,
    backgroundColor: whiteThemeColors.white + 90,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 25,
    marginTop: 5,
  },
});
export default ClassCard;
