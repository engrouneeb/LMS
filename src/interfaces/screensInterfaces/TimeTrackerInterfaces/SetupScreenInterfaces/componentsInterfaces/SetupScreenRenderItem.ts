export interface SetupScreenRenderItem {
  AddOrEditRef: any;
  index: number;
  setSelectedUser: (val: any) => void;
  user: User;
}

interface User {
  assignmentId: number;
  firstName: string;
  lastName: string;
  role: string;
  userApprovers: string;
  userId: number;
}
