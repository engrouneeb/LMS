import { _Text, _View } from '../../../../components';
import moment from 'moment';
import React from 'react';
import { whiteThemeColors } from '../../../../Utilities';
interface HomeworkDetailCardProps {
  item: any;
}
export const HomeworkDetailCard: React.FC<HomeworkDetailCardProps> = ({
  item,
}) => {
  return (
    <_View
      style={{
        width: '100%',
        paddingVertical: 2,
        marginBottom: 10,
      }}
    >
      <_View
        style={{
          paddingVertical: 5,
          width: '100%',
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <_Text
          style={{
            fontWeight: '600',
            color: whiteThemeColors.greyDark,
            fontSize: 12,
          }}
        >
          Title:
        </_Text>
        <_Text
          numberOfLines={2}
          style={{
            fontSize: 14,
            color: whiteThemeColors.primary,
            marginLeft: 10,
            width: '85%',
          }}
        >
          {item.title}
        </_Text>
      </_View>

      <_View
        style={{
          paddingVertical: 5,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <_View width={'50%'} paddingLeft={20}>
          <_Text
            style={{
              fontWeight: '600',
              color: whiteThemeColors.greyDark,
              fontSize: 12,
            }}
          >
            Due Date:
          </_Text>
          <_Text
            style={{
              fontSize: 14,
              color: whiteThemeColors.primary,
            }}
          >
            {moment(item.dueDate).format('MMM DD, YYYY')}
          </_Text>
        </_View>
        <_View width={'50%'} paddingLeft={20} marginBottom={10}>
          <_Text
            style={{
              fontWeight: '600',
              color: whiteThemeColors.greyDark,
              fontSize: 12,
            }}
          >
            Submitted Date:
          </_Text>
          <_Text
            style={{
              fontSize: 14,
              color: whiteThemeColors.primary,
            }}
          >
            {moment(item.submittedDate).format('MMM DD, YYYY')}
          </_Text>
        </_View>
        <_View width={'50%'} paddingLeft={20}>
          <_Text
            style={{
              fontWeight: '600',
              color: whiteThemeColors.greyDark,
              fontSize: 12,
            }}
          >
            Priority:
          </_Text>
          <_Text
            style={{
              fontSize: 14,
              color: whiteThemeColors.primary,
            }}
          >
            {item.homeworkPriority}
          </_Text>
        </_View>
      </_View>
    </_View>
  );
};
