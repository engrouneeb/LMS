import React, { FC, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import IconBadge from 'react-native-icon-badge';
import { useDispatch, useSelector } from 'react-redux';
import { whiteThemeColors } from '../../../Utilities';
import { setMessagesCount } from '../../../actions/MessengerActions';
import { _Text, _View } from '../../../components';
import { Appstate } from '../../../reducers/Appstate';
import MsgScreenMeta from './MsgScreenMeta';
import { chatForInterface } from '../../../interfaces';

export const BadgeComponent: FC<chatForInterface> = ({ chatFor }) => {
  const Messages = useSelector((state: Appstate) => state.messages);
  const _findCount = (chatFor: number) => {
    switch (chatFor) {
      case MsgScreenMeta.Contacts:
        return ShowCount(Messages.ContactMessage.Count);
      case MsgScreenMeta.Staff:
        return ShowCount(Messages.StaffMessage.Count);
      case MsgScreenMeta.Students:
        return ShowCount(Messages.StudentMessage.Count);
      case MsgScreenMeta.FranchiseOwners:
        return ShowCount(Messages.FranchiseMessage.Count);
      case MsgScreenMeta.Instructors:
        return ShowCount(Messages.InstructorMessage.Count);
      case MsgScreenMeta.Admin:
        return ShowCount(Messages.AdminMessage.Count);
      default:
        return;
    }
  };
  const ShowCount = (Count: number) => {
    let msgCount =
      Messages.AdminMessage.Count +
      Messages.FranchiseMessage.Count +
      Messages.InstructorMessage.Count +
      Messages.ContactMessage.Count +
      Messages.StaffMessage.Count +
      Messages.StudentMessage.Count;
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(setMessagesCount(msgCount));
    }, [Count]);

    return Count > 0 ? (
      <_View style={style.container}>
        <IconBadge
          MainElement={<_View style={style.badge} />}
          BadgeElement={<_Text style={style.countText}>{Count}</_Text>}
          IconBadgeStyle={style.iconBadge}
          Hidden={Count == 0 || Count == null}
        />
      </_View>
    ) : null;
  };
  return <>{_findCount(chatFor)}</>;
};
const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 1,
    left: 60,
  },
  badge: {
    width: 5,
    height: 5,
  },
  countText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: whiteThemeColors.white,
  },
  iconBadge: {
    width: 22,
    height: 22,
    backgroundColor: whiteThemeColors.red,
    borderWidth: 1.5,
    borderColor: whiteThemeColors.white,
  },
});
