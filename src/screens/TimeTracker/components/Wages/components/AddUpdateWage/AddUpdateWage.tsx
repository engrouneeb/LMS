import { useNavigation } from '@react-navigation/native';
import { AddUpdateWageInterface } from '../../../../../../interfaces';
import React, { useEffect, useReducer, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { Appstate } from '../../../../../../reducers/Appstate';
import {
  CustomAlert,
  DateTimePickerIos,
  convertUTCDateToLocalDateStringFormat,
  isAdmin,
  whiteThemeColors,
} from '../../../../../../Utilities';
import { addWages } from '../../../../../../actions/TimeTrackerActions';
import { _Screen, _View } from '../../../../../../components';
import Screens from '../../../../../../screenNames';
import CstHeader from '../../../../../Headers';
import {
  checkInputs,
  getWageFromValue,
  getWageTypeValue,
  handleSetWageType,
  isWageAlreadyExists,
  setWageFrom,
  showHideAlert,
} from './AddWageFunctions';
import {
  AddWageButton,
  DateInput,
  InputText,
  WageDropDown,
} from './components';
import { initialState, reducer, stateConstants } from './states';
import { styles } from './style';
import moment from 'moment';

export const AddUpdateWage: React.FC<AddUpdateWageInterface> = ({ route }) => {
  const { type } = route.params;
  const { wages, wagesFrom, wagesType }: any = useSelector(
    (state: Appstate) => state.timetracker,
  );
  const { roleName }: any = useSelector(
    (state: Appstate) => state.User.UserInfo,
  );
  const { addWage }: any = useSelector((state: Appstate) => state.language);
  const [enteredEffectiveDate, setEnteredEffectiveDate] = useState(
    addWage.SelectEffectiveDate,
  );
  const [state, _setState] = useReducer(reducer, initialState);
  const setState = (type: any, data: any) => _setState({ type, data });
  const _wagesFrom = wagesFrom.map((Obj: any) => Obj.value);
  const _wagesType = wagesType.map((Obj: any) => Obj.value);
  const navigation: any = useNavigation();
  const [isvisible, setisvisble] = useState(false);
  useEffect(() => {
    if (type == 'update wage') {
      const { itemName, wageFrom, wageType, effectiveDate, wageRate } =
        route.params.wagesObject;

      setEnteredEffectiveDate(effectiveDate);
      let wageFrmName = getWageFromValue(wagesFrom, wageFrom);
      let wageTypeName = getWageTypeValue(wagesType, wageType);
      setState(stateConstants.handleUpdateWageStates, {
        [stateConstants.enteredItemName]: itemName,
        [stateConstants.enteredWageFrom]: wageFrmName,
        [stateConstants.enteredWageType]: wageTypeName,
        [stateConstants.enteredWageRate]: wageRate ? wageRate.toString() : '0',
      });
    }
  }, [type]);
  const onWageUpdateBtnPressed = () => {
    if (!state.hasModified) {
      showHideAlert(
        true,
        'Error',
        'Modify at least one field to update',
        addWage.Okay,
        setState,
      );
      return;
    }
    if (!Number(state.enteredWageRate)) {
      showHideAlert(
        true,
        'Error',
        'Enter a numerical value for wage rate',
        addWage.Okay,
        setState,
      );
      return;
    }
    const { wageFrom, wageType, wageID, userID } = route.params.wagesObject;
    var wagesArr = [
      {
        wageID,
        itemName: state.enteredItemName,
        wageFrom:
          typeof state.enteredWageFrom == 'number'
            ? state.enteredWageFrom
            : wageFrom,
        wageType: wageType,
        wageRate: parseFloat(state.enteredWageRate),
        userID: userID,
        effectiveDate: enteredEffectiveDate,
      },
    ];
    addWages(wagesArr, (res: any) => {
      if (res) {
        wagesArr[0].wageID = res;
        wages[route.params.selectedWage] = wagesArr[0];
      }
    });
    showHideAlert(
      true,
      addWage.Success,
      addWage.WageUpdatedSuccessfully,
      addWage.Okay,
      setState,
    );
  };

  const onWageBtnPressed = () => {
    var allInputsEntered = checkInputs(
      addWage,
      showHideAlert,
      state,
      enteredEffectiveDate,
      setState,
    );

    var wageExists = isWageAlreadyExists(
      enteredEffectiveDate,
      wages,
      setState,
      addWage,
    );

    if (allInputsEntered == true && wageExists == false) {
      var wagesArr = [
        {
          wageID: 0,
          fixHours: 0,
          isForAllTimeCards: false,
          itemName: state.enteredItemName,
          wageFrom: parseInt(state.enteredWageFrom),
          wageType: parseInt(state.enteredWageType),
          wageRate: parseFloat(state.enteredWageRate),
          UserID: route.params.UserId,
          effectiveDate: new Date(enteredEffectiveDate),
        },
      ];
      if (!Number(state.enteredWageRate)) {
        showHideAlert(
          true,
          'Error',
          'Enter a numerical value for wage rate',
          addWage.Okay,
          setState,
        );
        return;
      }
      addWages(wagesArr, (res: any) => {
        if (res) {
          wagesArr[0].wageID = res;
          wages.push(wagesArr[0]);
        }
      });
      showHideAlert(
        true,
        addWage.Success,
        addWage.WageAddedSuccessfully,
        addWage.Okay,
        setState,
      );
      return;
    } else return;
  };
  const handleBack = () => {
    navigation.goBack();
    return true;
  };
  const handleCustomAlertFirstBtn = () => {
    if (state.alertTitle != addWage.Error) {
      navigation.pop();
      navigation.navigate(Screens.wagesInstructor.name, {
        UserId: route.params.UserId,
        from: isAdmin(roleName) ? 'WagesAdmin' : roleName,
        fromAddWage: 'fromAddWage',
      });
      showHideAlert(false, undefined, undefined, undefined, setState);
    }
    showHideAlert(false, undefined, undefined, undefined, setState);
  };

  return (
    <_Screen
      header={
        <CstHeader
          isBack
          GoBack={() => navigation.goBack()}
          Screen={type == 'add wage' ? addWage.AddWage : addWage.UpdateWage}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={handleBack}
      backgroundColor={whiteThemeColors.background}
    >
      <_View style={styles.mainContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : 'height'}
          enabled
          keyboardVerticalOffset={Platform.OS === 'android' ? -180 : -10}
        >
          <ScrollView>
            <InputText
              heading={addWage.ItemName}
              placeholder={addWage.EnterItemName}
              value={state.enteredItemName}
              onChangeText={(text) => {
                setState(stateConstants.enteredItemName, text);
                if (type == 'update wage') {
                  setState(stateConstants.hasModified, true);
                }
              }}
            />
            <WageDropDown
              heading={addWage.WageFrom}
              options={_wagesFrom}
              defaultValue={
                type == 'update wage'
                  ? state.enteredWageFrom
                  : addWage.SelectWageFrom
              }
              onSelect={(index) => {
                if (type == 'update wage') {
                  setState(stateConstants.hasModified, true);
                }
                setWageFrom(_wagesFrom[index], wagesFrom, setState);
              }}
              type={type}
            />
            <WageDropDown
              heading={addWage.WageType}
              options={_wagesType}
              defaultValue={
                type == 'update wage'
                  ? state.enteredWageType
                  : addWage.SelectWageType
              }
              onSelect={(index) => {
                if (type == 'update wage') {
                  setState(stateConstants.hasModified, true);
                }
                handleSetWageType(_wagesType[index], setState, wagesType);
              }}
              type={type}
            />
            <DateInput
              heading={addWage.EffectiveDate}
              onPress={() => {
                if (type == 'update wage') {
                  setState(stateConstants.hasModified, true);
                }
                setisvisble(true);
              }}
              enteredEffectiveDate={
                moment(enteredEffectiveDate).isValid()
                  ? convertUTCDateToLocalDateStringFormat(enteredEffectiveDate)
                  : enteredEffectiveDate
              }
              SelectEffectiveDate={addWage.SelectEffectiveDate}
            />
            <InputText
              keyboardType={'number-pad'}
              heading={addWage.WageRate}
              placeholder={
                type == 'update wage'
                  ? state.enteredWageRate
                  : addWage.EnterWageRate
              }
              value={state.enteredWageRate}
              onChangeText={(text) => {
                if (type == 'update wage') {
                  setState(stateConstants.hasModified, true);
                }
                setState(stateConstants.enteredWageRate, text);
              }}
            />

            <AddWageButton
              btnTitle={
                type == 'add wage' ? addWage.AddWage : addWage.UpdateWage
              }
              onPress={() =>
                type == 'add wage'
                  ? onWageBtnPressed()
                  : onWageUpdateBtnPressed()
              }
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </_View>
      {isvisible && (
        <DateTimePickerIos
          data={new Date()}
          onConfirm={(date: Date) => {
            setEnteredEffectiveDate(new Date(date));
          }}
          mode='date'
          isVisible={isvisible}
          setisVisible={setisvisble}
        />
      )}
      {state.showAlert && (
        <CustomAlert
          visible={state.showAlert}
          title={state.alertTitle}
          msg={state.alertMessage}
          firstBtn={state.firstBtn}
          firstBtnFunc={() => handleCustomAlertFirstBtn()}
        />
      )}
    </_Screen>
  );
};
