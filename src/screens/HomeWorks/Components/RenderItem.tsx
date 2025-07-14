import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import React, { FC, useCallback } from 'react';
import { RenderItemPropsForHomWork } from '../../../interfaces';
import {
  AssignedDetails,
  CorrectedDetails,
  SubmittedDetails,
  CardWrapper,
} from './';

export const RenderItem: FC<RenderItemPropsForHomWork> = ({
  studentId,
  item,
  tabId,
  tab,
  header,
  handleRerender,
}: any) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const headerName = useCallback(() => {
    switch (tabId) {
      case 1:
        return `Submit ${header}`;
      case 2:
        return `Submitted ${header}`;
      default:
        return `Corrected ${header}`;
    }
  }, []);

  const handlePress = () => {
    navigation.navigate('SubmitHomeWork', {
      handleRerender,
      isDrawerHomework: true,
      studentId,
      item,
      tabId,
      tab,
      label:header,
      header: headerName(),
    });
  };

  if (tabId === 1)
    return (
      <CardWrapper
        cardOnPress={handlePress}
        courseName={item.courseName}
        title={item.title}
        homeworkPriority={item.homeworkPriority}
      >
        <AssignedDetails dueDate={item.dueDate} />
      </CardWrapper>
    );
  else if (tabId == 2)
    return (
      <CardWrapper
        cardOnPress={handlePress}
        courseName={item.courseName}
        title={item.title}
        homeworkPriority={item.homeworkPriority}
      >
        <SubmittedDetails
          submittedDate={item?.submittedDate}
          dueDate={item?.dueDate}
        />
      </CardWrapper>
    );

  return (
    <CardWrapper
      cardOnPress={handlePress}
      courseName={item.courseName}
      title={item.title}
      homeworkPriority={item.homeworkPriority}
    >
      <CorrectedDetails
        submittedDate={item?.submittedDate}
        dueDate={item?.dueDate}
      />
    </CardWrapper>
  );
};
