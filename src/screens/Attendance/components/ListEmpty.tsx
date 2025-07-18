import React from 'react';
import { StyleSheet } from 'react-native';
import { NoData } from '../../../../assets/Icons';
import { _Text, _View } from '../../../components';

const ListEmpty = () => {
  return (
    <_View style={styles.container}>
      <NoData />
      <_Text style={styles.text}>{'No data found'}</_Text>
    </_View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    zIndex: 10,
  },
  text: {
    // marginTop: 260,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ListEmpty;
