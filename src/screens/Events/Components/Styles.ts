import { StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';

export const styles = StyleSheet.create({
  inner: { padding: 10, borderRadius: 8, backgroundColor: '#f9f9f9' },
  key: { fontWeight: '500', fontSize: 14 },
  value: { fontSize: 14, color: '#555',marginLeft:24 },
  key2: { fontSize: 12, fontWeight: 'bold' },
  value2: { fontSize: 12, color: '#333' },
  week: { marginTop: 10 },
  days: { padding: 5, borderRadius: 5, marginRight: 5,minWidth:22,justifyContent:"center",alignItems:"center" },
  timingWrapper:{backgroundColor:whiteThemeColors.primary+20,paddingVertical:10,borderRadius:8,justifyContent:"center",alignItems:"center"},
  classTiming: { fontSize: 14, color: whiteThemeColors.white },
  classTimingValue: { fontSize: 12, marginLeft: 10 },
  card2: { marginTop: 10, padding: 10, borderRadius: 8, backgroundColor: '#fff' },
  staffCon: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 5 },
  inst: { backgroundColor: '#007bff', padding: 5, borderRadius: 5, margin: 2 },
  staffName: { color: '#fff', fontSize: 10 },
});
