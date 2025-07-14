export interface MesssageReducerInterface {
  readonly MessagesCount: count;
  readonly ContactMessage: count;
  readonly StudentMessage: count;
  readonly InstructorMessage: count;
  readonly StaffMessage: count;
  readonly FranchiseMessage: count;
  readonly AdminMessage: count;
}
interface count {
  Count: number;
}
const initialState: MesssageReducerInterface = {
  MessagesCount: { Count: 0 },
  ContactMessage: { Count: 0 },
  StudentMessage: { Count: 0 },
  InstructorMessage: { Count: 0 },
  StaffMessage: { Count: 0 },
  FranchiseMessage: { Count: 0 },
  AdminMessage: { Count: 0 },
};
const messagesReducer = (
  state: MesssageReducerInterface = initialState,
  action: any,
): MesssageReducerInterface => {
  switch (action.type) {
    case 'MessagesCount':
      var newMessages = state.MessagesCount;
      newMessages.Count = action.data;
      return { ...state, MessagesCount: newMessages };

    case 'ContactMessage':
      var newMessages = state.ContactMessage;
      newMessages.Count = action.data;
      return { ...state, ContactMessage: newMessages };

    case 'StudentMessage':
      var newMessages = state.StudentMessage;
      newMessages.Count = action.data;
      return { ...state, StudentMessage: newMessages };

    case 'InstructorMessage':
      var newMessages = state.InstructorMessage;
      newMessages.Count = action.data;
      return { ...state, InstructorMessage: newMessages };

    case 'StaffMessage':
      var newMessages = state.StaffMessage;
      newMessages.Count = action.data;
      return { ...state, StaffMessage: newMessages };

    case 'FranchiseMessage':
      var newMessages = state.FranchiseMessage;
      newMessages.Count = action.data;
      return { ...state, FranchiseMessage: newMessages };

    case 'AdminMessage':
      var newMessages = state.AdminMessage;
      newMessages.Count = action.data;
      return { ...state, AdminMessage: newMessages };
    case 'reset':
      var resetState = {
        MessagesCount: { Count: 0 },
        ContactMessage: { Count: 0 },
        StudentMessage: { Count: 0 },
        InstructorMessage: { Count: 0 },
        StaffMessage: { Count: 0 },
        FranchiseMessage: { Count: 0 },
        AdminMessage: { Count: 0 },
      };
      return Object.assign(state, resetState);
    default:
      return state;
  }
};

export default messagesReducer;
