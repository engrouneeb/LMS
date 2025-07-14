//region References
// Header for remaing Variants
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CustomAlert, isStaff, whiteThemeColors } from 'utilities';
import { StudentIcon } from '../../../assets/Icons';
import {
  isPortrait,
  isTablet,
  _Text,
  _VectorIcons,
  _View,
} from '../../components';
import { hp, wp } from '../../Helpers/Responsiveness';
import { useLogin } from '../../navigation/MainNav';
import CommonStyles from '../CommonStyles';
import { showHideTimer } from '../../actions/TimerAction';
//endregion
var language;

function MasterHeader(props) {
  const dispatch = useDispatch();
  const [ori, setOrientation] = useState('');
  const [alertTitle, setAlertTitle] = useState(undefined);
  const [alertMessage, setAlertMessage] = useState(undefined);
  const [showAlert, setShowAlert] = useState(false);
  const [firstBtn, setFirstBtn] = useState(undefined);
  const [secondBtn, setSecondBtn] = useState(undefined);
  const { UserInfo, dashboardScreen, isShow } = useSelector((state) => ({
    UserInfo: state.User.UserInfo,
    dashboardScreen: state.language.dashboardScreen,
    isShow: state.timerReducer.isShow,
  }));
  const { orientation } = useLogin();
  useEffect(() => {
    if (orientation) setOrientation(orientation);
  }, [orientation]);
  useEffect(() => {
    AsyncStorage.getItem('@LanguageSettings')
      .then((data) => {
        language = data;
      })
      .catch((err) => {
        return error(err.message || 'ERROR');
      });
  }, []);
  const _getMenuBtnRight = () => {
    if (props.isMenuRight) {
      return (
        <TouchableOpacity
          transparent
          style={styles.iconContainer}
          onPress={props.OpenMenu}
        >
          <_VectorIcons
            name='menu'
            type='MaterialCommunityIcons'
            size={25}
            color={whiteThemeColors.white}
          />
        </TouchableOpacity>
      );
    }
  };
  const _getOptionsMenu = () => {
    if (props.isOptionsMenu) {
      return (
        <Pressable
          style={CommonStyles.backbtn}
          onPress={props.onPressOptionsMenu}
        >
          <_VectorIcons
            name='dots-vertical'
            type='MaterialCommunityIcons'
            size={25}
            color={whiteThemeColors.primary}
          />
        </Pressable>
      );
    }
  };
  const _getCloseButton = () => {
    if (props.isClose) {
      return (
        <TouchableOpacity
          style={[styles.iconContainer, {}]}
          onPress={props.onPressClose}
          background={TouchableNativeFeedback.Ripple(
            'rgba(0, 112, 210, 0.8)',
            true,
          )}
        >
          <_VectorIcons
            name='close'
            type='AntDesign'
            size={25}
            color={whiteThemeColors.white}
          />
        </TouchableOpacity>
      );
    }
  };
  const _getStudentBtn = () => {
    if (props.isStudent) {
      return (
        <TouchableOpacity
          onPress={props.OpenStudents}
          style={[styles.iconContainer, {}]}
        >
          <_View
            transparent
            style={CommonStyles.backbtn}
            background={TouchableNativeFeedback.Ripple(
              'rgba(0, 112, 210, 0.8)',
              true,
            )}
          >
            <StudentIcon size={20} color={whiteThemeColors.white} />
          </_View>
        </TouchableOpacity>
      );
    }
  };

  const _getMenuBtn = () => {
    if (props.isMenu) {
      return (
        <TouchableOpacity
          onPress={props.OpenMenu}
          style={[styles.iconContainer, { marginLeft: 20 }]}
        >
          <_View
            transparent
            style={CommonStyles.backbtn}
            background={TouchableNativeFeedback.Ripple(
              'rgba(0, 112, 210, 0.8)',
              true,
            )}
          >
            <_VectorIcons
              name='menu'
              type='Entypo'
              color={whiteThemeColors.white}
              size={20}
            />
          </_View>
        </TouchableOpacity>
      );
    }
  };

  const _getSearchBtn = () => {
    if (props.isSearchBtn) {
      return (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={props.OpenSearch}
        >
          <_View transparent style={[CommonStyles.backbtn, {}]}>
            <_VectorIcons
              type={'MaterialIcons'}
              name='search'
              color={whiteThemeColors.white}
              size={20}
            />
          </_View>
        </TouchableOpacity>
      );
    }
  };

  const _getBackBtn = () => {
    if (props.isBack) {
      return (
        <TouchableOpacity
          style={[styles.iconContainer, { marginLeft: 5 }]}
          onPress={() => {
            if (props.goBack) {
              props.goBack();
            } else {
              props.GoBack();
            }
          }}
        >
          <_View transparent style={[CommonStyles.backbtn, {}]}>
            <_VectorIcons
              type={'Ionicons'}
              name='ios-arrow-back'
              color={whiteThemeColors.white}
              size={20}
            />
          </_View>
        </TouchableOpacity>
      );
    }
  };
  const _showAlert = () => {
    setAlertMessage('Are you sure you want to Logout?');
    setAlertTitle('warning');
    setShowAlert(true);
    setFirstBtn('Logout');
    setSecondBtn('Cancel');
  };

  const _getPowerOffBtn = () => {
    if (props.isLogout) {
      return (
        <TouchableOpacity style={styles.iconContainer} onPress={_showAlert}>
          <_View transparent style={CommonStyles.backbtn}>
            <_VectorIcons
              type='FontAwesome'
              name='power-off'
              size={18}
              color={whiteThemeColors.white}
            />
          </_View>
        </TouchableOpacity>
      );
    }
  };

  const _getNotificationIcon = () => {
    return (
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={props.NotifictionIconClicked}
      >
        <_View transparent style={[CommonStyles.backbtn, {}]}>
          <_VectorIcons
            type={'MaterialIcons'}
            name='notifications'
            color={whiteThemeColors.white}
            size={20}
          />
        </_View>
      </TouchableOpacity>
    );
  };

  const _getProfileIcon = () => {
    if (props.isProfile) {
      return (
        <TouchableOpacity
          transparent
          style={CommonStyles.backbtn}
          onPress={props.GoProfile}
          background={TouchableNativeFeedback.Ripple(
            'rgba(0, 112, 210, 0.8)',
            true,
          )}
        >
          <_VectorIcons
            type='FontAwesome'
            name='user'
            color={whiteThemeColors.white}
            size={24}
          />
        </TouchableOpacity>
      );
    }
  };

  const _getAddIcon = () => {
    if (props.isAddButton) {
      return (
        <TouchableOpacity transparent onPress={props.OpenAddModal}>
          <_VectorIcons
            type='FontAwesome'
            name='plus'
            size={16}
            color={whiteThemeColors.white}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </TouchableOpacity>
      );
    }
  };
  const TimerIcon = () => {
    return (
      <TouchableOpacity
        style={{ ...styles.iconContainer, marginRight: 5 }}
        onPress={() => {
          dispatch(showHideTimer(!isShow));
        }}
      >
        <_VectorIcons
          type='AntDesign'
          name='clockcircleo'
          color={whiteThemeColors.white}
          size={24}
        />
      </TouchableOpacity>
    );
  };
  return (
    <_View style={styles.container}>
      <StatusBar
        hidden={true}
        backgroundColor={CommonStyles.appBackgroundColor}
        barStyle={'default'}
      />
      <_View
        style={[
          styles.subContainer,
          {
            marginTop:
              ori === 'PORTRAIT'
                ? Platform.OS === 'ios'
                  ? isTablet
                    ? hp(2)
                    : 30
                  : 0
                : 5,
          },
        ]}
      >
        <_View style={styles.leftContainer}>
          {_getBackBtn()}
          {_getMenuBtn()}
        </_View>
        <_View style={styles.titleContainer}>
          <_Text numberOfLines={1} style={styles.titleTxt}>
            {props.Screen}
          </_Text>
        </_View>
        <_View style={styles.rightContainer}>
          {props.Screen === dashboardScreen.Home &&
            UserInfo?.isUserCheckedIn &&
            isStaff(UserInfo.roleName) && <TimerIcon />}
          {props.Screen === dashboardScreen.Home && _getNotificationIcon()}
          {props.Screen == dashboardScreen.Home &&
            props.NotificationsInHeader()}
          {_getPowerOffBtn()}
          {_getProfileIcon()}
          {_getMenuBtnRight()}
          {_getOptionsMenu()}
          {_getAddIcon()}
          {_getSearchBtn()}
          {_getStudentBtn()}
          {_getCloseButton()}
        </_View>
        {showAlert && (
          <CustomAlert
            visible={showAlert}
            title={alertTitle}
            msg={alertMessage}
            firstBtn={firstBtn ? firstBtn : 'Okay'}
            firstBtnFunc={() => {
              props.Logout();
              setShowAlert(false);
            }}
            secondBtn={secondBtn}
            secondBtnFunc={() => {
              setShowAlert(false);
            }}
          />
        )}
      </_View>
    </_View>
  );
}

export default MasterHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: whiteThemeColors.background,
  },
  subContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: wp(2),
    backgroundColor: whiteThemeColors.background,
    height: 60,
  },
  leftContainer: {
    width: '10%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '75%',
    paddingLeft: isTablet ? 50 : 10,
  },
  titleTxt: {
    fontFamily:
      language == 'Arabic'
        ? CommonStyles.fonts.universalAppFont2
        : CommonStyles.fonts.semiBold,
    textTransform: 'capitalize',
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
  },
  rightContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: '100%',
    width: '15%',
    paddingRight: 5,
  },
  iconContainer: {
    backgroundColor: whiteThemeColors.primary,
    width: 35,
    height: 35,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
