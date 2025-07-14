export interface timerInterface {
  isRunning: boolean;
  elapsedTime: number;
  startTime: number | null;
  isShow: boolean;
}

export const timerInitialState: timerInterface = {
  isRunning: false,
  elapsedTime: 0,
  startTime: null,
  isShow: false,
};
