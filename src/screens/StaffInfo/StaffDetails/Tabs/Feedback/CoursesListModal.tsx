import React, { useState } from 'react';
import {
  FlatList,
  LayoutAnimation,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  UIManager,
} from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Text, _VectorIcons, _View } from '../../../../../components';
import { DiscussionModal } from './DiscussionModal';
import CommonStyles from 'screens/CommonStyles';
interface props {
  selectedCourse: any;
  modalVisible: boolean;
  setModalVisible: (isvisble: boolean) => void;
}
export const CoursesListModal: React.FC<props> = ({
  selectedCourse,
  modalVisible,
  setModalVisible,
}) => {
  const onCloseModal = () => {
    setModalVisible(false);
  };

  const RenderCourseItem = ({ item }: any) => {
    const [collapsed, setCollapsed] = useState(-1);
    const handleCollapsiable = (id: any) => {
      if (id == collapsed) {
        setCollapsed(-1);
      } else {
        setCollapsed(id);
      }
      if (
        Platform.OS === 'android' &&
        UIManager.setLayoutAnimationEnabledExperimental
      ) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    };
    return (
      <_View style={{ paddingHorizontal: 10 }}>
        <TouchableOpacity
          onPress={() => handleCollapsiable(item?.classId)}
          style={[
            styles.courseItemContainer,
            styles.shadow,
            {
              paddingBottom: item?.classId == collapsed ? 15 : 30,
              borderBottomLeftRadius: item?.classId == collapsed ? 0 : 10,
              borderBottomRightRadius: item?.classId == collapsed ? 0 : 10,
            },
          ]}
          activeOpacity={9}
        >
          <_View style={{ position: 'relative', top: 10, left: 10, right: 10 }}>
            {/* <_Text numberOfLines={2} style={styles.className}>
              {item?.courseLevelName}
            </_Text> */}
          </_View>
          <_View style={styles.calssNameContainer}>
            <_Text numberOfLines={2} style={styles.className}>
              {item?.className}
            </_Text>
            <_View style={styles.iconContainer}>
              <_VectorIcons
                type={'MaterialCommunityIcons'}
                name={
                  collapsed == item?.classId ? 'chevron-up' : 'chevron-down'
                }
                size={25}
                color={whiteThemeColors.white}
              />
            </_View>
          </_View>
        </TouchableOpacity>

        {collapsed == item?.classId ? (
          <DiscussionModal selectedCourse={item} />
        ) : null}
      </_View>
    );
  };

  return (
    <Modal
      transparent
      supportedOrientations={['portrait', 'landscape']}
      animationType='fade'
      visible={modalVisible}
    >
      <_View style={styles.centeredView}>
        <_View style={styles.headerContainer}>
          <_Text style={styles.headText}>Courses List</_Text>
          <TouchableOpacity onPress={onCloseModal} style={styles.crossIcon}>
            <_VectorIcons
              type={'Entypo'}
              name='cross'
              size={15}
              color={whiteThemeColors.black}
              style={{ padding: 5 }}
            />
          </TouchableOpacity>
        </_View>
        <_View style={styles.innerContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={selectedCourse}
            ListHeaderComponent={() => <_View style={{ height: 10 }} />}
            ListFooterComponent={() => <_View style={{ height: 10 }} />}
            ItemSeparatorComponent={() => <_View style={{ height: 15 }} />}
            renderItem={({ item }) => <RenderCourseItem item={item} />}
          />
        </_View>
      </_View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Platform.OS == 'ios' ? StatusBar?.currentHeight + 40 : 0,
  },
  modalView: {
    height: '100%',
    backgroundColor: whiteThemeColors.background,
    width: '100%',

    paddingTop: 10,
  },
  courseItemContainer: {
    width: '100%',
    backgroundColor: whiteThemeColors.white + 90,
    alignItems: 'center',
    paddingRight: 10,
    marginHorizontal: 5,
    alignSelf: 'center',
    borderRadius: 15,
    flexDirection: 'row',
    paddingVertical: 30,
  },
  headText: {
    color: whiteThemeColors.primary,
    fontSize: 18,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  headerContainer: {
    width: '100%',
    backgroundColor: whiteThemeColors.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  crossIcon: {
    backgroundColor: whiteThemeColors.primary + 30,
    borderRadius: 4,
  },
  innerContainer: {
    backgroundColor: whiteThemeColors.background,
    width: '100%',
    flex: 1,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },

  shadow: {
    shadowColor: whiteThemeColors.background,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  calssNameContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 5,
    paddingHorizontal: 10,
  },
  className: {
    color: whiteThemeColors.primary,
    width: '83%',
    textTransform: 'capitalize',
    fontFamily: CommonStyles.fonts.medium,
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: whiteThemeColors.primary + 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
