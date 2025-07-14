import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Text, _View } from '../../../components';
import { styles } from './styles';
import CommonStyles from 'screens/CommonStyles';
interface props {
  index: number;
  text: any;
  onSelect: (ind: number) => void;
  selected: any;
}
const ListView: React.FC<props> = ({ index, text, onSelect, selected }) => {
  const [focus, setFocus] = useState(false);

  const onPress = () => onSelect(index);
  const onPressIn = () => setFocus(true);
  const onPressOut = () => setFocus(false);

  return (
    <_View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[
          // styles.textBtn,
          {
            borderBottomWidth: 0.5,
            borderColor: 'lightgray',
            paddingBottom: 10,
            backgroundColor:
              selected === text
                ? whiteThemeColors.primary
                : whiteThemeColors.white,
          },
        ]}
      >
        <_Text
          style={[
            styles.text,
            {
              fontFamily: CommonStyles.fonts.medium,
              color:
                focus || selected == text
                  ? whiteThemeColors.white
                  : whiteThemeColors.black + '99',
            },
          ]}
        >
          {text}
        </_Text>
      </TouchableOpacity>
    </_View>
  );
};

export default ListView;
