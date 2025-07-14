import { useDispatch } from 'react-redux';
import {
  saveFileUrl,
  saveThumbnailUri,
  saveLocalImageURI,
  selectedTypes,
} from '../../../../actions/MessengerActions';
import ApiEndpoints from '../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../data/DAL';
import { extractNameExtension } from '../Functions/ChatInterfaceFunction';
const useUploadAttachment = () => {
  const { PostSecuredFormData } = DataAccess();
  const dispatch = useDispatch();
  const uploadFile = async (
    uri: string,
    isImage: boolean,
    isVideo: boolean,
    isAudio: boolean,
    file: boolean = false,
  ) => {
    const [name, ext] = extractNameExtension(uri);
    let mimeType;
    let selectedType = isVideo ? 2 : isAudio ? 4 : 1;
    if (isVideo) {
      mimeType = 'video';
      dispatch(selectedTypes(2));
    } else if (isAudio) {
      mimeType = 'audio';
      dispatch(selectedTypes(4));
    } else {
      mimeType = 'image';
      dispatch(selectedTypes(1));
      dispatch(saveLocalImageURI(uri));
    }
    let fullFile;
    if (file) {
      fullFile = file;
    } else {
      fullFile = {
        uri: uri,
        exten: ext,
        name: name,
        type: `${mimeType}/${ext}`,
      };
    }
    let endPoint = ApiEndpoints.SaveAttachment;
    const data = new FormData();
    data.append('File', fullFile);
    const res = await PostSecuredFormData(endPoint, data);
    dispatch(saveFileUrl(res.url));
    isVideo && dispatch(saveThumbnailUri(res?.thumbnailURL));
    return { uri: res, selectedType, localImageURI: uri };
  };
  return { uploadFile };
};

export { useUploadAttachment };
