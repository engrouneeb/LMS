export interface VoiceMsgProps {
  showVoiceMsg: boolean;
  setVoiceMsg: (value: boolean) => void;
  onSendVoiceMsg: (value1: number, value2: onSendVoiceMsgInterface) => void;
}

export interface onSendVoiceMsgInterface {
  attachKey?: number;
  status: number;
  thumbnailURL?: string;
  url?: string;
  error?: any;
  error_description?: string;
}
