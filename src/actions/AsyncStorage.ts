import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = (token: any) => ({
  type: 'GET_TOKEN',
  token,
});

export const saveToken = (token: any) => ({
  type: 'SAVE_TOKEN',
  token,
});

export const getIsStart = (isStarted: any) => ({
  type: 'GET_STARTED',
  isStarted,
});

export const saveIsStart = (isStarted: any) => ({
  type: 'GET_STARTED',
  isStarted,
});

export const removeToken = () => ({
  type: 'REMOVE_TOKEN',
});

export const loading = (bool: any) => ({
  type: 'LOADING',
  isLoading: bool,
});
export const logout = () => ({
  type: 'USER_LOGOUT',
});

export const setChatFor = (String: any) => ({
  type: 'SET_CHAT_FOR',
  currentFocus: String,
});
export const setCurrentFocus = (String: any) => ({
  type: 'SET_CURRENT_FOCUS',
  currentFocus: String,
});

export const setTimeOffInstructor = (Number: any) => ({
  type: 'SET_TIMEOFF_INSTRUCTOR',
  timeOffInstructorId: Number,
});

export const updateTimeOff = (Boolean: any) => ({
  type: 'UPDATE_TIMEOFF',
  updatedTimeOff: Boolean,
});

export const error = (error: any) => ({
  type: 'ERROR',
  error,
});

export const reset = (reset: any) => ({
  type: 'RESET',
  reset,
});

export const getStarted = (getStarted: any) => ({
  type: 'GET_STARTED',
  getStarted,
});

export const forget = (typeName: any) => ({
  type: 'GET_FORGET_TYPE',
  typeName,
});

export const setCompanyConfigs = (CmpConfigs: any) => ({
  type: 'CMP_CONFIGS',
  CmpConfigs,
});
export const setLanguage = (USER_LANGUAGE: any) => ({
  type: 'USER_LANGUAGE',
  USER_LANGUAGE,
});

export const setLanguageSettings = (data: any) => (dispatch: any) => {
  AsyncStorage.setItem('@LanguageSettings', data)
    .then((data) => {
      // dispatch(loading(false));
    })
    .catch((err) => {
      // dispatch(loading(false));
      dispatch(error(err.message || 'ERROR'));
    });
};

export const getLanguageSettings = () =>
  AsyncStorage.getItem('@LanguageSettings')
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return error(err.message || 'ERROR');
    });

export const removeCmpSettings = () => (dispatch: any) =>
  AsyncStorage.removeItem('@CmpSettings')
    .then((data) => {
      // dispatch(loading(false));
      return dispatch(setCompanyConfigs({}));
    })
    .catch((err) => {
      // dispatch(loading(false));
      dispatch(error(err.message || 'ERROR'));
    });

export const removeIsStarted = () => (dispatch: any) =>
  AsyncStorage.removeItem('@UserStarted')
    .then((data) => {
      // dispatch(loading(false));
      return dispatch(saveIsStart(null));
    })
    .catch((err) => {
      // dispatch(loading(false));
      dispatch(error(err.message || 'ERROR'));
    });

export const getUserToken = () => (dispatch: any) =>
  AsyncStorage.getItem('@UserAuth')
    .then((data: any) => {
      // dispatch(loading(false));
      return dispatch(getToken(JSON.parse(data)));
    })
    .catch((err) => {
      // dispatch(loading(false));
      dispatch(error(err.message || 'ERROR'));
    });

export const saveUserToken = (data: any) => (dispatch: any) =>
  AsyncStorage.setItem('@UserAuth', JSON.stringify(data))
    .then((data) => {
      // dispatch(loading(false));
    })
    .catch((err) => {
      // dispatch(loading(false));
      dispatch(error(err.message || 'ERROR'));
    });

export const removeUserToken = () => (dispatch: any) =>
  AsyncStorage.removeItem('@UserAuth')
    .then((data) => {
      // dispatch(loading(false));

      return new Promise((rsl, rej) => {
        return rsl(dispatch(removeToken()));
      });
    })
    .catch((err) => {
      // dispatch(loading(false));

      return new Promise((rsl) => {
        return rsl(dispatch(error(err.message || 'ERROR')));
      });
    });
