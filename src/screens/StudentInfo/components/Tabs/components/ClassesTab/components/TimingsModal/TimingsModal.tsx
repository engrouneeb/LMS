import moment from 'moment';
import React from 'react';
import { Modal, ScrollView, TouchableOpacity } from 'react-native';
import { whiteThemeColors } from '../../../../../../../../Utilities';
import { _Text, _VectorIcons, _View } from '../../../../../../../../components';
import { styles } from './styles';
import CommonStyles from '../../../../../../../../screens/CommonStyles';
import { ClassDaysTiming } from '../../../../../../../../interfaces';
interface props {
  modalVisible: boolean;
  setModalVisible: (isvisble: boolean) => void;
  classDaysTimingList: ClassDaysTiming[];
  name: string;
}
export const TimingsModal: React.FC<props> = ({
  modalVisible,
  setModalVisible,
  classDaysTimingList,
  name,
}) => {
  const weekDays = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];
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
            <_Text style={styles.headText}>Timings</_Text>
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
            <_View style={styles.timingContainer}>
              <_VectorIcons
                type={'Entypo'}
                name='clock'
                size={80}
                color={whiteThemeColors.primaryDark + 10}
              />
            </_View>
            {classDaysTimingList.length > 0 &&
              classDaysTimingList.map((timeSlot) => {
                return (
                  <>
                    <_View style={styles.startDateView}>
                      <_Text style={[styles.headerText, {}]}>
                        {timeSlot.timingLists}
                      </_Text>
                    </_View>

                    <_View
                      flexDirection='row'
                      justifyContent='center'
                      marginTop={10}
                    >
                      {weekDays.map((day: string, dayIndex: number) => {
                        const isSelected =
                          timeSlot.dayTimeSubLists[0]?.formattedDays.includes(
                            day
                          );
                        return (
                          <_View
                            key={`day-${dayIndex}`}
                            style={[
                              styles.days,
                              {
                                backgroundColor: isSelected
                                  ? `${whiteThemeColors.primary}90`
                                  : whiteThemeColors.white,
                              },
                              !isSelected && {
                                borderColor: whiteThemeColors.primary,
                                borderWidth: 0.5,
                              },
                            ]}
                          >
                            <_Text
                              style={{
                                fontSize: 11,
                                fontFamily: CommonStyles.fonts.medium,
                                color: isSelected
                                  ? whiteThemeColors.white
                                  : whiteThemeColors.black,
                              }}
                            >
                              {day}
                            </_Text>
                          </_View>
                        );
                      })}
                    </_View>
                  </>
                );
              })}
          </_View>
        </_View>
      </_View>
    </Modal>
  );
};
