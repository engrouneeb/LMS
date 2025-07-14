import { StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    padding: 10,
    paddingTop: 4,
  },
  itemContainer: {
    width: '47%',
    height: 135,
    borderRadius: 15,
    backgroundColor: whiteThemeColors.greyDark + 25,
    marginVertical: 5,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderShadow: {
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
  },
  fileNameText: {
    color: whiteThemeColors.black,
    fontSize: 10,

    width: 120,
    textAlign: 'left',
  },
  fileSizeText: {
    color: whiteThemeColors.greyDark,
    fontSize: 11,
  },

  fileIconContainer: {
    marginTop: 7,
    marginBottom: 7,
    width: 75,
    height: 75,
    borderRadius: 25,
    backgroundColor: whiteThemeColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filetxtContainer: {
    position: 'absolute',
    top: 7,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filelabelTxt: {
    fontSize: 11,
    color: whiteThemeColors.primary + '90',
    zIndex: 1000,
  },
  fabContainer: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: whiteThemeColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 15,
    zIndex: 100,
  },
  emptyListContainer: {
    flex: 1,
    marginTop: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    color: whiteThemeColors.black,
    fontSize: 14,

    textAlign: 'center',
  },
  deleteContainer: {
    width: 30,
    height: 30,
    position: 'absolute',
    right: -5,
    top: 8,
  },
  downloadContainer: {
    width: 30,
    height: 30,
    position: 'absolute',
    right: -10,
    bottom: -2,
  },

  containerList: {
    flex: 1,
    padding: 5,
  },
  itemContainerList: {
    width: '95%',
    height: 75,
    backgroundColor: whiteThemeColors.white,
    marginVertical: 5,
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
    margin: 10,
  },
  borderShadowList: {
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    elevation: 5,
  },
  avatarContainer: {
    height: '100%',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameContainer: {
    height: '100%',
    width: '65%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 15,
  },
  nameText: {
    color: whiteThemeColors.primary,

    fontWeight: '600',
  },
  roleText: {
    color: whiteThemeColors.greyDark,
    fontSize: 10,
  },
  iconContainer: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
