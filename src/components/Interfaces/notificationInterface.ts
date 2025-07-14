export interface notifcaiotnInterface {
  collapseKey: string;
  data: Data;
  from: string;
  messageId: string;
  notification: Notification;
  sentTime: number;
  ttl: number;
}

interface Notification {
  android: Android;
  body: string;
  title: string;
}

interface Android {}

interface Data {
  NotificationType: string;
  badge: string;
  body: string;
  receiverObj: string;
  senderRole: string;
  title: string;
}
