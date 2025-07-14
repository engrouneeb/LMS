import {
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
  ViewProps,
  TextProps,
} from 'react-native';
import { SpacingProps } from './spacing-props';
import { Tab } from './store-interfaces';

export interface ButtonIntefaces
  extends ViewStyle,
    TextStyle,
    TouchableOpacityProps {
  isBlock?: boolean;
  transparent?: boolean | undefined;
  style?: (TextStyle & ViewStyle) | any;
  width?: string | number;
  submitting?: boolean;
  borderRadius?: number;
  callback: () => void;
  BtnTxt?: TextStyle | any;
  loaderColor?: string;
  btnText?: string;
}
// export
interface props extends ViewProps, ViewStyle {
  justify?: any;
}
export type ViewInterfaces = SpacingProps & props & ViewStyle;
export interface TextInterfaces extends TextStyle {
  style?: TextStyle | any;
  size?: any | {};
  margin?: any;
  numberOfLines?: number;
  cutText?: any;
  onPress?: () => void;
  children?: React.ReactNode;
}

export interface VectorIconsInterfaces {
  type: string;
  name: string;
  size?: number;
  color?: string;
  style?: any;
}

interface prop extends ViewProps {
  background?: boolean;
  header?: JSX.Element[] | JSX.Element;
  hideTopSafeArea?: boolean;
  hideBottomSafeArea?: boolean;
  topSafeAreaColor?: string;
  bottomSafeAreaColor?: string;
  align?: any;
  justify?: any;
  disableAndroidBack?: any;
  flex?: number;
  onAndroidBack?: () => boolean;
  backgroundColor?: string;
}
export type ScreenInterfaces = SpacingProps & prop;
export interface ProgressBarInterfaces {
  starText?: string;
  showText?: boolean;
  percentage: any;
  starTextDisplay: 'none' | 'flex' | undefined;
  barColor: string;
}

export interface TabTypes {
  name: string;
  id?: number;
  icon?: string;
}
export interface TopTabsInterfaces {
  activeTab?: Tab;
  setActiveTab?: (val: TabTypes) => void;
  tabs: any;
  cartItems?: any[];
  showTabName?: boolean;
  isDisable?: boolean;
  showIcon?: boolean;
  setitem?: (item: []) => void;
}
export interface UserProfileInterfaces {
  modalVisible: boolean;
  setModalVisible: (val: boolean) => void;
  user: {
    userId: number;
    fname: string;
    lname: string;
    image: any;
    fullName: string;
  };
  isStudent: boolean;
}

export interface UserDetailsProps {
  email: string;
  phoneNo: string;
  parentFullName: string;
  parentPhoneNo: number;
  parentEmail: string;
}
export interface EndpointType {
  url: string;
  params?: any;
}

export interface StyleTextBoxProps extends TextProps {
  placeholder: string;
  value: string;
  placeholderTextColor?: string;
  width?: string | number;
  showEyeIcon?: boolean;
  onChangeSecureTextEntry?: () => void;
  secureTextEntry?: boolean;
  onChangeText: (txt: string) => void;
}

export interface Tag {
  tagName?: string;
  tagColor: string;
  text?: string;
}

export interface TagsDropdownTypes {
  allTags: [Tag];
  tagText: string;
  inventoryTags: [Tag];
  setTagText: (val: string) => void;
  submitTag: () => void;
}
export interface OopsModalProps {
  visible: boolean;
  setVisible: (val: boolean) => void;
  alertMessage: string;
}
export interface SingleTab {
  name: string;
  id: number;
}
export interface TopMiniTabsProps {
  activeTab: SingleTab;
  setActiveTab: (val: SingleTab) => void;
  tabs: SingleTab[];
  groupsCount?: number;
  isForGroupChat?: boolean;
}
