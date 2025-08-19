import React, {memo} from 'react';
import {
  Pressable,
  TouchableHighlight,
  TouchableOpacity,
  View, // Use RN View directly here to avoid nesting problems
  
} from 'react-native';
import {
  isAdmin,
  isCoordinator,
  isExecutive,
  isInstructor,
  whiteThemeColors,
} from '../../../../../Utilities';
import {_VectorIcons} from '../../../../../components';
import {styles} from '../styles';
import CardBottom from './CardBottom';
import {_selectCategory} from './CategorySelection';
import {RenderImage} from './CourseImage';
import {IosMenu} from './IosMenu';

const defaultImgPath = '/Content/Images/courseImage.png';

const _RenderCard = (props: any) => {
  const cardWidth = props?.orienation === 'PORTRAIT' ? '100%' : '50%';
  const subWidth = props?.orienation === 'PORTRAIT' ? '96%' : '98%';

  return (
    <View
      style={{
        ...styles.cardContainer,
        width: cardWidth,
        padding: props?.orienation === 'PORTRAIT' ? 0 : 3,
        margin: props?.orienation === 'PORTRAIT' ? 3 : 0,
      }}>
      <TouchableHighlight
        underlayColor={whiteThemeColors.primary + '50'}
        onPress={() => {
          props.onSelectCourse(
            props.item.courseId,
            props.item.courseName,
            props.item.courseImage,
          );
        }}
        style={{
          ...styles.cardSubContainer,
          width: subWidth,
        }}>
        <View style={styles.view}>
          <Pressable
            onPress={() => {
              props.onSelectCourse(
                props.item.courseId,
                props.item.courseName,
                props.item.courseImage,
              );
            }}
            style={styles.imgView}>
            <RenderImage
              imgType={
                props.item.courseImage === null ||
                props.item.courseImage === defaultImgPath
                  ? 'defaultImage'
                  : 'url'
              }
              image={
                props.item.courseImage === defaultImgPath ||
                props.item.courseImage === null ||
                props.item.courseImage === undefined
                  ? require('../../../../../../assets/courseDefault.jpg')
                  : props.item.courseImage
              }
            />
          </Pressable>

          <CardBottom
            item={props.item}
            onPress={() => props.onSelectCourse(props.item.courseId)}
          />

          <View
            style={{
              width: 30,
              height: 30,
              backgroundColor: whiteThemeColors.primary + 30,
              position: 'absolute',
              bottom: 13,
              right: 13,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <_VectorIcons
              name="right"
              type="AntDesign"
              color={whiteThemeColors.icons.white}
              size={15}
            />
          </View>

          {isAdmin(props.role) ||
          isInstructor(props.role) ||
          isCoordinator(props.role) ||
          isExecutive(props.role) ? (
            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
                backgroundColor: whiteThemeColors.primary + 30,
                position: 'absolute',
                top: 10,
                right: 13,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
              onPress={() => {
                const {selectedCourseId, item, isPopUpShown} = props;
                const isSelected = selectedCourseId === item.courseId;
                props.handelPopUpMenu(
                  !isSelected || !isPopUpShown,
                  item.courseId,
                );
              }}>
              <_VectorIcons
                name="dots-three-vertical"
                type="Entypo"
                size={16}
                color={whiteThemeColors.white}
              />
            </TouchableOpacity>
          ) : null}

          <IosMenu
            header={props?.header}
            item={props.item}
            selectCategory={(id: number, index: number) => {
              _selectCategory(id, index, props);
            }}
            handelPopUpMenu={props.handelPopUpMenu}
            display={
              props.isPopUpShown &&
              props.selectedCourseId === props.item.courseId
                ? 'flex'
                : 'none'
            }
          />
        </View>
      </TouchableHighlight>
    </View>
  );
};

export const RenderCard = memo(_RenderCard);
