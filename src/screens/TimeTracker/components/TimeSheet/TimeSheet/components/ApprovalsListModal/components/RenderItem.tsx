import { ApprovalsListModalRenderItemInterface } from 'interfaces';
import React from 'react';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Text, _View } from '../../../../../../../../components';

export const RenderItem: React.FC<ApprovalsListModalRenderItemInterface> = ({
  Obj,
}) => {
  return (
    <_View style={{ margin: 2, flex: 1 }}>
      <_View style={styles.modelCard} key={Obj}>
        <_View
          style={{
            flex: 0.26,
          }}
        >
          <_View style={styles.avatarContainer}>
            <_Text style={styles.avatarLetter}>{Obj.substring(0, 1)}</_Text>
          </_View>
        </_View>
        <_View style={{ flex: 1, justifyContent: 'center' }}>
          <_Text style={styles.userNameTxt}>{Obj}</_Text>
        </_View>
      </_View>
    </_View>
  );
};
const styles = StyleSheet.create({
  modelCard: {
    height: 60,
    padding: 0,
    margin: 0,
    borderBottomWidth: 1,
    borderColor: whiteThemeColors.blueLite,
    borderRadius: 5,
    flexDirection: 'row',
  },
  avatarContainer: {
    backgroundColor: whiteThemeColors.timeSheet.borderColor,
    height: 50,
    borderRadius: 25,
    width: 50,
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarLetter: {
    textTransform: 'capitalize',
    fontSize: 20,
    fontWeight: '400',
    color: whiteThemeColors.textColor.whiteText,
  },
  userNameTxt: {
    fontSize: 16,
    fontWeight: '300',
    marginLeft: 15,
    marginTop: 5,
    textAlign: 'left',
    color: whiteThemeColors.textColor.primaryText,
  },
});
