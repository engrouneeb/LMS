import { AppModuleScreenTypeEnum, AppModuleTypeEnum } from "../../../constants";

export const Tabs = [
  {
    key: 'studentInfo',
    title: 'Overview',
    term: 'Overview',
    iconName: 'person-outline',
    iconType: 'MaterialIcons',
    module:AppModuleTypeEnum.StudentInfo,
    screen:AppModuleScreenTypeEnum.Overview
  },
  {
    key: 'skills',
    title: 'Skills',
    term: 'Skills',
    iconName: 'light-bulb',
    iconType: 'Entypo',
    module:AppModuleTypeEnum.StudentInfo,
    screen:AppModuleScreenTypeEnum.Skills
  },
  {
    key: 'attachments',
    title: 'Attachments',
    term: 'Attachment',
    iconName: 'document-attach-outline',
    iconType: 'Ionicons',
    module:AppModuleTypeEnum.StudentInfo,
    screen:AppModuleScreenTypeEnum.Attachments
  },
  {
    key: 'classes',
    title: 'classes',
    term: 'Class',
    iconName: 'book-open',
    iconType: 'Feather',
    module:AppModuleTypeEnum.StudentInfo,
    screen:AppModuleScreenTypeEnum.Classes
  },
  {
    key: 'events',
    title: 'Events',
    term: 'Event',
    iconName: 'calendar',
    iconType: 'Feather',
    module:AppModuleTypeEnum.StudentInfo,
    screen:AppModuleScreenTypeEnum.Events
  },
  {
    key: 'medicals',
    title: 'Medicals',
    term: 'Medicals',
    iconName: 'plus',
    iconType: 'FontAwesome',
    module:AppModuleTypeEnum.StudentInfo,
    screen:AppModuleScreenTypeEnum.Medicals
  },
  {
    key: 'feedback',
    title: 'Feedback',
    term: 'Feedback',
    iconName: 'infocirlceo',
    iconType: 'AntDesign',
    module:AppModuleTypeEnum.StudentInfo,
    screen:AppModuleScreenTypeEnum.Feedback
  },
  {
    key: 'billing',
    title: 'Billing',
    term: 'Billing',
    iconName: 'payment',
    iconType: 'MaterialIcons',
    module:AppModuleTypeEnum.StudentInfo,
    screen:AppModuleScreenTypeEnum.Billing
  },
];
export const routesForStoreUser = [
  {
    key: 'studentInfo',
    title: 'Overview',
    term: 'Overview',
    iconName: 'person-outline',
    iconType: 'MaterialIcons',
    module:AppModuleTypeEnum.StudentInfo,
    screen:AppModuleScreenTypeEnum.Overview
  },
  {
    key: 'skills',
    title: 'Skills',
    iconName: 'light-bulb',
    iconType: 'Entypo',
    module:AppModuleTypeEnum.StudentInfo,
    screen:AppModuleScreenTypeEnum.Skills
  },
  {
    key: 'attachments',
    title: 'Attachments',
    term: 'Attachments',
    iconName: 'document-attach-outline',
    iconType: 'Ionicons',
    module:AppModuleTypeEnum.StudentInfo,
    screen:AppModuleScreenTypeEnum.Attachments
  },
  {
    key: 'classes',
    title: 'Classes',
    term: 'Class',
    iconName: 'book-open',
    iconType: 'Feather',
    module:AppModuleTypeEnum.StudentInfo,
    screen:AppModuleScreenTypeEnum.Classes
  },
  {
    key: 'events',
    title: 'Events',
    term: 'Event',
    iconName: 'calendar',
    iconType: 'Feather',
    module:AppModuleTypeEnum.StudentInfo,
    screen:AppModuleScreenTypeEnum.Events
  },
  {
    key: 'medicals',
    title: 'Medicals',
    term: 'Class',
    iconName: 'plus',
    iconType: 'FontAwesome',
    module:AppModuleTypeEnum.StudentInfo,
    screen:AppModuleScreenTypeEnum.Medicals
  },
  {
    key: 'feedback',
    title: 'Feedback',
    term: 'Class',
    iconName: 'infocirlceo',
    iconType: 'AntDesign',
    module:AppModuleTypeEnum.StudentInfo,
    screen:AppModuleScreenTypeEnum.Feedback
  },
];
