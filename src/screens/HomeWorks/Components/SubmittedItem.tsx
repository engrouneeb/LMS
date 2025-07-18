import { useNavigation } from '@react-navigation/native';
import { _Text, _VectorIcons, _View } from '../../../components';
import moment from 'moment';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { Appstate } from '../../../reducers/Appstate';
import { isStudent, whiteThemeColors } from '../../../Utilities';
import { RenderItemPropsForHomWork } from '../../../interfaces';
import { styles } from './styles';
export const SubmittedItem: FC<RenderItemPropsForHomWork> = ({ item }: any) => {
  const user: any = useSelector((state: Appstate) => state.User.UserInfo);

  const navigation = useNavigation();
  const submittHomework = (
    homeWorkId: any,
    stepId: any,
    challengeId: any,
    navigation: any
  ) => {
    navigation.navigate('SubmitHomeWork', {
      challengeId: challengeId,
      homeWorkId: homeWorkId,
      stepId: stepId,
    });
  };
  const handlePress = () => {
    submittHomework(
      item?.homeworkId,
      item?.stepId,
      item?.challengeId,
      navigation
    );
  };
  return (
    <_View style={styles.cardSubContainer}>
      <TouchableOpacity
        disabled={!isStudent(user.roleName)}
        onPress={() => handlePress()}
      >
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
                {item.dueDate != null &&
                  moment(item.dueDate).format('MMM Do, YYYY')}
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
                {item.dueDate != null &&
                  moment(item.dueDate).format('MMM Do, YYYY')}
              </_Text>
            </_View>
          </_View>
        </_View>
      </TouchableOpacity>
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
