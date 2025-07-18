import { useNavigation } from '@react-navigation/native';
import React, { FC, useEffect, useReducer, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CustomAlert, whiteThemeColors } from '../../../../../Utilities';
import { submittTimeSheetHour } from '../../../../../actions/TimeSheetAction';
import { _Button, _Screen, _View } from '../../../../../components';
import Screens from '../../../../../screenNames';
import Header from '../../../../Headers';
import { RenderItem } from './components';
import { initialState, reducer } from './states';
import { styles } from './style';
import {
  handleCustomAlert,
  setComments,
  _setHour,
  determineHeight,
} from './TimeSheetDetailFunctions';
import { Appstate } from '../../../../../../reducers/Appstate';
import { TimeSheetDetailInterface } from '../../../../../interfaces';

export const TimeSheetDetial: FC<TimeSheetDetailInterface> = ({ route }) => {
  const { week, tmskey } = route.params.timeSheet;
  const [items, setItems] = useState([...week]);
  const [state, _setState] = useReducer(reducer, initialState);
  const setState = (type: any, data: any) => _setState({ type, data });
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const myTextInput = useRef();
  const selectedLanguage = useSelector((state: Appstate) => state.language);
  const { timeSheetDetial } = selectedLanguage;

  useEffect(() => {
    const subscribe = Dimensions.addEventListener('change', () => {
      determineHeight(setState);
    });
    return () => subscribe.remove();
  }, []);

  useEffect(() => {
    const sub = navigation.addListener('focus', () => {
      setItems([...week]);
    });
    return () => sub.remove();
  }, []);

  const _submitHr = () => {
    if (state.timeSheet.length > 0) {
      dispatch(submittTimeSheetHour(state.timeSheet)).then((res: any) => {
        if (res.data) {
          handleCustomAlert(
            setState,
            !state.showAlert,
            timeSheetDetial.Success,
            timeSheetDetial.TimeSheetHoursIsLogedSuccessfully,
            timeSheetDetial.Okay,
            false,
          );
        } else {
          handleCustomAlert(
            setState,
            !state.showAlert,
            timeSheetDetial.Error,
            timeSheetDetial.PleaseEnterSomeDataPleaseTryAgain,
            timeSheetDetial.Retry,
            false,
          );
        }
      });
    } else {
      handleCustomAlert(
        setState,
        !state.showAlert,
        timeSheetDetial.Error,
        timeSheetDetial.PleaseEnterSomeDataPleaseTryAgain,
        timeSheetDetial.Okay,
        false,
      );
    }
  };

  const handleGoBack = () => {
    navigation.pop();
    navigation.navigate(Screens.timeSheet.name, {
      previousScreen: 'TimeSheetDetial',
      wStart: route.params.wStart,
    });
  };

  return (
    <_Screen
      header={
        <Header
          isBack
          Screen={timeSheetDetial.TimeSheetDetial}
          GoBack={handleGoBack}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={() => {
        handleGoBack();
        return true;
      }}
      backgroundColor={whiteThemeColors.white}
    >
      <KeyboardAvoidingView
        style={{ flex: 1, height: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS == 'ios' ? 5 : 0}
      >
        <ScrollView>
          <_View
            style={[
              {
                height: state.dynamicHeight,
              },
              styles.container,
            ]}
          >
            <FlatList
              showsVerticalScrollIndicator={false}
              style={styles.flatListContainer}
              data={week}
              renderItem={({ item }) => (
                <RenderItem
                  Obj={item}
                  handleHours={(text: any, item: any) =>
                    _setHour(setState, text, item, items, tmskey)
                  }
                  handleComments={(text: any, item: any) =>
                    setComments(text, item, items, tmskey, setState)
                  }
                  txtInptRef={myTextInput}
                  timeSheetDetial={timeSheetDetial}
                />
              )}
              keyExtractor={(item) => item.uniqueId}
              ListFooterComponent={<_View width={'100%'} height={50} />}
            />
          </_View>
        </ScrollView>
      </KeyboardAvoidingView>
      {state.showSubmitBtn && (
        <_Button
          submitting={true}
          btnText={timeSheetDetial.Submit}
          BtnTxt={styles.btnText}
          borderRadius={15}
          width={250}
          style={styles.btnContainer}
          activeOpacity={0.95}
          callback={() => {
            _submitHr();
          }}
        />
      )}
      {state.showAlert && (
        <CustomAlert
          visible={state.showAlert}
          title={state.alertTitle}
          msg={state.alertMessage}
          firstBtn={state.firstBtn ? state.firstBtn : 'Okay'}
          firstBtnFunc={() => {
            handleCustomAlert(setState, false);
            if (!state.warningOnly) handleGoBack();
          }}
        />
      )}
    </_Screen>
  );
};
