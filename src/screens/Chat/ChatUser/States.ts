import { intialChatUsersScreenStateInterface } from '../../../interfaces';
export const intialState: intialChatUsersScreenStateInterface = {
  loading: true,
  userList: [],
  secured: [],
  skip: 0,
  error: null,
  refreshing: false,
  hasScrolled: false,
  chatUsers: [],
  filteredData: [],
  onlineUsers: [],
  chatFor: 0,
  hasMoreData: true,
  allUsersLoaded: false,
  showUserProfileModal: false,
  showUserProfile: {
    userId: 0,
    fname: '',
    lname: '',
    image: undefined,
    fullName: '',
  },
};

export type payloadData =
  | boolean
  | any[]
  | number
  | {
      userId: number;
      fname: string;
      lname: string;
      image: any;
      fullName: string;
    };

export type payloadType = {
  type:
    | 'userList'
    | 'secured'
    | 'loading'
    | 'userList'
    | 'secured'
    | 'skip'
    | 'error'
    | 'refreshing'
    | 'hasScrolled'
    | 'chatUsers'
    | 'filteredData'
    | 'onlineUsers'
    | 'chatFor'
    | 'hasMoreData'
    | 'allUsersLoaded'
    | 'showUserProfileModal'
    | 'showUserProfile'
    | 'resetIntial';
  data: boolean | any[] | number | any;
};

export const reducer = (
  state: intialChatUsersScreenStateInterface,
  payload: payloadType
) => {
  if (payload.type === 'resetIntial') return intialState;
  if (Object.keys(state).includes(payload.type))
    return { ...state, [payload.type]: payload.data };
  console.log({ 'Does not exist(action.type)': payload.type });
  return state;
};
