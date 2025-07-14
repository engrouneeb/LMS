import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Appstate } from 'reducers/Appstate';
import { isAdmin } from 'utilities';
import {NewStore} from "./NewStore"
import StoreAdminOptions from './StoreAdminOptions/StoreAdminOptions';
export const Store: FC = () => {
  let UserData: any = useSelector((state: Appstate) => state?.User.UserInfo);
  const isUserAdmin = isAdmin(UserData?.roleName);
  //  return <StoreAdminOptions isUserAdmin={isUserAdmin} />;
  return <NewStore/>;
};
