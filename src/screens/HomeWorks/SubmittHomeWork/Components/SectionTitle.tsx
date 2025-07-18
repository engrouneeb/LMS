import { _View, _VectorIcons, _Text } from '../../../../components';
import { FC } from 'react';
import CommonStyles from '../../../../screens/CommonStyles';
import { whiteThemeColors } from '../../../../Utilities';

interface SectionTitleInterface {
  icon: {
    name: string;
    type: string;
  };
  title: string;
}

export const SectionTitle: FC<SectionTitleInterface> = ({ icon, title }) => {
  return (
    <_View
      style={{
        width: 'auto',
        borderBottomColor: whiteThemeColors.greyDark,
        paddingBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 10,
        marginBottom: 10,
      }}
    >
      {/* <_VectorIcons
        name={icon.name}
        type={icon.type}
        color={whiteThemeColors.primaryDark}
        size={17}
      /> */}
      <_Text
        style={{
          fontSize: 16,
          color: whiteThemeColors.primaryDark,
          fontFamily: CommonStyles.fonts.semiBold,
          letterSpacing: 1,
          marginLeft: 5,
        }}
      >
        {title}
      </_Text>
    </_View>
  );
};
