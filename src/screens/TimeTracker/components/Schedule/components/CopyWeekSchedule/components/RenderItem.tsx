import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { _Text, _VectorIcons, _View } from '../../../../../../../components';
import { CustomAlert, whiteThemeColors } from '../../../../../../../Utilities';
import { styles } from '../style';
import { CopyWeekScheduleRenderItemInterface } from '../../../../../../../interfaces';

export const RenderList: React.FC<CopyWeekScheduleRenderItemInterface> = ({
  item,
  index,
  monthName,
  copyWeekSchedule,
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState<any>();
  const [alertMessage, setAlertMessage] = useState<any>();
  const [startDateIsoStr, setStartDateIsoStr] = useState();
  const [endDateIsoStr, setEndDateIsoStr] = useState();

  const onPressCopy = (item: any) => {
    const { startDateIsoStr, endDateIsoStr } = item;
    setStartDateIsoStr(startDateIsoStr);
    setEndDateIsoStr(endDateIsoStr);
    setShowAlert(!showAlert);
    setAlertMessage('Are you sure you want to copy this week schedule?');
    setAlertTitle('warning');
  };
  return (
    <_View style={styles.cardContainer} key={index}>
      <_View style={[styles.listViewLeftSide]}>
        <_View style={styles.leftListItem}>
          <_Text style={styles.monthText}>{monthName.slice(0, 3)}</_Text>
        </_View>
      </_View>
      <_View flex={1} style={{ marginLeft: 10 }}>
        <_View style={styles.textContainer}>
          <_Text style={styles.cardTitleTxt}>Schedule Week</_Text>
          <_Text style={styles.datesText}>
            {`${item.startDate} - ${item.endDate}`}
          </_Text>
        </_View>
      </_View>
      <_View style={styles.listViewRightSide}>
        <_View style={{ flexDirection: 'row' }}>
          <Pressable
            style={styles.copyButton}
            onPress={() => onPressCopy(item)}
          >
            <_VectorIcons
              type='MaterialIcons'
              name='content-copy'
              color={whiteThemeColors.primary}
              size={20}
            />
          </Pressable>
        </_View>
      </_View>
      {showAlert && (
        <CustomAlert
          visible={showAlert}
          title={alertTitle}
          msg={alertMessage}
          firstBtn={'Copy'}
          firstBtnFunc={() => {
            copyWeekSchedule(startDateIsoStr, endDateIsoStr);
            setShowAlert(false);
          }}
          secondBtn={'Cancel'}
          secondBtnFunc={() => setShowAlert(false)}
        />
      )}
    </_View>
  );
};
