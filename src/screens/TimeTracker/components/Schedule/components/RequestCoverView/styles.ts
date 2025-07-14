import { Platform, StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';
export const styles = StyleSheet.create({
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    marginTop: 10,
    backgroundColor: '#0047AB',
    ...Platform.select({
      ios: {},
      android: {
        shadowColor: whiteThemeColors.black,
        shadowOffset: {
          width: 10,
          height: 10,
        },
        shadowOpacity: 1,
        elevation: 7,
        shadowRadius: 20,
      },
    }),
    marginHorizontal: 2,
    zIndex: 100,
  },
  flatListView: {
    width: '100%',
    height: '100%',
    marginBottom: 2,
  },

  listMainView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: whiteThemeColors.background,
  },

  modalLoading: {
    flex: 1,
    backgroundColor: whiteThemeColors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
