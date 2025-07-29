import { NavigatorScreenParams } from '@react-navigation/native';

export type DrawerParamList = {
  DashboardDrawer: undefined;
  Profile: undefined;
  Assignments: undefined;
  StudentAssessments: undefined;
  Curriculum: undefined;
  Notifications: undefined;
};

export type MainStackParamList = {
  DrawerNav: NavigatorScreenParams<DrawerParamList>;
  CoursePlayer: {
    courseId: string;
    lessonId?: string;
  };
  Homework: {
    courseId: string;
    assignmentId?: string;
  };
  HomeworkAssignment: {
    assignmentId: string;
  };
  StudentAssessmentDetails: {
    assessmentId: string;
  };
  Chat: {
    userId: string;
  };
  GroupChat: {
    groupId: string;
  };
  Announcements: undefined;
  AnnouncementDetails: {
    id: string;
  };
  Events: undefined;
  EventDetails: {
    eventId: string;
  };
  EventRoster: {
    eventId: string;
  };
  Articles: undefined;
  ArticleDetails: {
    articleId: string;
  };
  StudentProgress: {
    studentId: string;
  };
  Enrollment: undefined;
  SecureFranchise: {
    franchiseId: string;
  };
};

// Type helper for useNavigation hook
declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainStackParamList {}
  }
} 