export interface TimeTrackerRequestCoverCommentModalInterface {
  commentFor: string;
  modalComment: string;
  modalVisible: boolean;
  onCloseModalCallBack: () => void;
  setModalComment: (txt: string) => void;
  setModalVisible: (isvisible: boolean) => void;
}
