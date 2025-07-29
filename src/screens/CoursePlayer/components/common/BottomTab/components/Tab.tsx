import {Bottom_TabInterface} from '../../../../../../interfaces';
import {useCallback} from 'react';
import {Pressable} from 'react-native';
import CommonStyles from '../../../../../CommonStyles';
import {whiteThemeColors} from '../../../../../../Utilities';
import {_Text, _View} from '../../../../../../components';
import {styles} from '../styles';

export const Tab: React.FC<Bottom_TabInterface> = ({
  item,
  onPress,
  currentScreenIndex,
  index: i,
}) => {
  const getActiveTabBg = useCallback(
    () => ({
      backgroundColor:
        currentScreenIndex == i
          ? whiteThemeColors.white
          : whiteThemeColors.greyDark + 20,
    }),
    [currentScreenIndex],
  );

  const getActiveTabTextStyles = useCallback(
    () => ({
      fontFamily:
        currentScreenIndex === i
          ? CommonStyles.fonts.bold
          : CommonStyles.fonts.regular,
      color:
        currentScreenIndex === i
          ? whiteThemeColors.tabs.tabLabelActive
          : whiteThemeColors.tabs.tabLabelNotActive,
    }),
    [currentScreenIndex],
  );

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <_View style={[styles.tabContainer, getActiveTabBg()]}>
        <_Text
          numberOfLines={1}
          style={[styles.tabLabel, getActiveTabTextStyles()]}>
          {item?.label}
        </_Text>
      </_View>
    </Pressable>
  );
};
