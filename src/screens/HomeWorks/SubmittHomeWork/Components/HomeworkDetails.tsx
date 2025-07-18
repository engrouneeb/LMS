import { _Text, _View } from '../../../../components';
import moment from 'moment';
import React, { FC } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../Utilities';
import {
  Attachment,
  Whiteboard,
} from '../../../CoursePlayer/components/ChallengeDetails/Homework/components';
import { SectionTitle } from './SectionTitle';
import { Attachments } from '../../../CoursePlayer/components';
import CommonStyles from '../../../CommonStyles';
interface HomeWorkDetailsProps {
  item: any;
  tabId: number;
  userId?: any;
  moduleFolder?: string;
  itemType?: number;
}
export const HomeworkDetails: FC<HomeWorkDetailsProps> = ({
  item,
  tabId,
  userId,
  moduleFolder,
  itemType,
}) => {
  return (
    <_View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <_View style={styles.detailsContainer}>
          <_View
            style={{
              paddingVertical: 5,
              width: '100%',
              // paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <_Text
              numberOfLines={2}
              style={{
                fontSize: 18,
                color: whiteThemeColors.primary,
                marginLeft: 10,
                width: '85%',
                fontFamily: CommonStyles.fonts.semiBold,
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
            <_View width={'50%'} paddingLeft={10}>
              <_Text
                style={{
                  fontFamily: CommonStyles.fonts.semiBold,
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
                  fontFamily: CommonStyles.fonts.medium,
                }}
              >
                {moment(item.dueDate).format('MMM DD, YYYY')}
              </_Text>
            </_View>

            {tabId == 2 && (
              <_View width={'50%'} paddingLeft={20} marginBottom={10}>
                <_Text
                  style={{
                    fontFamily: CommonStyles.fonts.semiBold,
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
                    fontFamily: CommonStyles.fonts.medium,
                  }}
                >
                  {moment(item.submittedDate).format('MMM DD, YYYY')}
                </_Text>
              </_View>
            )}
            <_View width={'50%'} paddingLeft={20}>
              <_Text
                style={{
                  color: whiteThemeColors.greyDark,
                  fontSize: 12,
                  fontFamily: CommonStyles.fonts.semiBold,
                }}
              >
                Priority:
              </_Text>
              <_Text
                style={{
                  fontSize: 14,
                  color: whiteThemeColors.primary,
                  fontFamily: CommonStyles.fonts.medium,
                }}
              >
                {item.homeworkPriority}
              </_Text>
            </_View>
          </_View>
        </_View>

        <_View
          style={[
            styles.detailsContainer,
            {
              paddingHorizontal: 10,
            },
          ]}
        >
          <SectionTitle
            icon={{
              name: 'integration-instructions',
              type: 'MaterialIcons',
            }}
            title={tabId == 1 ? 'Instructions' : 'comment'}
          />
          <_View
            style={{ width: '100%', paddingVertical: 5, paddingHorizontal: 10 }}
          >
            <_Text
              numberOfLines={5}
              style={{
                fontSize: 15,
                color: whiteThemeColors.greyDark,
                textAlign: 'justify',
                fontFamily: CommonStyles.fonts.medium,
              }}
            >
              {tabId == 1 ? item.homeworkInstruction : item.studentComment}
            </_Text>
          </_View>
        </_View>

        <_View
          style={[
            styles.detailsContainer,
            {
              paddingHorizontal: 10,
            },
          ]}
        >
          <SectionTitle
            icon={{
              name: 'document-attach',
              type: 'Ionicons',
            }}
            title={'Attachments'}
          />
          <_View
            style={{
              width: '100%',
              paddingVertical: 10,
            }}
          >
            {tabId == 1 ? (
              <Attachment
                userId={userId}
                data={{
                  homeWorkID: item.homeworkId,
                }}
                hideNodata
              />
            ) : (
              <Attachments
                list={item}
                dependentId={userId}
                userId={userId}
                hideNodata
                moduleFolder={moduleFolder}
                itemType={itemType}
                // isAddable={true}
                itemId={item.homeworkId}
                type={'Homework'}
              />
            )}
          </_View>
        </_View>

        {tabId == 1 && (
          <_View style={styles.whiteboardContainer}>
            <SectionTitle
              icon={{
                name: 'blackboard',
                type: 'Entypo',
              }}
              title={'Whiteboard'}
            />
            <Whiteboard
              stepId={item.stepId}
              data={{
                homeWorkID: item.homeworkId,
              }}
              hideNodata
              isFromDrawer
              userId={userId}
            />
          </_View>
        )}
      </ScrollView>
    </_View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  detailsContainer: {
    width: '100%',
    paddingVertical: 2,
    paddingHorizontal: 4,
    marginBottom: 10,
  },
  titleContainer: {
    paddingVertical: 5,
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtLabel: {
    fontWeight: '600',
    color: whiteThemeColors.greyDark,
    fontSize: 12,
  },
  textValue: {
    fontSize: 16,
    color: whiteThemeColors.primary,
    marginLeft: 10,
  },
  txtValue: {
    fontSize: 16,
    color: whiteThemeColors.primary,
    marginLeft: 10,
    width: '85%',
  },
  statusContainer: {
    paddingVertical: 5,
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  instructionsContainer: {
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  txtInstruction: {
    fontSize: 15,
    color: whiteThemeColors.greyDark,
    textAlign: 'justify',
  },
  whiteboardContainer: {
    width: '100%',
    paddingVertical: 2,
    paddingHorizontal: 10,
    marginBottom: 60,
  },

  whiteboardItemContainer: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: whiteThemeColors.greyDark + 30,
    borderRadius: 5,
  },
  whiteboardTitleContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  whiteboardTitleValueTxt: {
    fontSize: 16,
    color: whiteThemeColors.primary,
    marginLeft: 10,
    width: '85%',
  },
  openWhiteboardBtn: {
    width: '100%',
    paddingVertical: 10,
    backgroundColor: whiteThemeColors.primaryDark,
    borderRadius: 5,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openWhiteboardBtnTxt: {
    fontSize: 15,
    color: whiteThemeColors.white,
    fontWeight: '700',
  },
});
