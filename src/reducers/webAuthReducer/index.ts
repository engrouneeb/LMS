// reducers/authReducer.ts
import { AuthActionTypes, WEB_LOGIN_SUCCESS, WEB_LOGIN_FAILURE,FETCH_SOCIAL_KEYS_SUCCESS,
    FETCH_CONNECTED_SOCIALS_SUCCESS,
    FETCH_PARENT_STUDENTS_SUCCESS,
  FETCH_PARENT_STUDENTS_FAILURE,
  DISCONNECT_SOCIAL_SUCCESS,
  DISCONNECT_SOCIAL_FAILURE,
  DISCONNECT_SOCIAL_REQUEST
     } from '../../actions/WebAuthLogin';

export type ParentStudent = {
        id: number;
        name: string;
      };
interface ConnectedSocial {
        channelName: string;
        connectedUser: string;
        connectedDate: string;
        lastSyncedDate: string;
        profilePic: string;
      }
      
export interface Web_AuthState {
  web_token: string | null;
  error: string | null;
  publicKeys: {
    instagram: string;
    tiktok: string;
    facebook: string;
  };
  connectedSocials: ConnectedSocial[];
  parentStudents: ParentStudent[];
  disconnectLoading: boolean;
  disconnectMessage: string | null;
  disconnectError: string | null;
  
}

const initialState: Web_AuthState = {
    web_token: null,
  error: null,
  publicKeys: {
    instagram: '',
    tiktok: '',
    facebook: '',
  },
  connectedSocials: [],
  parentStudents: [],
  disconnectLoading: false,
  disconnectMessage: null,
  disconnectError: null,
};

export const web_authReducer = (state = initialState, action: AuthActionTypes): Web_AuthState => {
  switch (action.type) {
    case WEB_LOGIN_SUCCESS:
      return { ...state, web_token: action.payload, error: null };
    case WEB_LOGIN_FAILURE:
      return { ...state, web_token: null, error: action.payload };
      case FETCH_SOCIAL_KEYS_SUCCESS:
      return { ...state, publicKeys: action.payload };
    case FETCH_CONNECTED_SOCIALS_SUCCESS:
      return { ...state, connectedSocials: action.payload };
      case FETCH_PARENT_STUDENTS_SUCCESS:
      return {
        ...state,
        parentStudents: action.payload,
      };

    case FETCH_PARENT_STUDENTS_FAILURE:
      return {
        ...state,
        parentStudents: [],
      };
      case DISCONNECT_SOCIAL_REQUEST:
  return {
    ...state,
    disconnectLoading: true,
    disconnectError: null,
    disconnectMessage: null,
  };

case DISCONNECT_SOCIAL_SUCCESS:
  return {
    ...state,
    disconnectLoading: false,
    disconnectMessage: action.payload,
  };

case DISCONNECT_SOCIAL_FAILURE:
  return {
    ...state,
    disconnectLoading: false,
    disconnectError: action.payload,
  };
    default:
      return state;
  }
};
