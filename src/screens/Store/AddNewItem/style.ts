import { Platform } from 'react-native';
import { whiteThemeColors } from '../../../Utilities';
export const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: 10,
    marginTop: 10,
  },
  input: {
    marginBottom: 10,
    height: 40,
    flexDirection: 'row',
  },
  dropdownStyle: {
    width: 200,
    height: 100,
    alignSelf: 'center',
    backgroundColor: whiteThemeColors.white,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    marginTop: Platform.OS === 'ios' ? 13 : -13,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
  },
  inputText: {
    paddingLeft: 15,
    fontSize: 12,

    color: whiteThemeColors.greyDark,
    borderWidth: 0.5,
    height: 40,
    borderColor: whiteThemeColors.greyDark + 50,
    borderRadius: 20,
  },
  textboxTitle: {
    paddingLeft: 15,
    paddingBottom: 2,
    fontSize: 12,
    fontWeight: '600',

    color: whiteThemeColors.primaryTextColor,
    marginTop: 10,
  },
  topView: {
    width: '100%',
    height: 75,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: whiteThemeColors.primary,
  },

  dropDownRow: {
    flexDirection: 'row',
    marginTop: 0,
    marginBottom: 0,
    alignItems: 'center',
    height: 40,
    backgroundColor: whiteThemeColors.white,
  },
  button: {
    marginTop: 10,
    marginBottom: 50,
    height: 40,
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  manageButton: {
    width: '23%',
    height: 40,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: whiteThemeColors.primary,
    alignItems: 'center',
  },
  buttonText: {
    color: whiteThemeColors.white,
    fontSize: 14,

    textAlign: 'center',
  },
  manageButtonText: {
    color: whiteThemeColors.white,
    fontSize: 12,
  },
  tagContainer: {
    marginLeft: 5,
    borderRadius: 3,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  tagText: {
    color: 'white',
    fontSize: 12,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  tagCross: {
    color: 'white',
    paddingRight: 4,
    fontSize: 12,
    alignSelf: 'center',
  },
  tagParentContainer: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'white',
  },
  addNewBtn: {
    backgroundColor: whiteThemeColors.white,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 20,
    borderColor: '#fff',
  },
  tagsInput: {
    width: '80%',
    borderBottomRightRadius: 18,
    borderTopRightRadius: 18,
    borderWidth: 0.5,
    borderColor: whiteThemeColors.greyDark + 50,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginLeft: 8,
    marginTop: 20,
  },
  imagePickerView: {
    backgroundColor: whiteThemeColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 15,
  },
  imagePicker: {
    flexDirection: 'row',
    marginLeft: 5,
    marginTop: 15,
  },
  imageNameContainer: {
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    padding: 10,
    fontSize: 12,

    color: whiteThemeColors.greyDark,
  },
  spinnerInput: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: whiteThemeColors.greyDark + 50,
    height: 40,
  },
  spinerInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  catContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '98%',
  },
};
