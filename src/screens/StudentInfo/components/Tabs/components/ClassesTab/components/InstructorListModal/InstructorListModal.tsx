import React from 'react';
import { FlatList, Modal, TouchableOpacity } from 'react-native';
import { whiteThemeColors } from '../../../../../../../../Utilities';
import { InstructorDiscSvg } from '../../../../../../../../../assets/Icons';
import {
  _Text,
  _VectorIcons,
  _View,
  isTablet,
} from '../../../../../../../../components';
import { UserImg } from '../../../../../../../ThumbNail';
import { styles } from './styles';
import CommonStyles from '../../../../../../../../screens/CommonStyles';
interface props {
  modalVisible: boolean;
  setModalVisible: (isvisble: boolean) => void;
  instructorList: any;
}
export const InstructorListModal: React.FC<props> = ({
  modalVisible,
  setModalVisible,
  instructorList,
}) => {
  const RenderInstructorList = ({ item, id }: any) => {
    return (
      <_View key={id + '--'} style={styles.list}>
        <_View style={styles.ListItem}>
          <UserImg
            UserInfo={{
              FirstName: item.trim(),
              LastName: item.trim(),
              UserImage: '',
              UserImageColor: whiteThemeColors.primary,
            }}
            size={isTablet ? 60 : 45}
          />
          <_Text numberOfLines={1} style={styles.nameText}>
            {item}
          </_Text>
        </_View>
      </_View>
    );
  };

  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      animationType='fade'
      transparent={true}
      visible={modalVisible}
    >
      <_View style={styles.centeredView}>
        <_View style={styles.modalView}>
          <_View style={styles.headerContainer}>
            <_Text style={styles.headText}>Instructors List</_Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.crossIcon}
            >
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
            {Boolean(instructorList.length > 0) ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={instructorList}
                renderItem={RenderInstructorList}
                style={styles.flatList}
              />
            ) : (
              <_View style={styles.emptyList}>
                <InstructorDiscSvg
                  style={{ zIndex: 1 }}
                  size={100}
                  color={whiteThemeColors.primary}
                />
                <_Text
                  style={{
                    marginTop: 20,
                    color: whiteThemeColors.primary,
                    fontFamily: CommonStyles.fonts.medium,
                  }}
                >
                  No Instructors are found
                </_Text>
              </_View>
            )}
          </_View>
        </_View>
      </_View>
    </Modal>
  );
};
