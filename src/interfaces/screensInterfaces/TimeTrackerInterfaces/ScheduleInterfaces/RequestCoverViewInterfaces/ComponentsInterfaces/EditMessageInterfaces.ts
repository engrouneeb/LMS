export interface EditMessageInterface {
  handleMsgInputState: (state: any) => void;
  setMessage: (txt: string) => void;
  message: string;
  msgInputState: boolean;
  loading: boolean;
}
