export interface AddOrEditInterface {
  assignmentId: number;
  handleSaveApprovals: any;
  selectedUserIndex: number;
  users: User[];
  approvers?: any;
  ref: any;
}

interface User {
  assignmentId: number;
  firstName: string;
  lastName: string;
  role: string;
  userApprovers: string;
  userId: number;
}
