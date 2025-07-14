import { Platform } from 'react-native';

export const FileViewURL = (
  URL: any,
  uploadFrom: 1 | 2 | 3 = 1,
  isSecured: boolean = false,
) => {
  if (isSecured && ![2, 3].includes(uploadFrom)) {
    return `https://viewer.calimatic.com/ViewAttachment/ViewAttachments?fileUrl=${URL}`;
  }
  var fileExtension = URL.split('.').pop().toLowerCase();
  if (fileExtension == 'pdf') return URL;
  if (Platform.OS == 'android') {
    if (
      [
        'mp4',
        'webm',
        'webp',
        'ogg',
        'mp3',
        'wav',
        'png',
        'jpeg',
        'jpg',
        'gif',
      ].includes(fileExtension)
    )
      return URL;
    else if (['ppt', 'pptx'].includes(fileExtension) && isSecured)
      return `https://docs.google.com/gview?embedded=false&hl=en-US&url=${URL}`;
    else {
      return `https://view.officeapps.live.com/op/view.aspx?src=${URL}`;
    }
  } else {
    if (fileExtension.match('xlsx')) {
      return `https://view.officeapps.live.com/op/view.aspx?src=${URL}`;
    }
    if (['odt', 'ods'].includes(fileExtension))
      return `https://view.officeapps.live.com/op/view.aspx?src=${URL}`;

    return URL;
  }
};
