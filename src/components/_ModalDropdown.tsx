import React from 'react';
import ModalDropdown from 'react-native-modal-dropdown';
import { whiteThemeColors } from '../Utilities';
import { _View, _VectorIcons } from '.';
interface props {
  isdisable?: boolean;
  item?: any;
  label?: string;
  style?: any;
  height?: number | string;
  dropdownStyle?: any;
  onselected?: (index: string) => void;
  textStyle?: any;
  isRow?: boolean;
  renderRow?: any;
  defaultTextStyle?: any;
  multipleSelect?: boolean;
  isborder?: boolean;
  defaultIndex?: number;
  dropdownTextStyle?: any;
  bgColor?: string;
  dropdownTextHighlightStyle?: any;
  ref?: any;
  width?: number | string;
  selectedValue?: string | number;
  showIconBackground?: boolean;
}
export const _ModalDropdown: React.FC<props> = ({
  isdisable,
  item,
  label,
  style,
  height,
  dropdownStyle,
  onselected,
  textStyle,
  isRow,
  renderRow,
  defaultTextStyle,
  multipleSelect = false,
  isborder,
  defaultIndex,
  dropdownTextStyle,
  bgColor,
  dropdownTextHighlightStyle,
  width,
  selectedValue,
  showIconBackground = true,
  ref,
}) => {
  return (
    <_View
      style={{
        height: 40,
        width: '100%',

        borderRadius: 5,
        backgroundColor: bgColor ? bgColor : whiteThemeColors.white,
        alignSelf: 'center',
        borderWidth: isborder ? 0.5 : undefined,
        borderColor: whiteThemeColors.greyLite,
        justifyContent: 'center',
      }}
    >
      <ModalDropdown
        ref={ref}
        defaultIndex={defaultIndex}
        multipleSelect={multipleSelect}
        showsVerticalScrollIndicator={false}
        saveScrollPosition={false}
        disabled={isdisable}
        options={item}
        defaultValue={
          selectedValue != undefined && selectedValue >= 0
            ? item[+selectedValue]
            : label
        }
        style={style}
        dropdownTextStyle={dropdownTextStyle}
        dropdownTextHighlightStyle={dropdownTextHighlightStyle}
        dropdownStyle={[
          dropdownStyle,
          {
            height: height,
          },
        ]}
        defaultTextStyle={
          defaultTextStyle ? defaultTextStyle : { width: '100%' }
        }
        onSelect={(val: string) => {
          onselected?.(val);
        }}
        textStyle={textStyle}
        renderRow={isRow ? renderRow : undefined}
        renderRightComponent={() =>
          showIconBackground ? (
            <_View
              style={{
                width: 51,
                height: height ? height : 45,
                // backgroundColor: whiteThemeColors.primary + 40,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: -40,
              }}
            >
              <_VectorIcons
                type={'Feather'}
                name={'chevron-down'}
                size={25}
                color={whiteThemeColors.black}
                style={{}}
              />
            </_View>
          ) : (
            <_VectorIcons
              type={'Feather'}
              name={'chevron-down'}
              size={25}
              color={whiteThemeColors.black}
              style={{}}
            />
          )
        }
      />
    </_View>
  );
};
