import { HomeworkActions } from '../../actions/HomeworkAction';
export interface HomeworkReducerInterface {
  readonly homeworkLoading: boolean;
  readonly homeworkSuccess: boolean;
  readonly homeworkFailed: boolean;
  readonly homeworkProgress: boolean;
  readonly data?: any;
}
const initialState: HomeworkReducerInterface = {
  homeworkLoading: false,
  homeworkSuccess: false,
  homeworkFailed: false,
  homeworkProgress: false,
  data: [],
};

const HomeworkReducer = (
  state: HomeworkReducerInterface = initialState,
  actions: any,
): HomeworkReducerInterface => {
  switch (actions.type) {
    case HomeworkActions.HOMEWORK_LOADING:
      return {
        ...state,
        homeworkLoading: true,
        homeworkSuccess: false,
        homeworkFailed: false,
        homeworkProgress: false,
        data: [],
      };

    case HomeworkActions.HOMEWORK_SUCCESS:
      return {
        ...state,
        homeworkLoading: false,
        homeworkSuccess: true,
        homeworkFailed: false,
        homeworkProgress: true,
        data: actions.payload,
      };

    case HomeworkActions.HOMEWORK_FAILED:
      return {
        ...state,
        homeworkLoading: false,
        homeworkSuccess: false,
        homeworkFailed: true,
        homeworkProgress: false,
        data: [],
      };

    case HomeworkActions.HOMEWORK_STATUS_UPDATE:
      let homewoks: any = [...state.data];
      let index: any = homewoks.findIndex(
        (Obj: any) => Obj.homeworkId == actions.payload,
      );
      if (index != -1) homewoks[index].isSubmitted = true;
      return {
        ...state,
        homeworkLoading: false,
        homeworkSuccess: false,
        homeworkFailed: false,
        data: homewoks,
      };

    default:
      return state;
  }
};

export default HomeworkReducer;
