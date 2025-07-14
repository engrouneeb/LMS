import { FC } from 'react';
import { StyleSheet, Switch } from 'react-native';
import { _Text, _View } from '../../../../../components';
import { whiteThemeColors } from 'utilities';
import { RejectedSwitchInterface } from 'interfaces';
import CommonStyles from 'screens/CommonStyles';

const TrackerColor = {
  false: '#767577',
  true: whiteThemeColors.primary,
};

export const RejectedSwitch: FC<RejectedSwitchInterface> = ({
  rejectVisible,
  setRejectVisible,
}) => {
  return (
    <_View width={'100%'}>
      <_View style={styles.rejectText}>
        <_Text style={{ fontFamily: CommonStyles.fonts.medium }} size={13}>
          Rejected
        </_Text>
        <Switch
          style={styles.switchStyles}
          trackColor={TrackerColor}
          thumbColor={whiteThemeColors.white}
          ios_backgroundColor={whiteThemeColors.shadow}
          onValueChange={(status: boolean) => setRejectVisible(status)}
          value={rejectVisible}
        />
      </_View>
    </_View>
  );
};

const styles = StyleSheet.create({
  rejectText: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 5,
    flexDirection: 'row',
  },
  switchStyles: {
    transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }],
  },
});
