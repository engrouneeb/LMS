import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Appstate } from '../reducers/Appstate';

const useFindPermissions = (permissionType: any) => {
  const ModulePagesPermissions = useSelector(
    (state: Appstate) => state?.ModulePagesPermissions?.data,
  );
  const [userPermissions, setUserPermissions] = useState(null);

  useEffect(() => {
    let Permissions = ModulePagesPermissions?.filter(
      (item: any) => item?.prm_function_key === permissionType,
    );

    Boolean(Permissions) && setUserPermissions(Permissions[0]?.pageActions);
  }, [permissionType, ModulePagesPermissions]);
  return [userPermissions];
};

export { useFindPermissions };
