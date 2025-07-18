import { Platform, StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../Utilities';
import { isTablet } from 'react-native-device-info';
import CommonStyles from '../../../CommonStyles';

const giftedChatStyles = {
  text: {
    left: {
      color: whiteThemeColors.black,
      fontSize: 14,
    },
    right: {
      color: whiteThemeColors.black,
      fontSize: 14,
    },
  },
  wrapper: {
    left: {
      backgroundColor: whiteThemeColors.white,
      marginBottom: Platform.OS == 'android' ? 5 : 2,
    },
    right: {
      backgroundColor: whiteThemeColors.primary + 30,
      marginBottom: Platform.OS == 'android' ? 5 : 2,
    },
  },
  timeText: {
    right: {
      color: whiteThemeColors.textColor.primaryText,
      fontSize: 7,
      fontFamily: CommonStyles.fonts.light,
      marginTop: 3,
      marginRight: -4,
    },
    left: {
      color: whiteThemeColors.textColor.primaryText,
      fontSize: 7,
      fontFamily: CommonStyles.fonts.light,
      marginTop: 3,
      marginRight: -4,
    },
  },
};
const simpleStyle = StyleSheet.create({
  dayText: {
    color: whiteThemeColors.white,
    fontSize: 10,
    fontWeight: '500',
    fontFamily: CommonStyles.fonts.regular,
  },
  toolBarContainer: {
    borderRadius: 15,
    height: 50,
    marginLeft: '15%',
    width: isTablet() ? '85%' : '80%',
    fontFamily: CommonStyles.fonts.regular,
    borderTopWidth: 0,
    borderColor: whiteThemeColors.greyLite,
    paddingTop: 6,
    paddingLeft: 5,
    backgroundColor: whiteThemeColors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageTextWrapper: {
    flexDirection: 'column',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginRight: 2,
    marginBottom: -8,
  },
  messageMediaWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 270,
    height: 250,
    borderRadius: 1,
  },
  thumbnailImage: {
    width: 260,
    height: 240,
    borderRadius: 10,
  },
  downloadURL: {
    textDecorationLine: 'underline',
    color: whiteThemeColors.textColor.linkText,
  },

  sendIcon: {
    marginBottom: 10,
    height: 30,
    width: isTablet() ? '3%' : '7%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  typingTxt: {
    color: whiteThemeColors.primary + 60,
    marginBottom: 10,
    margin: 2,
  },
  indicator: {
    flexDirection: 'row',
    marginLeft: 17,
  },
  attachedImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
    margin: 5,
    marginRight: 2,
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  closeModal: {
    position: 'absolute',
    right: 20,
    top: 50,
    backgroundColor: whiteThemeColors.primary,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  fileWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 220,
    height: 65,
    borderRadius: 15,
  },
  fileIconBg: {
    width: 300,
    height: 300,
    borderRadius: 20,
    backgroundColor: whiteThemeColors.background,
  },
  bgfile: {
    width: 220,
    height: 65,
    borderRadius: 15,
    justifyContent: 'center',
    backgroundColor: whiteThemeColors.primary + 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  renderFile: {
    borderRadius: 10,
    elevation: 5,
    height: 250,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  renderImg: {
    borderRadius: 10,
    elevation: 5,
    height: 250,
    width: 250,
  },
  fileIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: whiteThemeColors.primary + '70',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileExtension: {
    position: 'absolute',
    top: 7,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileType: {
    fontSize: 6,
    color: whiteThemeColors.primary + '90',
    zIndex: 1000,
  },
  uploadFile: {
    position: 'absolute',
    zIndex: 5,
    bottom: 43,
    right: 60,
    borderRadius: 7,
  },
});

export const styles = { ...giftedChatStyles, ...simpleStyle };
