export interface chatReducerInterface {
  readonly isDelivered: false;
  readonly chatFor: true;
  readonly User: [];
  readonly UserChats?: any;
  readonly fileFormate: '';
  readonly fileUrl: '';
  readonly selectedType: 0;
  readonly localImageURI: '';
  readonly fileGallery: '';
  readonly thumbnaillUri: '';
  readonly galleryLocalImageURI: '';
  readonly isFileLoading: false;
}
const initialState: chatReducerInterface = {
  isDelivered: false,
  chatFor: true,
  User: [],
  UserChats: [],
  fileFormate: '',
  fileUrl: '',
  selectedType: 0,
  localImageURI: '',
  fileGallery: '',
  thumbnaillUri: '',
  galleryLocalImageURI: '',
  isFileLoading: false,
};
const chatReducer = (
  state: chatReducerInterface = initialState,
  action: any,
): chatReducerInterface => {
  switch (action.type) {
    case 'isReceivedMessageStatus':
      return { ...state, isDelivered: action.data };
    case 'SET_CHAT_FOR':
      return { ...state, chatFor: action.data };
    case 'CHAT_USER':
      return { ...state, User: action.data };
    case 'File_FORMATE':
      return { ...state, fileFormate: action.data };
    case 'SELECTED_TYPE':
      return { ...state, selectedType: action.data };
    case 'SAVE_LOCAL_IMAGE_URI':
      return { ...state, localImageURI: action.data };
    case 'SAVE_GALLERY_LOCAL_IMAGE_URI':
      return { ...state, galleryLocalImageURI: action.data };
    case 'Save_Thumbnai_lUri':
      return { ...state, thumbnaillUri: action.data };
    case 'LOADING_File':
      return { ...state, isFileLoading: action.isLoadingFile };
    case 'File_URL':
      return { ...state, fileUrl: action.data };
    case 'save_Gallery_File':
      return { ...state, fileGallery: action.data };
    case 'USER_CHAT':
      if (action.isList) {
        return { ...state, UserChats: action.data.reverse() };
      } else {
        return {
          ...state,
          UserChats: [...action.data, ...state.UserChats],
        };
      }

    case 'UPDATE_USER_CHAT':
      return {
        ...state,
        UserChats: [...action.data, ...state.UserChats],
      };
    default:
      return state;
  }
};

export default chatReducer;
