import { ScheduleCardPublishButtonInterface } from 'interfaces';
import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _VectorIcons } from '../../../../../../../components';
import { useAppModulePermission } from '../../../../../../../customHooks';
export const PublishButton: FC<ScheduleCardPublishButtonInterface> = ({
  setShowRecoverModal,
  showPublishBtn,
  index1,
  setIndexVal,
}) => {
   const { filterMenuOptions } = useAppModulePermission();
  const isPublishSchedule=filterMenuOptions("PublishSchedule");
  return showPublishBtn &&isPublishSchedule? (
    <TouchableOpacity
      activeOpacity={0.3}
      style={styles.btnContainer}
      onPress={() => {
        setIndexVal(index1);
        setShowRecoverModal(true);
      }}
    >
      <_VectorIcons
        type='MaterialCommunityIcons'
        name='format-indent-increase'
        size={25}
        color={whiteThemeColors.primary}
      />
    </TouchableOpacity>
  ) : null;
};

const styles = StyleSheet.create({
  btnContainer: {
    marginRight: 10,
  },
});
