import { Dimensions } from 'react-native';
export const intialState = {
  numberOfStacks: 0,
  challengeList: [],
  assessmentList: [],
  reportData: {},
  pieChartData: [],
  stackBarChartData: [],
  stackBarChartWidth: Dimensions.get('window').width,
  isLoading: false,
};
export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'numberOfStacks':
      return { ...state, numberOfStacks: action.data };
    case 'challengeList':
      return { ...state, challengeList: action.data };
    case 'assessmentList':
      return { ...state, assessmentList: action.data };
    case 'reportData':
      return { ...state, reportData: action.data };
    case 'pieChartData':
      return { ...state, pieChartData: action.data };
    case 'stackBarChartData':
      return { ...state, stackBarChartData: action.data };
    case 'stackBarChartWidth':
      return { ...state, stackBarChartWidth: action.data };
    case 'isLoading':
      return { ...state, isLoading: action.data };
    default:
      return state;
  }
};
