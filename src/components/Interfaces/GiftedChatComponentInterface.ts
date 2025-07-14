export interface renderAvatarObjInterface {
  actionSheet?: any;
  alignTop: boolean;
  alwaysShowSend: boolean;
  audioProps: AudioProps;
  bottomOffset: number;
  containerStyle: AudioProps;
  currentMessage: CurrentMessage;
  dateFormat: string;
  disableComposer: boolean;
  extraData?: any;
  forceGetKeyboardHeight: boolean;
  forwardRef: ForwardRef;
  imageProps: AudioProps;
  imageStyle: AudioProps;
  infiniteScroll: boolean;
  inverted: boolean;
  invertibleScrollViewProps: InvertibleScrollViewProps;
  isCustomViewBottom: boolean;
  isKeyboardInternallyHandled: boolean;
  isLoadingEarlier: boolean;
  isTyping: boolean;
  keyboardShouldPersistTaps: string;
  lightboxProps: AudioProps;
  listViewProps: ListViewProps;
  loadEarlier: boolean;
  locale?: any;
  maxComposerHeight: number;
  maxInputLength: number;
  messageIdGenerator: string;
  minComposerHeight: number;
  minInputToolbarHeight: number;
  nextMessage: CurrentMessage;
  onInputTextChanged: string;
  onLoadEarlier: string;
  onLongPress?: any;
  onLongPressAvatar?: any;
  onPressActionButton?: any;
  onPressAvatar?: any;
  onQuickReply: string;
  onSend: string;
  placeholder: string;
  position: string;
  previousMessage: CurrentMessage;
  received: boolean;
  renderAccessory?: any;
  renderActions?: any;
  renderAvatarOnTop: boolean;
  renderBubble: string;
  renderChatEmpty?: any;
  renderChatFooter?: any;
  renderComposer?: any;
  renderCustomView: string;
  renderDay: string;
  renderFooter: string;
  renderInputToolbar: string;
  renderLoadEarlier?: any;
  renderLoading?: any;
  renderMessage?: any;
  renderMessageImage: string;
  renderMessageText: string;
  renderSend: string;
  renderSystemMessage?: any;
  renderTicks: string;
  renderTime: string;
  renderUsernameOnMessage: boolean;
  scrollToBottom: boolean;
  scrollToBottomOffset: number;
  scrollToBottomStyle: AudioProps;
  sent: boolean;
  shouldUpdateMessage: string;
  showAvatarForEveryMessage: boolean;
  showUserAvatar: boolean;
  text: string;
  textInputProps: AudioProps;
  timeFormat: string;
  user: User2;
  videoProps: AudioProps;
  wrapInSafeArea: boolean;
}

interface User2 {
  _id: number;
}

interface ListViewProps {
  onEndReached: string;
  onEndReachedThreshold: number;
}

interface InvertibleScrollViewProps {
  inverted: boolean;
  keyboardShouldPersistTaps: string;
  onKeyboardDidHide: string;
  onKeyboardDidShow: string;
  onKeyboardWillHide: string;
  onKeyboardWillShow: string;
}

interface ForwardRef {
  current: Current;
}

interface Current {
  _captureRef: string;
  _getItem: string;
  _getItemCount: string;
  _keyExtractor: string;
  _listRef: string;
  _reactInternalInstance: string;
  _reactInternals: string;
  _renderer: string;
  _virtualizedListPairs: string;
  context: string;
  props: string;
  refs: string;
  state?: any;
  updater: string;
}

interface CurrentMessage {
  _id: number;
  attachment: string;
  audio: string;
  createdAt: string;
  file: string;
  image: string;
  isRead: boolean;
  isReceived: boolean;
  text: string;
  user: User;
  video: string;
  videoThumbnailURL: string;
}

interface User {
  _id: number;
  avatar: boolean;
  name: string;
}

interface AudioProps {}

export interface UserDataInterface {
  businessCompanyGuid: string;
  companyID: number;
  companySecureUrl: string;
  companyUrl: string;
  email: string;
  firstName: string;
  fullName: string;
  groupName: string;
  initial: string;
  isCheckedIn: boolean;
  isFranchise: boolean;
  isOwner: boolean;
  isValid: boolean;
  lastName: string;
  licenseCmpKey: number;
  roleName: string;
  status: number;
  userColor: string;
  userGuid: string;
  userID: number;
  userImag: string;
  userName: string;
}

export interface chatUserInterface {
  color: string;
  companyKey: number;
  companyName?: any;
  companyType: string;
  fname: string;
  fullName: string;
  image: string;
  index: number;
  isOWner: boolean;
  isUserActive: boolean;
  lastMessage: string;
  lastMsgDateTime: string;
  lname: string;
  notiCount?: any;
  phoneNo?: any;
  unReadMsgCount?: any;
  userGuid: string;
  userId: number;
  userName: string;
}

export interface renderVoiceMessageInterface {
  addPlayBackListener: any;
  addRecordBackListener: any;
  mmss: any;
  mmssss: any;
  pausePlayer: any;
  pauseRecorder: any;
  playerCallback: any;
  removePlayBackListener: any;
  removeRecordBackListener: any;
  resumePlayer: any;
  resumeRecorder: any;
  seekToPlayer: any;
  setSubscriptionDuration: any;
  setVolume: any;
  startPlayer: any;
  startRecorder: any;
  stopPlayer: any;
  stopRecorder: any;
}
