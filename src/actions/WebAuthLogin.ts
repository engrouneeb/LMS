// actions/authActions.ts
import { Appstate } from 'reducers/Appstate';
import { Dispatch } from 'redux';
import {LMSWebApi} from "../reducers/BaseUrl"

export const WEB_LOGIN_SUCCESS = 'WEB_LOGIN_SUCCESS';
export const WEB_LOGIN_FAILURE = 'WEB_LOGIN_FAILURE';
export const FETCH_SOCIAL_KEYS_SUCCESS = 'FETCH_SOCIAL_KEYS_SUCCESS';
export const FETCH_CONNECTED_SOCIALS_SUCCESS = 'FETCH_CONNECTED_SOCIALS_SUCCESS';
export const FETCH_PARENT_STUDENTS_SUCCESS = 'FETCH_PARENT_STUDENTS_SUCCESS';
export const FETCH_PARENT_STUDENTS_FAILURE = 'FETCH_PARENT_STUDENTS_FAILURE';
export const DISCONNECT_SOCIAL_REQUEST = 'DISCONNECT_SOCIAL_REQUEST';
export const DISCONNECT_SOCIAL_SUCCESS = 'DISCONNECT_SOCIAL_SUCCESS';
export const DISCONNECT_SOCIAL_FAILURE = 'DISCONNECT_SOCIAL_FAILURE';

export type ParentStudent = {
    id: number;
    name: string;
  };

interface LoginSuccessAction {
  type: typeof WEB_LOGIN_SUCCESS;
  payload: string;
}

interface LoginFailureAction {
  type: typeof WEB_LOGIN_FAILURE;
  payload: string;
}

interface FetchSocialKeysSuccessAction {
    type: typeof FETCH_SOCIAL_KEYS_SUCCESS;
    payload: {
      instagram: string;
      tikTok: string;
      facebook: string;
    };
  }
  
  interface FetchConnectedSocialsSuccessAction {
    type: typeof FETCH_CONNECTED_SOCIALS_SUCCESS;
    payload: {
      channelName: string;
      connectedUser: string;
      connectedDate: string;
      lastSyncedDate: string;
      profilePic: string;
    }[];
  }
// Action Interfaces
export interface FetchParentStudentsSuccessAction {
    type: typeof FETCH_PARENT_STUDENTS_SUCCESS;
    payload: ParentStudent[];
  }
  
  export interface FetchParentStudentsFailureAction {
    type: typeof FETCH_PARENT_STUDENTS_FAILURE;
  }

  interface DisconnectSocialRequestAction {
    type: typeof DISCONNECT_SOCIAL_REQUEST;
  }
  interface DisconnectSocialSuccessAction {
    type: typeof DISCONNECT_SOCIAL_SUCCESS;
    payload: string; // message
  }
  interface DisconnectSocialFailureAction {
    type: typeof DISCONNECT_SOCIAL_FAILURE;
    payload: string;
  }
  export type DisconnectSocialActionTypes =
  | DisconnectSocialRequestAction
  | DisconnectSocialSuccessAction
  | DisconnectSocialFailureAction;
  
// Combined Action Type
export type AuthActionTypes =
  | LoginSuccessAction
  | LoginFailureAction
  | FetchSocialKeysSuccessAction
  | FetchConnectedSocialsSuccessAction
  | FetchParentStudentsSuccessAction
  | FetchParentStudentsFailureAction
  |DisconnectSocialActionTypes


export const webloginUser = (userName: string, password: string, domainUrl: string) => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    
    try {
      const response = await fetch(`${LMSWebApi}/api/Auth/appLogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, password, domainUrl }),
      });
      const data = await response.json();
     
      if (response.ok) {
        dispatch({
          type: WEB_LOGIN_SUCCESS,
          payload: data.response, // Adjust according to actual token key
        });
      } else {
        dispatch({
          type: WEB_LOGIN_FAILURE,
          payload: data.message || 'Login failed',
        });
      }
    } catch (error: any) {
      dispatch({
        type: WEB_LOGIN_FAILURE,
        payload: error.message || 'Network error',
      });
    }
  };
};

// Fetch Public Keys
export const fetchSocialPublicKeys = () => {
    return async (dispatch: Dispatch<AuthActionTypes>, getState: () => Appstate) => {
      const { web_token } = getState().WebAuthReducer;
      const response = await fetch(`${LMSWebApi}/api/Social/GetSocialPublicKeys`, {
        headers: {
          Authorization: `Bearer ${web_token}`,
        },
      });
      const data = await response.json();
      if (data.isSuccessful) {
        dispatch({
          type: FETCH_SOCIAL_KEYS_SUCCESS,
          payload: data.response,
        });
      }
    };
  };
  
  // Fetch Connected Socials
  export const fetchUserSocialChannels = (userID:string|number) => {
    return async (dispatch: Dispatch<AuthActionTypes>, getState: () => Appstate) => {
      const { web_token } = getState().WebAuthReducer;
      const response = await fetch(`${LMSWebApi}/api/Social?userId=${userID}`, {
        headers: {
          Authorization: `Bearer ${web_token}`,
        },
      });
  
      const data = await response.json();
  
      if (data.isSuccessful) {
        dispatch({
          type: FETCH_CONNECTED_SOCIALS_SUCCESS,
          payload: data.response,
        });
      }
    };
  };
  export const fetchParentStudents = () => {
    return async (dispatch: Dispatch<AuthActionTypes>, getState: () => Appstate) => {
        const { web_token } = getState().WebAuthReducer;
      try {
        const response = await fetch(
          `${LMSWebApi}/api/Social/getParentStudents`,{
            headers: {
              Authorization: `Bearer ${web_token}`,
            }});
        const json = await response.json();
        if (json.isSuccessful) {
          dispatch({ type: FETCH_PARENT_STUDENTS_SUCCESS, payload: json.response });
        } else {
          dispatch({ type: FETCH_PARENT_STUDENTS_FAILURE });
        }
      } catch (error) {
        dispatch({ type: FETCH_PARENT_STUDENTS_FAILURE });
      }
    };
  };
  export const disconnectSocial = (platformType: string, userId: number) => {
    return async (dispatch: Dispatch<AuthActionTypes> ,getState: () => Appstate) => {
      const { web_token } = getState().WebAuthReducer;
      
      try {
        dispatch({ type: DISCONNECT_SOCIAL_REQUEST });
        const response =await fetch(`${LMSWebApi}/api/Social/DisconnectUser?platformType=${platformType}&userId=${userId}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${web_token}`,
          },
        });
        
        if (response.data?.isSuccessful) {
          dispatch({
            type: DISCONNECT_SOCIAL_SUCCESS,
            payload: 'Disconnected successfully!',
          });
        } else {
          dispatch({
            type: DISCONNECT_SOCIAL_FAILURE,
            payload: 'Failed to disconnect social platform.',
          });
        }
      } catch (error: any) {
        dispatch({
          type: DISCONNECT_SOCIAL_FAILURE,
          payload: error.message || 'An error occurred.',
        });
      }
    };
  };