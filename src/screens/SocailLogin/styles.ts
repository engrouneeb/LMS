import { StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../Utilities/colors';
import CommonStyles from '../CommonStyles';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9fbfd',
    borderRadius: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    borderWidth:.5,
    borderColor:"#c3c3c3"+60,
    marginBottom: 12,
    alignItems: 'flex-start',
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  iconWrapper: {
    marginRight: 12,
  },
  infoWrapper: {
    flex: 1,
  },
  channelName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'capitalize'
  },
  userText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  linkText:{
    fontSize: 13,
    fontWeight: '600',
    color: "#1977F2",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    overflow: 'hidden',
    alignSelf:"center"
  },
  metaText: {
    fontSize: 12,
    color: '#888',
  },
  statusWrapper: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    overflow: 'hidden',
  },
  statusConnected: {
    backgroundColor: '#d1f3d2',
    color: '#2a8d3a',
  },
  statusNotConnected: {
    backgroundColor: '#fddede',
    color: '#c33',
  },
  dropdownContainer: {
    height: 40,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  dropdownTextStyle: {
    width: '70%',
  },
  dropdownStyle: {
    width: '50%',
    height: -1,
    marginTop: 13,
    borderRadius: 10,
    paddingVertical: 10,
  },
  defaultTextStyle: {
    width: '93%',
    fontFamily: CommonStyles.fonts.regular,
    fontSize: 12,
  },
  textStyle: {
    textAlign: 'center',
    width: '100%',
    fontSize: 14,
    fontWeight: '500',
    color: whiteThemeColors.primary,
  },
  rowContainer: {
    height: 40,
    paddingHorizontal: 10,
  },
  rowTxt: {
    fontSize: 13,
    fontFamily: CommonStyles.fonts.regular,
  },
  dropdown: {
    height: 40,
    borderColor: whiteThemeColors.primary,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#888',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: whiteThemeColors.primary,
    fontWeight: '500',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
