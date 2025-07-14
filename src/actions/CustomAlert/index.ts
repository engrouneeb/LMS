export const CustomAlertActions = {
  ALERT_SHOW: 'ALERT_SHOW',
  ALERT_HIDE: 'ALERT_HIDE',
};

export const alertShow = (payload: any) => ({
  type: CustomAlertActions.ALERT_SHOW,
  payload,
});

export const alertHide = () => ({ type: CustomAlertActions.ALERT_HIDE });
