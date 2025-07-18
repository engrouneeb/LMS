import { AttachmentTypes } from '../../../Utilities';

export const TABS = [
  {
    id: 1,
    name: 'Assigned',
    icon: {
      type: 'FontAwesome',
      name: 'calendar',
    },
    subTabs: [
      {
        name: 'Details',
        id: 'details',
        icon: {
          type: 'MaterialIcons',
          name: 'find-in-page',
        },
        attachmentDetails: {
          folderName: AttachmentTypes.SubmitCoursePlayerHomework.folderName,
          folderType: AttachmentTypes.SubmitCoursePlayerHomework.value,
        },
      },
      {
        name: 'Submit',
        id: 'submit',
        icon: {
          name: 'file-send-outline',
          type: 'MaterialCommunityIcons',
        },
        attachmentDetails: {
          folderName: AttachmentTypes.SubmitCoursePlayerHomework.folderName,
          folderType: AttachmentTypes.SubmitCoursePlayerHomework.value,
        },
      },
    ],
  },
  {
    id: 2,
    name: 'Submitted',
    icon: {
      type: 'MaterialCommunityIcons',
      name: 'progress-check',
    },
    subTabs: [
      {
        name: 'Submitted',
        id: 'submitted',
        icon: {
          type: 'MaterialCommunityIcons',
          name: 'file-check',
        },
        attachmentDetails: {
          foldername: AttachmentTypes.SubmitCoursePlayerHomework.folderName,
          folderType: AttachmentTypes.SubmitCoursePlayerHomework.value,
        },
      },
      {
        name: 'Correction',
        id: 'correction',
        icon: {
          type: 'Foundation',
          name: 'clipboard-pencil',
        },
        attachmentDetails: {
          foldername: AttachmentTypes.CorrectedCoursePlayerHomework.folderName,
          folderType: AttachmentTypes.CorrectedCoursePlayerHomework.value,
        },
      },
    ],
  },
  {
    id: 3,
    name: 'Corrected',
    icon: {
      type: 'FontAwesome',
      name: 'calendar-check-o',
    },
    attachmentDetails: {
      foldername: AttachmentTypes.CorrectedCoursePlayerHomework.folderName,
      folderType: AttachmentTypes.CorrectedCoursePlayerHomework.value,
    },
    subTabs: [],
  },
];
