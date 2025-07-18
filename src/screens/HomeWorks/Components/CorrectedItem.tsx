import React, { FC } from 'react';
import moment from 'moment';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

import { _Text, _VectorIcons, _View } from '../../../components';
import { whiteThemeColors } from '../../../Utilities';
import { styles } from './styles';

interface CorrectedItemProps {}

export const CorrectedItem: FC<CorrectedItemProps> = ({ item }: any) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const submittHomework = () => {
    navigation.navigate('SubmitHomeWork', {
      challengeId: item?.challengeId,
      homeWorkId: item?.homeworkId,
      stepId: item?.stepId,
      isCorrected: true,
    });
  };

  return (
    <_View style={styles.cardSubContainer}>
      <TouchableOpacity onPress={submittHomework}>
        <_View style={styles.item}>
          <_VectorIcons
            name={'my-library-books'}
            type={'MaterialIcons'}
            color={whiteThemeColors.primaryDark}
            size={30}
          />
          <_Text numberOfLines={2} style={styles.title}>
            {item.title}
          </_Text>
        </_View>
        {item.isCorrected && (
          <_View style={styles.statusContainer}>
            <_Text style={styles.homeworkText}>Corrected</_Text>
          </_View>
        )}
        <_View style={styles.dateStatusContainer}>
          <_View style={styles.datesRow}>
            <_Text style={styles.dateTxt}>Date of Assigned</_Text>
            <_View style={styles.dateStatusSubContainer}>
              <_VectorIcons
                name={'date'}
                type={'Fontisto'}
                color={whiteThemeColors.primary}
                size={13}
              />
              <_Text style={styles.dateTxt}>
                {item.dueDate && moment(item.dueDate).format('MMM Do, YYYY')}
              </_Text>
            </_View>
          </_View>
          <_View flexDirection='column' width={'50%'}>
            <_Text style={styles.dateTxt}>Date of Submission</_Text>
            <_View style={styles.dateContainer}>
              <_VectorIcons
                type={'MaterialCommunityIcons'}
                name={'progress-check'}
                color={whiteThemeColors.primary}
                size={18}
              />
              <_Text style={styles.dateTxt}>
                {item.dueDate && moment(item.dueDate).format('MMM Do, YYYY')}
              </_Text>
            </_View>
          </_View>
        </_View>
      </TouchableOpacity>
      <_View style={styles.correctView}>
        <_VectorIcons
          type={'MaterialCommunityIcons'}
          name={'calendar-edit'}
          color={whiteThemeColors.primary}
          size={18}
        />
        <_Text style={styles.correctionDateTxt}>Date of Correction</_Text>
        <_Text style={styles.correctDateTxt}>
          {item.dueDate && moment(item.dueDate).format('MMM Do, YYYY')}
        </_Text>
      </_View>
      <_View style={styles.btn}>
        <_VectorIcons
          name={'arrowright'}
          type={'AntDesign'}
          color={whiteThemeColors.primary}
          size={18}
        />
      </_View>
    </_View>
  );
};
