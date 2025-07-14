import { AppModuleScreenTypeEnum,AppModuleTypeEnum} from "../../../../constants";

export const Routes = [
  // {
  //   key: 'StaffUserSetup',
  //   title: 'User Setup',
  //   iconName: 'user-cog',
  //   iconType: 'FontAwesome5',
  // },
  {
    key: 'Details',
    title: 'Details',
    iconName: 'account-details',
    iconType: 'MaterialCommunityIcons',
    module:AppModuleTypeEnum.StaffInfo,
    screen:AppModuleScreenTypeEnum.Details
  },
  {
    key: 'Skills',
    title: 'Skills',
    iconName: 'head-lightbulb-outline',
    iconType: 'MaterialCommunityIcons',
    module:AppModuleTypeEnum.StaffInfo,
    screen:AppModuleScreenTypeEnum.Skills
  },
  {
    key: 'StaffIntro',
    title: 'Staff Intro',
    iconName: 'handshake',
    iconType: 'FontAwesome5',
    module:AppModuleTypeEnum.StaffInfo,
    screen:AppModuleScreenTypeEnum.StaffIntro
  },
  {
    key: 'Video',
    title: 'Video',
    iconName: 'video',
    iconType: 'Entypo',
    module:AppModuleTypeEnum.StaffInfo,
    screen:AppModuleScreenTypeEnum.Video
  },
  {
    key: 'AssignStudents',
    title: 'Assign Students',
    iconName: 'user-graduate',
    iconType: 'FontAwesome5',
    module:AppModuleTypeEnum.StaffInfo,
    screen:AppModuleScreenTypeEnum.AssignStudents
  },
  // {
  //   key: 'Attendance',
  //   title: 'Attendance',
  //   iconName: 'checklist',
  //   iconType: 'Octicons',
  // },
  {
    key: 'Attachments',
    title: 'Attachments',
    iconName: 'document-attach-outline',
    iconType: 'Ionicons',
    module:AppModuleTypeEnum.StaffInfo,
    screen:AppModuleScreenTypeEnum.Attachments
  },
  {
    key: 'Feedback',
    title: 'Feedback',
    iconName: 'thumbs-up-down',
    iconType: 'MaterialCommunityIcons',
    module:AppModuleTypeEnum.StaffInfo,
    screen:AppModuleScreenTypeEnum.Feedback
  },
];
