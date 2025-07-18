import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { whiteThemeColors } from '../../../../../Utilities';
import img1 from '../../../../../../assets/courseDefault.jpg';
import ApiEndpoints from '../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../data/DAL';
import {
  stdProgressListInterface,
  _Image,
  _Screen,
  _Text,
  _View,
  _VectorIcons,
} from '../../../../../components';
import ScreensNames from '../../../../../screenNames';
import Header from '../../../../Headers';
import { _ActivityIndicator } from '../../../../Loader';
import Search from '../../../../Search';
import CommonStyles from '../../../../../screens/CommonStyles';
const defaultImage = '/Content/Images/courseImage.png';

const index: React.FC<stdProgressListInterface> = ({ navigation, route }) => {
  const [stdList, setStdList] = useState([]);
  const [filterdStdList, setFilterdStdList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prop, setprop] = useState<any>();
  let searchRef: any = useRef();
  const { Get } = DataAccess();
  const [isVisible, setisVisible] = useState(false);
  useEffect(() => {
    setprop(route?.params);
    setLoading(true);
    var EndPoint = ApiEndpoints.GetStudentCourses;
    Get(EndPoint).then((res: any) => {
      setLoading(false);
      if (!res.error) {
        setStdList(res);
        setFilterdStdList(res);
        return;
      }
    });
  }, []);

  const RenderItem = ({ Obj }: any) => {
    return (
      <_View key={Obj.courseId} style={Style.list}>
        <_View style={Style.ListItem}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreensNames.StudentProgress.name, {
                goBackScreen: ScreensNames.SingleStudentProgress.name,
                studentId: Obj.studentId,
                studentName: Obj.studentName,
                courseId: Obj.courseId,
                isFromStd: true,
              });
            }}
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
            }}
          >
            <_View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <_View style={Style.imgContainer}>
                {Obj?.courseImage == null ||
                Obj?.courseImage == defaultImage ? (
                  <Image source={img1} style={Style.image} />
                ) : (
                  <_Image uri={Obj?.courseImage} style={Style.image} />
                )}
              </_View>
              <_View style={{ marginLeft: 10, width: '62%' }}>
                <_Text
                  numberOfLines={2}
                  style={{
                    textAlign: 'left',
                    width: '75%',
                    // width: isTablet() ? wp(60) : wp(40),
                    color: whiteThemeColors.black,
                    fontFamily: CommonStyles.fonts.medium,
                  }}
                >
                  {Obj.courseName}
                </_Text>
              </_View>
            </_View>
            <TouchableOpacity
              style={Style.viewReport}
              onPress={() => {
                navigation.navigate(ScreensNames.StudentProgress.name, {
                  goBackScreen: ScreensNames.SingleStudentProgress.name,
                  studentId: Obj.studentId,
                  studentName: Obj.studentName,
                  courseId: Obj.courseId,
                  isFromStd: true,
                });
              }}
            >
              <_Text
                style={{
                  fontSize: 10,
                  color: whiteThemeColors.primary,
                  fontFamily: CommonStyles.fonts.semiBold,
                  // fontFamily: CommonStyles.fonts.universalAppFont,
                }}
              >
                View Report
              </_Text>
              <_VectorIcons
                size={12}
                type='AntDesign'
                name='right'
                color={whiteThemeColors.primary}
                style={{ marginLeft: 5 }}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </_View>
      </_View>
    );
  };

  const onChangeText = (data: any) => {
    let array = [];
    data.forEach((element: any) => {
      array.push(element);
    });
    setFilterdStdList(data);
  };
  const onBackPress = () => {
    navigation.navigate(prop?.goBackScreen);
    return true;
  };
  return (
    <_Screen
      header={
        <Header
          isBack={true}
          GoBack={() => {
            navigation.navigate(prop?.goBackScreen);
          }}
          ScreenName='SingleStudentScreen'
          isSearchBtn={true}
          OpenSearch={() => {
            setisVisible(true);
          }}
          Screen={prop?.studentName}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={onBackPress}
      backgroundColor={whiteThemeColors.background}
    >
      {isVisible && (
        <Search
          onInputChange={onChangeText}
          onClose={() => {
            setisVisible(false);
          }}
          animSpeed={100}
          data={stdList}
          searchKey='courseName'
          isVisible={isVisible}
          outPos={-110}
          inPos={-10}
          height={60}
        />
      )}
      {loading ? (
        <_ActivityIndicator size='large' />
      ) : (
        <_View style={{ marginTop: 2 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={Style.flatelist}
            data={filterdStdList}
            renderItem={({ item }) => <RenderItem Obj={item} />}
            ListFooterComponent={() => (
              <_View style={{ width: '100%', height: 200 }} />
            )}
          />
        </_View>
      )}
    </_Screen>
  );
};

const Style = StyleSheet.create({
  flatelist: {
    width: '98%',
    marginHorizontal: 4,
    marginTop: 5,
    height: Dimensions.get('screen').height,
  },
  list: {
    borderRadius: 15,
    backgroundColor: whiteThemeColors.white + 90,
    width: '96%',
    alignSelf: 'center',

    marginBottom: 10,
  },
  ListItem: { width: '100%', borderBottomWidth: 0, height: 100 },
  headerView: {
    backgroundColor: whiteThemeColors.greyLite,
    width: '100%',
    height: 60,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    padding: 10,
    height: 80,
  },
  imgContainer: {
    height: 70,
    width: 70,
    marginEnd: 4,
    marginVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  viewReport: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: whiteThemeColors.primary + 30,
    position: 'absolute',
    top: 40,
    right: 15,
    flexDirection: 'row',
  },
});
export const SingleStudent = React.memo(index);
