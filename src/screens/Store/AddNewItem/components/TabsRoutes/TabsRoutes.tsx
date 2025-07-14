import { useSelector } from 'react-redux';
import { Appstate } from 'reducers/Appstate';
import { isParent, isStudent } from 'utilities';

export const Tabs = (isShipmentItem: boolean, Showtab: string) => {
  const UserData: any = useSelector((state: Appstate) => state.User.UserInfo);
  const isUserStudent = isStudent(UserData.roleName);
  const isUserParent = isParent(UserData.roleName);
  return (isUserStudent && !isShipmentItem) || (isUserParent && !isShipmentItem)
    ? Showtab == 'form'
      ? [
          { name: 'form', icon: 'file-document-edit-outline' },
          { name: 'description', icon: 'ballot-outline' },
        ]
      : Showtab == 'discussion'
      ? [{ name: 'discussion', icon: 'account-group-outline' }]
      : [{ name: 'attachment', icon: 'attachment' }]
    : isShipmentItem
    ? [
        Showtab == 'discussion'
          ? { name: 'discussion', icon: 'account-group-outline' }
          : Showtab == 'attachment'
          ? { name: 'attachment', icon: 'attachment' }
          : { name: 'form', icon: 'file-document-edit-outline' },
      ]
    : [
        { name: 'form', icon: 'file-document-edit-outline' },
        { name: 'description', icon: 'ballot-outline' },
        { name: 'discussion', icon: 'account-group-outline' },
        { name: 'attachment', icon: 'attachment' },
      ];
};
