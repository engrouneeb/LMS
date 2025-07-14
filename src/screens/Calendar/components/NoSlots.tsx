import { FC } from 'react';
import { StyleSheet } from 'react-native';

import { _Text, _VectorIcons, _View } from 'components';
import { whiteThemeColors } from 'utilities';
import CommonStyles from '../../CommonStyles';

interface NoSlotsProps {
  loading: boolean;
}

export const NoSlots: FC<NoSlotsProps> = ({ loading }) => {
  return (
    <_View justify='center' alignItems='center'>
      {!loading && (
        <>
          <_VectorIcons
            type={'MaterialCommunityIcons'}
            name={'timetable'}
            size={100}
            color={whiteThemeColors.primary}
          />
          <_Text style={styles.heading}>No slot available</_Text>
        </>
      )}
    </_View>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: whiteThemeColors.primary,
    fontSize: 12,
    fontFamily: CommonStyles.fonts.semiBold,
    textAlign: 'center',
  },
});
