import { includes, some } from 'lodash/collection';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Dimensions,
  Keyboard,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { hasNotch, isTablet } from 'react-native-device-info';
import { getWidth, whiteThemeColors } from 'utilities';
import { _TextInput, _VectorIcons, _View, isPortrait } from '../../components';
import CommonStyles from 'screens/CommonStyles';
interface props {
  data?: any;
  searchKey: string;
  onInputChange?: (data: any) => void;
  onChangeText?: (data: any) => void;
  inPos: number;
  outPos: number;
  width?: number | string;
  height: number;
  animSpeed?: number;
  onClose: () => void;
  isVisible?: boolean;
  showCross: boolean;
}
// const Search: React.FC<props> = forwardRef(
//   (
//     {
//       // visible = false,
//       data,
//       searchKey,
//       onInputChange,
//       onChangeText,
//       inPos,
//       outPos,
//       width,
//       height,
//       animSpeed,
//       onClose,
//     },
//     ref,
//   ) => {
//     let searchKeys = searchKey.split(',');
//     let searchKey1 = searchKeys[0];
//     let searchKey2 = searchKeys.length > 1 ? searchKeys[1] : '';
//     // changeSearchState,
//     const [searchData, setSearchData] = useState(data);
//     const [_visible, setVisibleState] = useState(false);
//     const [headerValue, setHeaderValue] = useState(
//       Platform.OS == 'android' && isPortrait()
//         ? height - 1
//         : hasNotch()
//         ? height - 11
//         : height - 13,
//     );

//     const checkDeviceWithDimension = () => {
//       if (isTablet()) {
//         isPortrait()
//           ? setHeaderValue(height + 30)
//           : setHeaderValue(height + 15);
//       } else {
//         if (Platform.OS == 'android') {
//           isPortrait()
//             ? setHeaderValue(height + 10)
//             : setHeaderValue(height + 15);
//         } else {
//           isPortrait()
//             ? setHeaderValue(height + 40)
//             : setHeaderValue(height + 15);
//         }
//       }
//     };

//     useImperativeHandle(ref, () => ({
//       changeVisibleState() {
//         setVisibleState(!_visible);
//         // filterData("");
//         onInputChange && onInputChange(data);
//       },
//       closeSearch() {
//         filterData();
//         return setVisibleState(false);
//       },
//       isOpen() {
//         return _visible;
//       },
//     }));

//     useMemo(() => {
//       if (_visible === false) {
//         Keyboard.dismiss();
//       }
//     }, [_visible]);

//     useEffect(() => {
//       if (data) setSearchData(data);
//       checkDeviceWithDimension();
//     }, [data]);
//     useEffect(() => {
//       const subs = Dimensions.addEventListener('change', () => {
//         checkDeviceWithDimension();
//       });
//       return () => subs.remove();
//     }, []);
//     let topPos = useRef(new Animated.Value(-170)).current;

//     useEffect(() => {
//       if (_visible === true) {
//         Animated.timing(topPos, {
//           // toValue: getHeight(`${inPos}`),
//           toValue: inPos,
//           duration: animSpeed,
//           useNativeDriver: false,
//         }).start();
//       } else {
//         Animated.timing(topPos, {
//           // toValue: getHeight(`${outPos}`),
//           toValue: outPos,
//           duration: animSpeed,
//           useNativeDriver: false,
//         }).start();
//       }
//     }, [_visible]);

//     const _internalSearch = (input: any) => {
//       let inputToLower = input.toLowerCase();
//       if (searchKey2 == '') {
//         return data?.filter(
//           (obj: any) =>
//             obj[searchKey1]?.toLowerCase().indexOf(inputToLower) > -1,
//         );
//       } else {
//         return data?.filter(
//           (obj: any) =>
//             obj[searchKey1]?.toLowerCase().indexOf(inputToLower) > -1 ||
//             obj[searchKey2]?.toLowerCase().indexOf(inputToLower) > -1,
//         );
//       }
//     };

//     const depthFirstSearch = (collection: any, input: any) => {
//       //recursive call
//       let type = typeof collection;
//       if (type === 'string' || type === 'number' || type === 'boolean') {
//         return includes(
//           collection.toString().toLowerCase(),
//           input.toString().toLowerCase(),
//         );
//       }

//       return some(collection, (item: any) => depthFirstSearch(item, input));
//     };

//     const filterData = (txt = '') => {
//       if (!_visible) return;

//       if (txt === '') {
//         setSearchData(data);
//         onInputChange && onInputChange(data);
//       } else {
//         let _data = _internalSearch(txt);
//         setSearchData(_data);
//         onInputChange && onInputChange(_data);
//       }
//     };

//     return (
//       <Animated.View
//         style={{
//           width:
//             width === null || width === undefined || width === '' || width === 0
//               ? '100%'
//               : width,
//           height:
//             height === null || height === undefined || height === 0
//               ? 8
//               : headerValue,
//           justifyContent: 'flex-end',
//           alignItems: 'center',
//           top: topPos,
//           zIndex: 200,
//           position: 'absolute',
//           backgroundColor: whiteThemeColors.background,
//         }}
//       >
//         <_View
//           style={{
//             width: '95%',
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignContent: 'center',
//             borderRadius: 10,
//             height: 45,
//             alignSelf: 'center',
//             marginVertical: 5,
//             backgroundColor: whiteThemeColors.white,
//           }}
//         >
//           {_visible === false ? null : (
//             <_View
//               style={{
//                 flex: 1,
//                 justifyContent: 'center',
//               }}
//             >
//               <_TextInput
//                 textAlignVertical='top'
//                 placeholder='Search...'
//                 placeholderTextColor={'black'}
//                 style={{
//                   width: getWidth('100%'),
//                   height: '100%',
//                   paddingHorizontal: 8,
//                   fontFamily: CommonStyles.fonts.regular,
//                   color: 'black',
//                 }}
//                 onChangeText={(txt) =>
//                   onChangeText ? onChangeText(txt) : filterData(txt)
//                 }
//                 blurOnSubmit={true}
//                 autoFocus={_visible}
//                 onBlur={() => {
//                   Keyboard.dismiss();
//                 }}
//               />
//             </_View>
//           )}
//           <TouchableOpacity
//             style={{
//               justifyContent: 'center',
//               marginRight: 13,
//               height: 25,
//               width: 25,
//               backgroundColor: whiteThemeColors.primary,
//               borderRadius: 9,
//               alignItems: 'center',
//               marginTop: 10,
//             }}
//             onPress={() => {
//               setVisibleState(false);
//               filterData();
//               onClose();
//             }}
//           >
//             <_VectorIcons
//               name='close'
//               type='AntDesign'
//               color={whiteThemeColors.white}
//               size={16}
//             />
//           </TouchableOpacity>
//         </_View>
//       </Animated.View>
//     );
//   },
// );
const Search: React.FC<props> = ({
  // visible = false,
  data,
  searchKey,
  onInputChange,
  onChangeText,
  inPos,
  outPos,
  width,
  height,
  animSpeed,
  onClose,
  isVisible,
  showCross = true,
}) => {
  let searchKeys = searchKey.split(',');
  let searchKey1 = searchKeys[0];
  let searchKey2 = searchKeys.length > 1 ? searchKeys[1] : '';
  const [SearchData, setSearchData] = useState(data);
  const [_visible, setVisibleState] = useState(isVisible);
  const [headerValue, setHeaderValue] = useState(
    Platform.OS == 'android' && isPortrait()
      ? height - 1
      : hasNotch()
      ? height - 11
      : height - 13,
  );

  const checkDeviceWithDimension = () => {
    if (isTablet()) {
      isPortrait() ? setHeaderValue(height + 30) : setHeaderValue(height + 15);
    } else {
      if (Platform.OS == 'android') {
        isPortrait()
          ? setHeaderValue(height + 10)
          : setHeaderValue(height + 15);
      } else {
        isPortrait()
          ? setHeaderValue(height + 40)
          : setHeaderValue(height + 15);
      }
    }
  };

  useMemo(() => {
    if (_visible === false) {
      Keyboard.dismiss();
    }
  }, [_visible]);

  useEffect(() => {
    if (data) setSearchData(data);
    checkDeviceWithDimension();
  }, [data]);
  useEffect(() => {
    const subs = Dimensions.addEventListener('change', () => {
      checkDeviceWithDimension();
    });
    return () => subs.remove();
  }, []);
  let topPos = useRef(new Animated.Value(-170)).current;

  useEffect(() => {
    console.log('Search triggers==>');
    if (_visible === true) {
      Animated.timing(topPos, {
        // toValue: getHeight(`${inPos}`),
        toValue: inPos,
        duration: animSpeed,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(topPos, {
        // toValue: getHeight(`${outPos}`),
        toValue: outPos,
        duration: animSpeed,
        useNativeDriver: false,
      }).start();
    }
  }, [_visible]);

  const _internalSearch = (input) => {
    const inputToLower = input.toLowerCase();

    return data?.filter((obj) =>
      searchKeys.some((key) => obj[key]?.toLowerCase().includes(inputToLower)),
    );
  };

  const depthFirstSearch = (collection: any, input: any) => {
    //recursive call
    let type = typeof collection;
    if (type === 'string' || type === 'number' || type === 'boolean') {
      return includes(
        collection.toString().toLowerCase(),
        input.toString().toLowerCase(),
      );
    }

    return some(collection, (item: any) => depthFirstSearch(item, input));
  };

  const filterData = (txt = '') => {
    if (!_visible) return;

    if (txt === '') {
      setSearchData(data);
      onInputChange && onInputChange(data);
    } else {
      let _data = _internalSearch(txt);
      setSearchData(_data);
      onInputChange && onInputChange(_data);
    }
  };

  return (
    <Animated.View
      style={{
        width: width ? width : '100%',
        height: height ? headerValue : 8,
        justifyContent: 'flex-end',
        alignItems: 'center',
        top: topPos,
        zIndex: 200,
        position: 'absolute',
        backgroundColor: whiteThemeColors.background,
      }}
    >
      <_View
        style={{
          width: '95%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignContent: 'center',
          borderRadius: 10,
          height: 45,
          alignSelf: 'center',
          marginVertical: 5,
          backgroundColor: whiteThemeColors.white,
        }}
      >
        {_visible === false ? null : (
          <_View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <_TextInput
              textAlignVertical='top'
              placeholder='Search...'
              placeholderTextColor={'black'}
              style={{
                width: getWidth('100%'),
                height: '100%',
                paddingHorizontal: 8,
                fontFamily: CommonStyles.fonts.regular,
                color: 'black',
              }}
              onChangeText={(txt) =>
                onChangeText ? onChangeText(txt) : filterData(txt)
              }
              blurOnSubmit={true}
              autoFocus={_visible}
              onBlur={() => {
                Keyboard.dismiss();
              }}
            />
          </_View>
        )}
        {showCross && (
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              marginRight: 13,
              height: 25,
              width: 25,
              backgroundColor: whiteThemeColors.primary,
              borderRadius: 9,
              alignItems: 'center',
              marginTop: 10,
            }}
            onPress={() => {
              setVisibleState(false);
              filterData();
              onClose();
            }}
          >
            <_VectorIcons
              name='close'
              type='AntDesign'
              color={whiteThemeColors.white}
              size={16}
            />
          </TouchableOpacity>
        )}
      </_View>
    </Animated.View>
  );
};
export default React.memo(Search);
