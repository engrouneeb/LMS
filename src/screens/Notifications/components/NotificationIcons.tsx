import React from 'react';
import {
  ApprovalsSvg,
  AttendanceCompletionSvg,
  ChallengeCompletionSvg,
  CourseCompletionSvg,
  LevelCompletionSvg,
  NotificationSvg,
  ScheduleSvg,
  SendIcon,
} from '../../../../assets/Icons';

import { _VectorIcons } from '../../../components';
import { NotificationTypes } from '../../../constants';
import { whiteThemeColors } from '../../../Utilities';

export const NotificationIcon = {
  [NotificationTypes.CourseCompletion]: (
    <CourseCompletionSvg size={30} color={whiteThemeColors.white} />
  ),
  [NotificationTypes.LevelCompletion]: (
    <LevelCompletionSvg size={30} color={whiteThemeColors.white} />
  ),
  [NotificationTypes.ChallengeCompletion]: (
    <ChallengeCompletionSvg size={30} color={whiteThemeColors.white} />
  ),
  [NotificationTypes.Attendance]: (
    <AttendanceCompletionSvg size={30} color={whiteThemeColors.white} />
  ),
  [NotificationTypes.ClassCancelled]: (
    <NotificationSvg size={30} color={whiteThemeColors.white} />
  ),
  // no icon assigned
  [NotificationTypes.MakeUpScheduled]: (
    <NotificationSvg size={30} color={whiteThemeColors.white} />
  ),
  // no icon assigned
  [NotificationTypes.Chat]: (
    <NotificationSvg size={30} color={whiteThemeColors.white} />
  ),
  [NotificationTypes.Announcement]: (
    <NotificationSvg size={30} color={whiteThemeColors.white} />
  ),
  [NotificationTypes.StoreItemsShipped]: (
    <_VectorIcons
      type='FontAwesome5'
      name='shipping-fast'
      color={whiteThemeColors.white}
      size={30}
    />
  ),
  [NotificationTypes.StoreItemsPurchased]: (
    <_VectorIcons
      type='MaterialIcons'
      name='local-grocery-store'
      color={whiteThemeColors.white}
      size={30}
    />
  ),
  // no icon assigned
  [NotificationTypes.SchedulePublish]: (
    <NotificationSvg size={30} color={whiteThemeColors.white} />
  ),
  // no icon assigned
  [NotificationTypes.ScheduleCover]: (
    <NotificationSvg size={30} color={whiteThemeColors.white} />
  ),
  [NotificationTypes.ScheduleCoverage]: (
    <NotificationSvg size={30} color={whiteThemeColors.white} />
  ),
  [NotificationTypes.TimeOffApproval]: (
    <ApprovalsSvg size={30} color={whiteThemeColors.white} />
  ),
  [NotificationTypes.TimesheetApproval]: (
    <ApprovalsSvg size={30} color={whiteThemeColors.white} />
  ),
  [NotificationTypes.ExpenseApproval]: (
    <ApprovalsSvg size={30} color={whiteThemeColors.white} />
  ),
  [NotificationTypes.SendNotificationToClass]: (
    <SendIcon size={30} color={whiteThemeColors.white} />
  ),
  [NotificationTypes.ClassFree]: (
    <NotificationSvg size={30} color={whiteThemeColors.white} />
  ),
  [NotificationTypes.Timesheet]: (
    <ScheduleSvg size={30} color={whiteThemeColors.white} />
  ),
};

export const NotificationDefault = () => (
  <NotificationSvg size={30} color={whiteThemeColors.white} />
);
