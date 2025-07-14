import React, { memo } from 'react';
import { Pressable, TouchableHighlight, TouchableOpacity } from 'react-native';
import {
  isAdmin,
  isCoordinator,
  isExecutive,
  isInstructor,
  whiteThemeColors,
} from 'utilities';
import { _VectorIcons, _View } from '../../../../../components';
import { styles } from '../styles';
import CardBottom from './CardBottom';
import { _selectCategory } from './CategorySelection';
import { RenderImage } from './CourseImage';
import { IosMenu } from './IosMenu';
const defaultImgPath = '/Content/Images/courseImage.png';

const _RenderCard = (props: any) => {
  return (
    <_View
      style={{
        ...styles.cardContainer,
        width: props?.orienation === 'PORTRAIT' ? '100%' : '50%',
        padding: props?.orienation === 'PORTRAIT' ? 0 : 3,
        margin: props?.orienation === 'PORTRAIT' ? 3 : 0,
      }}
    >
      <TouchableHighlight
        underlayColor={whiteThemeColors.primary + '50'}
        onPress={() => {
          props.handelPopUpMenu(false, 0);
          props.onSelectCourse(
            props.item.courseId,
            props.item.courseName,
            props.item.courseImage,
          );
        }}
        style={{
          ...styles.cardSubContainer,
          width: props?.orienation === 'PORTRAIT' ? '96%' : '98%',
        }}
      >
        <TouchableHighlight
          underlayColor={whiteThemeColors.primary + '50'}
          onPress={() => {
            props.handelPopUpMenu(false, 0);
            props.onSelectCourse(
              props.item.courseId,
              props.item.courseName,
              props.item.courseImage,
            );
          }}
          style={{
            ...styles.cardSubContainer,
            width: props?.orientation === 'PORTRAIT' ? '96%' : '98%',
          }}
        >
          <_View style={styles.view}>
            <Pressable
              onPress={() => {
                props.onSelectCourse(
                  props.item.courseId,
                  props.item.courseName,
                  props.item.courseImage,
                );
              }}
              style={styles.imgView}
            >
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
            <_View
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
              }}
            >
              <_VectorIcons
                name='right'
                type='AntDesign'
                color={whiteThemeColors.icons.white}
                size={15}
              />
            </_View>

            <_View style={styles.popupMenu}>
              {isAdmin(props.role) ||
              isInstructor(props.role) ||
              isCoordinator(props.role) ||
              isExecutive(props.role) ? (
                <TouchableOpacity
                  style={styles.eclipse}
                  hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                  onPress={() => {
                    if (
                      props.isPopUpShown &&
                      props.selectedCourseId == props.item.courseId
                    ) {
                      props.handelPopUpMenu(false, props.item.courseId);
                    } else {
                      props.handelPopUpMenu(true, props.item.courseId);
                    }
                  }}
                >
                  <_View
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: whiteThemeColors.primary + 30,
                      position: 'absolute',
                      top: 13,
                      right: 11,
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <_VectorIcons
                      name='dots-three-vertical'
                      type='Entypo'
                      size={16}
                      color={whiteThemeColors.white}
                    />
                  </_View>
                </TouchableOpacity>
              ) : null}
            </_View>
            <IosMenu
              header={props?.header}
              item={props.item}
              selectCategory={(id: number, index: number) => {
                _selectCategory(id, index, props);
              }}
              handelPopUpMenu={props.handelPopUpMenu}
              display={
                props.isPopUpShown &&
                props.selectedCourseId == props.item.courseId
                  ? 'flex'
                  : 'none'
              }
            />
          </_View>
        </TouchableHighlight>
      </TouchableHighlight>
    </_View>
  );
};
export const RenderCard = memo(_RenderCard);
