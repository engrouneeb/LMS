const prohibitedExtensions: string[] = [
  'ogg',
  'cr2',
  'mj2',
  'indt',
  'psd',
  'eps',
  'ai',
];
const microsoftOfficeExtensions: string[] = [
  'odt',
  'ods',
  'odp',
  'docx',
  'doc',
  'ppt',
  'pptx',
  'xls',
  'xlsx',
];
const microsoftOfficeLink: (url: string) => string = (url: string) =>
  `https://view.officeapps.live.com/op/view.aspx?src=${url}`;

const otherLinks: (url: string) => string = (url: string) =>
  `http://docs.google.com/gview?embedded=true&url=${url}&embedded=true`;

export {
  prohibitedExtensions,
  microsoftOfficeExtensions,
  microsoftOfficeLink,
  otherLinks,
};
