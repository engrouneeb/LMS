import { useNavigation } from '@react-navigation/native';
import { WagesItemInterface } from '../../../../../../interfaces';
import React, { useState } from 'react';
import { LayoutAnimation, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { CustomAlert, whiteThemeColors } from '../../../../../../Utilities';
import { loading } from '../../../../../../actions/AsyncStorage';
import { getUserWagesDetail } from '../../../../../../actions/TimeTrackerActions';
import { _View } from '../../../../../../components';
import Screens from '../../../../../../screenNames';
import { SummaryModal } from '../SummaryModal';
import { WageDetailsModal } from '../WageDetailsModal';
import { ExpandedCard, WageCard } from './components';

export const WagesItem: React.FC<WagesItemInterface> = ({ Obj }) => {
  const navigation: any = useNavigation();
  const [expanded, setExpanded] = useState(false);
  const [wageDetailsModal, setWageDetailsModal] = useState(false);
  const [summaryModalVisible, setSummaryModalVisible] = useState(false);
  const [wagesDetails, setWagesDetails] = useState([]);
  const [modalWagesData, setModalWagesData] = useState('');
  const [wagesCompleteDetails, setWagesCompleteDetails] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [firstBtn, setFirstBtn] = useState('');

  const dispatch: any = useDispatch();

  const onCardClicked = (Obj: any) => {
    if (!expanded) {
      fetchData(Obj.userID, Obj.assignmentKey);
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const onSummaryClicked = (visible: any, Obj: any) =>
    fetchData(Obj.userID, Obj.assignmentKey, visible);

  const toggleModal = (visible: any, Obj: any) => {
    setWageDetailsModal(visible);
    setModalWagesData(Obj);
  };

  const handleAlert = (flag: any, title: any, msg: any, _firstBtn = 'OKAY') => {
    setShowAlert(flag);
    setAlertTitle(title);
    setAlertMessage(msg);
    setFirstBtn(_firstBtn);
  };

  const fetchData = (userID: any, assignmentId: any, modalFlag = false) => {
    dispatch(loading(true));

    dispatch(getUserWagesDetail(userID, assignmentId))
      .then((res: any) => {
        if (!res?.error) {
          dispatch(loading(false));
          setWagesCompleteDetails(res.data);
          setWagesDetails(res.data.itemsList);
          setSummaryModalVisible(modalFlag);
        } else {
          handleAlert(
            true,
            'Error',
            'Unable to process your request\nPlease contact your admin',
            'Okay',
          );
        }
      })
      .catch(() => {
        handleAlert(
          true,
          'Error',
          'Unable to process your request\nPlease contact your admin',
          'Okay',
        );
        dispatch(loading(true));
      });
  };

  return (
    <_View style={styles.container}>
      {wageDetailsModal && (
        <WageDetailsModal
          modalVisible={wageDetailsModal}
          setModalVisible={() => setWageDetailsModal(false)}
          wageData={modalWagesData}
        />
      )}
      <SummaryModal
        modalVisible={summaryModalVisible}
        setModalVisible={() => setSummaryModalVisible(false)}
        WageDetails={wagesCompleteDetails}
      />
      <WageCard
        onPressCard={() => {
          navigation.navigate(Screens.wagesInstructor.name, {
            UserId: Obj.userID,
            from: 'WagesAdmin',
            fromAddWage: null,
          });
        }}
        Obj={Obj}
        onPressSummary={() => {
          onSummaryClicked(true, Obj);
        }}
        onPressArrow={() => onCardClicked(Obj)}
        expanded={expanded}
      />

      <ExpandedCard
        wagesDetails={wagesDetails}
        onPressDetails={(item: any) => toggleModal(true, item)}
        expanded={expanded}
      />

      {showAlert && (
        <CustomAlert
          visible={showAlert}
          title={alertTitle}
          msg={alertMessage}
          firstBtn={firstBtn ? firstBtn : 'Okay'}
          firstBtnFunc={() =>
            handleAlert(false, undefined, undefined, undefined)
          }
        />
      )}
    </_View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: whiteThemeColors.white + 90,
    marginVertical: 4,
    alignSelf: 'center',
    borderRadius: 20,
    width: '94%',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
