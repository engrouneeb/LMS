import { CourseDetailInterface } from '../../../../interfaces';
import PropTypes from 'prop-types';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {
  FlatList,
  LayoutAnimation,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  UIManager,
} from 'react-native';
import { useSelector } from 'react-redux';
import { whiteThemeColors } from '../../../../Utilities';
import { _Text, _VectorIcons, _View } from '../../../../components';
import { Appstate } from '../../../../reducers/Appstate';
import Headers from '../../../Headers';
import CommonStyles from '../../../CommonStyles';

const discardAttr = {
  attrType1: 65,
  attrType2: 44,
  attrType3: 2,
};

const _CourseDetails: React.FC<CourseDetailInterface> = ({
  changeVisibleState,
  courseFields,
  isCourseVisible,
}) => {
  const [coursefields, setCourseFields] = useState<any>([]);
  const { classDetialScreen } = useSelector(
    (state: Appstate) => state.language,
  );

  useEffect(() => {
    // if (visible === false) return;
    const arr = [];
    const cf: any = courseFields;
    for (let i = 0; i < cf.length; i++) {
      if (
        cf[i].attrType !== discardAttr.attrType1 &&
        cf[i].attrType !== discardAttr.attrType2 &&
        cf[i].attrType !== discardAttr.attrType3
      ) {
        arr.push(cf[i]);
      }
    }
    setCourseFields(arr);
  }, [isCourseVisible]);
  const RenderCollapsibleList = ({ item }: any) => {
    return (
      <_View style={DetailsStyle.signleTagContainer}>
        <_View style={DetailsStyle.singleTagSubContainer}>
          <_Text style={[DetailsStyle.itemValue, { fontSize: 10 }]}>
            {item}
          </_Text>
        </_View>
      </_View>
    );
  };

  const RenderCategoryTags: ({
    label,
    list,
  }: {
    label: string;
    list: any;
  }) => React.JSX.Element = ({ label, list }) => {
    const [showFullList, setShowFullList] = useState(false);
    const [data, setData] = useState(list.split(',').splice(0, 3));
    const isExtendable = list.split(',').length <= 3 ? false : true;

    const animatedCard = () => {
      if (
        Platform.OS === 'android' &&
        UIManager.setLayoutAnimationEnabledExperimental
      ) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    };

    const handleOnPress = () => {
      animatedCard();
      if (!showFullList) {
        setData(list.split(','));
      } else {
        setData(list.split(',').splice(0, 3));
      }
      setShowFullList((prevState) => !prevState);
    };

    return (
      <_View
        style={[
          DetailsStyle.categoryTagsContainer,
          {
            paddingBottom: isExtendable ? 25 : 0,
          },
        ]}
      >
        <_View style={DetailsStyle.titleContainer}>
          <_Text numberOfLines={2} style={DetailsStyle.titleTxt}>
            {label}
          </_Text>
        </_View>
        <TouchableOpacity
          disabled={!isExtendable}
          activeOpacity={0.9}
          onPress={() => handleOnPress()}
          style={{
            width: '100%',
            paddingVertical: 10,
          }}
        >
          <FlatList
            data={data}
            contentContainerStyle={DetailsStyle.flatListStyle}
            renderItem={({ item }) => <RenderCollapsibleList item={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </TouchableOpacity>

        {isExtendable ? (
          <TouchableOpacity
            onPress={handleOnPress}
            style={DetailsStyle.extendableIconContainer}
          >
            <_VectorIcons
              type={'MaterialCommunityIcons'}
              name={showFullList ? 'chevron-up' : 'chevron-down'}
              size={25}
              color={whiteThemeColors.white}
            />
          </TouchableOpacity>
        ) : null}
      </_View>
    );
  };

  return (
    <Modal
      animationType='slide'
      visible={isCourseVisible}
      onRequestClose={changeVisibleState}
      supportedOrientations={['portrait', 'landscape']}
    >
      <Headers
        isBack={true}
        Screen={classDetialScreen.Details}
        GoBack={() => changeVisibleState()}
      />
      <_View style={DetailsStyle.contentView}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <_View style={DetailsStyle.courseFiledWrapper}>
            {coursefields.map((field: any, index: number) =>
              !['', null, undefined].includes(field.fieldValue) ? (
                <>
                  {field.fielLabel.toLowerCase() == 'category' ? (
                    <RenderCategoryTags
                      label={field.fielLabel}
                      list={field?.fieldValue}
                    />
                  ) : (
                    <_View
                      style={[DetailsStyle.itemView]}
                      key={index.toString() + field.fielLabel}
                    >
                      <_View style={DetailsStyle.itemLableView}>
                        <_Text numberOfLines={2} style={DetailsStyle.itemLable}>
                          {field.fielLabel}
                        </_Text>
                      </_View>
                      <_View style={DetailsStyle.itemValueView}>
                        <_Text numberOfLines={2} style={DetailsStyle.itemValue}>
                          {field.fieldValue.toLowerCase() === 'true'
                            ? 'Checked'
                            : field.fieldValue.toLowerCase() === 'false'
                              ? 'Unchecked'
                              : field.fieldValue}
                        </_Text>
                      </_View>
                    </_View>
                  )}
                </>
              ) : null,
            )}
          </_View>
        </ScrollView>
      </_View>
    </Modal>
  );
};

_CourseDetails.propTypes = {
  changeVisibleState: PropTypes.func.isRequired,
  courseFields: PropTypes.array,
};

export const CourseDetails = React.memo(_CourseDetails);

const DetailsStyle = StyleSheet.create({
  contentView: {
    width: '100%',
    height: '100%',
    backgroundColor: whiteThemeColors.background,
    paddingBottom: 80,
  },
  itemView: {
    flexDirection: 'row',
    marginVertical: 5,
    paddingLeft: 20,
    paddingVertical: 12,
    backgroundColor: whiteThemeColors.primary + 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  itemLableView: {
    width: '30%',
    paddingVertical: 5,
  },
  itemLable: {
    fontSize: 11,
    alignItems: 'flex-start',
    textTransform: 'capitalize',
    color: whiteThemeColors.black,
    marginRight: 10,
    fontFamily: CommonStyles.fonts.regular,
  },
  itemValueView: {
    width: '70%',
    flexDirection: 'row',
    paddingRight: 5,
  },
  itemValue: {
    fontSize: 12,
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.regular,
  },
  scrollView: {
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollStyle: {
    width: '100%',
    height: '100%',
  },
  scrollViewContentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: 5,
    paddingTop: 20,
    paddingBottom: 80,
  },
  courseFiledWrapper: {
    justifyContent: 'center',
    backgroundColor: whiteThemeColors.white + 90,
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 40,
    paddingHorizontal: 10,
    margin: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  signleTagContainer: {
    alignSelf: 'center',
  },
  singleTagSubContainer: {
    marginRight: 5,
    backgroundColor: whiteThemeColors.white,
    padding: 8,
    borderRadius: 7,
    marginVertical: 3,
    paddingHorizontal: 10,
  },
  categoryTagsContainer: {
    flexDirection: 'column',
    marginVertical: 5,
    paddingLeft: 10,
    paddingVertical: 10,
    backgroundColor: whiteThemeColors.primary + 10,
    borderRadius: 10,
  },
  titleContainer: {
    width: '100%',
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  titleTxt: {
    fontSize: 11,
    alignItems: 'flex-start',
    textTransform: 'capitalize',
    color: whiteThemeColors.black,
    marginRight: 10,
    fontFamily: CommonStyles.fonts.regular,
  },
  flatListStyle: {
    marginHorizontal: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  extendableIconContainer: {
    position: 'absolute',
    right: 10,
    bottom: 5,
    backgroundColor: whiteThemeColors.primary + 30,
    borderRadius: 4,
  },
});
