import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { endpoint } from 'components';
import { getUniqueId } from 'react-native-device-info';
import { Domain } from '../src/reducers/BaseUrl';
import EndPoints from './ApiEndpoints';
var IsRefreshTokenCal: boolean = false;
export const getToken = async () => {
  let Token: any = await AsyncStorage.getItem('@UserAuth');
  Token = await JSON.parse(Token);
  let tok = '';
  if (Token?.token) {
    tok = `bearer ${Token.token}`;
  }
  return tok;
};

let timeoffset = -(new Date().getTimezoneOffset() / 60) * 60;
export const DataAccess = () => {
  const checkErrorCodes = async (error: any) => {
    if (error.response.status === 401) {
      //server codes for catch
      const res = await RefreshToken();
      if (res) {
        return { status: true };
      }
      {
        await AsyncStorage.setItem('userState', 'Auth');
        await AsyncStorage.setItem('FirebaseToken', '');
        return ErrorResponse(error.response);
      }
    } else {
      return ErrorResponse(error.response);
    }
  };
  const GetUnSecured = async (FetchData: endpoint) => {
    var URL = Domain + FetchData.url;
    if (FetchData.params) {
      URL = URL + FetchData.params;
    }
    try {
      let response = await axios.get(URL, {
        headers: {
          'Content-Type': 'application/json',
          TimeOffset: timeoffset.toString(),
        },
      });
      return response?.data;
    } catch (error) {
      return error;
    }
  };
  const Post = async (URL: string, params: any) => {
    try {
      let response = await axios.post(Domain + URL, JSON.stringify(params), {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          TimeOffset: timeoffset.toString(),
        },
      });
      return response?.data;
    } catch (error) {
      return false;
    }
  };
  const PostSecured = async (
    FetchData: endpoint,
    params: any,
    logoutToken?: string,
  ): Promise<any> => {
    var URL = Domain + FetchData.url;
    let Token = await getToken();
    try {
      if (!Token) {
        return false;
      }
      if (!IsRefreshTokenCal) {
        let response = await axios.post(URL, JSON.stringify(params), {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            TimeOffset: timeoffset.toString(),
            Authorization: logoutToken ? logoutToken : Token,
          },
        });
        return response?.data;
      } else {
        await sleep(200);
        return await PostSecured(FetchData, params, Token);
      }
    } catch (error) {
      const res = await checkErrorCodes(error);
      if (res?.status) {
        return await PostSecured(FetchData, params, Token);
      }
      return res;
    }
  };
  const PostSecuredFormData = async (
    FetchData: endpoint,
    data: any,
  ): Promise<any> => {
    var URL = Domain + FetchData.url;
    let Token = await getToken();
    try {
      if (!Token) {
        return false;
      }
      if (!IsRefreshTokenCal) {
        if (Token != null) {
          let response = await axios.post(URL, data, {
            headers: {
              Accept: 'application/json',
              TimeOffset: timeoffset.toString(),
              'Content-Type': 'multipart/form-data',
              Authorization: Token,
            },
          });
          return response?.data;
        }
      } else {
        await sleep(200);
        return await PostSecuredFormData(FetchData, data);
      }
    } catch (error) {
      const res = await checkErrorCodes(error);
      if (res?.status) {
        return await PostSecuredFormData(FetchData, data);
      }
      return res;
    }
  };
  const PostSecuredWithParams = async (
    FetchData: endpoint,
    params: any,
  ): Promise<any> => {
    var URL = Domain + FetchData.url + params;
    let Token = await getToken();
    try {
      if (!Token) {
        return false;
      }
      if (!IsRefreshTokenCal) {
        let response = await axios.post(
          URL,
          {},
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              TimeOffset: timeoffset.toString(),
              Authorization: Token,
            },
          },
        );
        return response?.data;
      } else {
        await sleep(200);
        return await PostSecuredWithParams(FetchData, params);
      }
    } catch (error) {
      const res = await checkErrorCodes(error);
      if (res?.status) {
        return await PostSecuredWithParams(FetchData, params);
      }
      return res;
    }
  };
  const Get = async (FetchData: endpoint): Promise<any> => {
    var URL = Domain + FetchData.url;
    if (FetchData.params) {
      URL = URL + FetchData.params;
    }
    let Token = await getToken();
    try {
      if (!Token) {
        return false;
      }
      if (!IsRefreshTokenCal) {
        let response = await axios.get(URL, {
          headers: {
            'Content-Type': 'application/json',
            TimeOffset: timeoffset.toString(),
            Authorization: Token,
          },
        });
        return response?.data;
      } else {
        await sleep(200);
        return await Get(FetchData);
      }
    } catch (error) {
      const res = await checkErrorCodes(error);
      if (res?.status) {
        return await Get(FetchData);
      }
      return res;
    }
  };
  const RefreshToken = async () => {
    if (IsRefreshTokenCal) {
      return { status: 200 };
    }
    UpdateIsRefreshTokenCal(true);
    try {
      let token: any = await AsyncStorage.getItem('@UserAuth');
      if (!token) {
        return false;
      }
      token = await JSON.parse(token);
      let deviceId = getUniqueId();
      let params = {
        token: token?.token,
        refreshToken: token?.refreshToken,
        deviceId: deviceId,
      };
      let response = await axios.post(
        Domain + EndPoints.GetRefreshToken.url,
        JSON.stringify(params),
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            TimeOffset: timeoffset.toString(),
          },
        },
      );
      if (response) {
        let data = {
          token: response?.data.token,
          refreshToken: response?.data.refreshToken,
        };
        await AsyncStorage.setItem('@UserAuth', JSON.stringify(data));
        UpdateIsRefreshTokenCal(false);
      }
      return true;
    } catch (error) {
      return false;
    }
  };
  const CheckIsTokenValid = async () => {
    let Token = await getToken();
    try {
      if (Token) {
        let url = Domain + EndPoints.CheckIsTokenValid.url;
        await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            TimeOffset: timeoffset.toString(),
            Authorization: Token,
          },
        });
        return true;
      } else {
        return true;
      }
    } catch (error) {
      if (error.response.status === 401) {
        return false;
      }
    }
  };
  return {
    GetUnSecured,
    Post,
    PostSecured,
    PostSecuredFormData,
    PostSecuredWithParams,
    Get,
    RefreshToken,
    CheckIsTokenValid,
  };
};

const UpdateIsRefreshTokenCal = (isRefToknCal: boolean) => {
  IsRefreshTokenCal = isRefToknCal;
};
const sleep = async (msec: any) => {
  return new Promise((resolve) => setTimeout(resolve, msec));
};

const ErrorResponse = async (response: any) => {
  response = {
    error: 'Error',
    status: false,
    error_description:
      'Unable to process your request Please contact your admin',
  };
  return response;
};
