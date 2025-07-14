import { _Text, _VectorIcons, _View } from 'components';
import { FC } from 'react';
import { Image, Modal, Pressable, StyleSheet } from 'react-native';
import CommonStyles from 'screens/CommonStyles';
import { whiteThemeColors } from 'utilities';

const underProgressImage = require('./maintenanceImg.png');

interface UnderMaintenanceInterface {
  show: boolean;
  onClose: (value: boolean) => void;
}

export const UnderMaintenance: FC<UnderMaintenanceInterface> = ({
  show,
  onClose,
}) => {
  const handleOnClose = () => {
    onClose(false);
  };

  return (
    <_View style={styles.container}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={show}
        supportedOrientations={['portrait', 'landscape']}
        onRequestClose={handleOnClose}
      >
        <_View style={styles.subContainer}>
          <_View style={styles.contentContainer}>
            <_View style={styles.headerContainer}>
              <_View style={styles.headerTxtIconContainer}>
                <_VectorIcons
                  type='AntDesign'
                  name='warning'
                  size={22}
                  color={whiteThemeColors.red}
                />
                <_Text style={styles.headerTxt}>Sorry, Under Maintenance</_Text>
              </_View>
              <Pressable style={styles.modalCloseBtn} onPress={handleOnClose}>
                <_VectorIcons
                  type='AntDesign'
                  name='close'
                  color={'white'}
                  size={20}
                />
              </Pressable>
            </_View>
            <_View style={styles.alertBodyContainer}>
              <Image
                source={underProgressImage}
                style={styles.alertImg}
                resizeMode='contain'
              />
              <_View style={styles.alertTxtContainer}>
                <_Text style={styles.alertTxt}>
                  We apologize, but this feature is currently undergoing
                  maintenance. We will notify you once it is ready for use.
                </_Text>
              </_View>
            </_View>
          </_View>
        </_View>
      </Modal>
    </_View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    backgroundColor: 'rgba(54,54,54,0.6)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  modalCloseBtn: {
    height: 28,
    width: 28,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: whiteThemeColors.primary + 30,
    borderRadius: 10,
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    width: '90%',
    backgroundColor: whiteThemeColors.background,
    paddingBottom: '2%',
  },
  headerContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: '100%',
    height: 60,
    backgroundColor: whiteThemeColors.white + 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  headerTxtIconContainer: {
    //   height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  headerTxt: {
    fontSize: 17,
    color: whiteThemeColors.primary,
    fontFamily: CommonStyles.fonts.semiBold,
    marginLeft: 5,
  },
  alertBodyContainer: {
    width: '90%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  alertTxtContainer: {
    width: '100%',
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  alertTxt: {
    fontSize: 15,
    fontFamil: CommonStyles.fonts.semiBold,
    color: whiteThemeColors.greyDark,
    textAlign: 'justify',
  },
  alertImg: {
    height: 100,
    marginTop: 10,
  },
});
