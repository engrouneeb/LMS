import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Text, _VectorIcons, _View } from '../../../../../components';
import { DiscussionCard } from './DiscussionCard';
interface props {
  selectedCourse: any;
}
const DiscussionModal: React.FC<props> = ({ selectedCourse }) => {
  return (
    <_View
      style={{
        width: '100%',
      }}
    >
      <_View
        style={{
          width: '100%',
          padding: 5,
          paddingBottom: 15,
          backgroundColor: whiteThemeColors.white + 90,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <FlatList
          data={selectedCourse.centerFeedback.concat(
            selectedCourse.studentFeedback
          )}
          contentContainerStyle={{ flex: 1 }}
          renderItem={({ item, index }) => (
            <DiscussionCard Obj={item} index={index} />
          )}
          ItemSeparatorComponent={() => (
            <_View style={styles.ItemSeparatorComponent} />
          )}
          ListEmptyComponent={() => (
            <_View style={styles.emptyListContainer}>
              <_VectorIcons
                type={'MaterialCommunityIcons'}
                name={'comment-alert'}
                size={40}
                color={whiteThemeColors.primary + 90}
              />
              <_Text style={styles.noCommentsFound}>No Feedback Found</_Text>
            </_View>
          )}
        />
      </_View>
    </_View>
  );
};

export { DiscussionModal };

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(54,54,54,0.4)',
  },
  modalView: {
    height: '80%',
    backgroundColor: whiteThemeColors.primaryDark,
    width: '100%',
    borderRadius: 10,
    paddingTop: 10,
  },
  headText: {
    color: whiteThemeColors.white,
    fontSize: 16,
  },
  headerContainer: {
    width: '100%',
    height: '6%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  crossIcon: {
    backgroundColor: whiteThemeColors.white,
    borderRadius: 4,
  },
  innerContainer: {
    backgroundColor: whiteThemeColors.background,
    width: '100%',
    height: '94%',
    borderRadius: 10,
  },
  shadow: {
    shadowColor: whiteThemeColors.greyDark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  renderItemCard: {
    width: '100%',
    backgroundColor: whiteThemeColors.primary + 20,
    borderRadius: 10,
    padding: 10,
  },
  userImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 40,
  },
  innerCard: {
    justifyConter: 'center',
    marginLeft: 2,
  },
  name: {
    marginLeft: 10,
    fontSize: 17,
    color: whiteThemeColors.primary,
  },
  dateTime: {
    marginLeft: 10,
    fontSize: 10,
    color: whiteThemeColors.greyDark,
    marginTop: 3,
  },
  feedBackContainer: {
    paddingVertical: 4,
    paddingHorizontal: 5,
  },
  feedBack: {
    fontSize: 13,
    color: whiteThemeColors.black,
    textAlign: 'left',
  },
  extend: {
    marginHorizontal: 5,
    fontSize: 11,
    color: whiteThemeColors.greyDark,
    textAlign: 'left',
  },
  classNameContainer: {
    width: '96%',
    height: 70,
    backgroundColor: whiteThemeColors.white,
    alignSelf: 'center',
    marginTop: 15,

    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
  },
  className: {
    fontSize: 13,
    color: whiteThemeColors.black,

    textTransform: 'capitalize',
    marginLeft: 10,
    width: '60%',
  },
  flatListContainer: {
    width: '96%',
    height: '100%',
    alignSelf: 'center',
    paddingVertical: 2,
    paddingHorizontal: 5,
    backgroundColor: whiteThemeColors.white,
  },
  emptyListContainer: {
    width: '97%',
    alignSelf: 'center',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: whiteThemeColors.white,
    borderRadius: 10,
  },
  noCommentsFound: {
    fontSize: 12,
    color: whiteThemeColors.greyDark,

    marginTop: 5,
  },
  ItemSeparatorComponent: { height: 10 },
});
