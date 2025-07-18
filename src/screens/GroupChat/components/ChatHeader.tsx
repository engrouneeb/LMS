import React, { FC } from 'react';
import { _View, _VectorIcons, _Text } from '../../../components';
import { TouchableOpacity } from 'react-native';
import { whiteThemeColors } from '../../../Utilities';
import CommonStyles from '../../CommonStyles';
interface Props {
  onBack: () => void;
  name: string;
  members: [];
  onPress: () => void;
}
export const ChatHeader: FC<Props> = ({ onBack, name, members, onPress }) => {
  return (
    <_View
      style={{
        height: '10%',
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
      }}
    >
      <TouchableOpacity
        onPress={onBack}
        style={{
          width: 30,
          height: 30,
          backgroundColor: whiteThemeColors.primary,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 7,
        }}
      >
        <_VectorIcons
          type={'Ionicons'}
          name='ios-arrow-back'
          color={whiteThemeColors.white}
          size={20}
        />
      </TouchableOpacity>
      <_View style={{ marginLeft: 20 }}>
        <_Text
          style={{
            fontFamily: CommonStyles.fonts.semiBold,
            fontSize: 16,
          }}
        >
          {name}
        </_Text>
        <_Text
          style={{
            fontFamily: CommonStyles.fonts.regular,
            fontSize: 12,
            color: 'gray',
          }}
        >
          {`${members.length} members`}
        </_Text>
      </_View>
      <TouchableOpacity
        style={{
          width: 30,
          height: 30,
          backgroundColor: whiteThemeColors.white,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 7,
          position: 'absolute',
          right: 10,
        }}
        onPress={onPress}
      >
        <_VectorIcons
          type={'AntDesign'}
          name='setting'
          color={whiteThemeColors.primary}
          size={18}
        />
      </TouchableOpacity>
    </_View>
  );
};
