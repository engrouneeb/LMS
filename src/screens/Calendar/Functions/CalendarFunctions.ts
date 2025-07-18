import {
  ClassTypesConstants,
  NotificationReminder,
  NotificationTypes,
} from '../../../constants';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
const { Get, PostSecuredWithParams } = DataAccess();
export const SendReminderNotifications = async (
  data: { classId: number; className: string },
  reminderType: number,
) => {
  const { classId, className } = data;
  try {
    const URL = ApiEndpoints.SendReminderNotifications;
    const params = `?classId=${classId}&StudentName=${null}&className=${className}&notificationType=${
      NotificationTypes.Announcement
    }&reminder=${reminderType}`;
    await PostSecuredWithParams(URL, params);
  } catch (e) {
    console.log('Error', e);
  }
};
