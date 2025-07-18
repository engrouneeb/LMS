import React from 'react';
import { StyleSheet } from 'react-native';
import { _Text, _View } from '../../../../../../../components';
import { NoCourse } from '../../../../../../../../assets/NoCourse';

export const RenderEmpty = () => {
  return (
    <_View style={styles.container}>
      <NoCourse />
      <_Text style={styles.Txt}>No Data</_Text>
    </_View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Txt: {
    marginTop: 10,
  },
});
