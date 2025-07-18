import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { _Text, _VectorIcons, _View } from '../../../../../../components';
import { styles } from '../styles';

interface Props {
  onPress: () => void
}

const ModalHeader: FC<Props> = ({ onPress }) => {
  return (
    <_View style={{ width: '100%', flexDirection: 'row' }}>
      <_View style={styles.headerContainer}>
        <_Text style={styles.headText}>Manage Category </_Text>
      </_View>
      <_View style={styles.container}>
        <TouchableOpacity onPress={onPress} style={styles.crossIcon}>
          <_VectorIcons
            type={'Entypo'}
            name='cross'
            color={'black'}
            style={{ padding: 5 }}
          />
        </TouchableOpacity>
      </_View>
    </_View>
  );
};

export { ModalHeader };
