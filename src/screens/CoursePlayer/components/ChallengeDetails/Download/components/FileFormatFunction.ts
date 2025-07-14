import Screens from '../../../../../../screenNames';

export const FileFormatFunction = (
  fileFormate: string,
  fileViewURI: string,
  fileName: string,
  navigation?: any
) => {
  if (['mp4', 'webm'].includes(fileFormate))
    return navigation.navigate(Screens.videoPlayer.name, {
      header: fileName,
      stepId: null,
      stepType: null,
      mediaFileUrl: fileViewURI,
      previousStep: null,
      nextStep: null,
      isPreviousStep: false,
      isNextStep: false,
    });
  else if (['mp3', 'wav'].includes(fileFormate))
    return navigation.navigate(Screens.audioChallenge.name, {
      header: fileName,
      stepId: null,
      isAudio: true,
      stepType: null,
      mediaFileUrl: fileViewURI,
      previousStep: null,
      nextStep: null,
      isPreviousStep: false,
      isNextStep: false,
    });
  return null;
};
