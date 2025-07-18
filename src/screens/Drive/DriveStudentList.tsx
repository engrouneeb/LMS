import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { whiteThemeColors } from '../../Utilities';
import ApiEndpoints from '../../../data/ApiEndpoints';
import { DataAccess } from '../../../data/DAL';
import { _Screen, _View } from '../../components';
import DrawerScreens from '../../navigation/Drawer/DrawerScreenNames';
import CstHeader from '../Headers';
import Search from '../Search';
import { DriveStudentRenderItem } from './components';
import { styles } from './styles';
import EmptyList from '../EmptyList';
import { EndpointType } from '../../interfaces';
import { useRoute } from '@react-navigation/native';
interface Props {
  props: any;
}
const DriveStudentList: React.FC<Props> = ({ props }) => {
  const route:any = useRoute();
  const {header} = route.params;

  const backPress = () => {
    props.navigation.navigate(DrawerScreens.dashboard.name);
    return true;
  };
  const searchRef: any = React.useRef();
  const { Get } = DataAccess();
  const [studentList, setStudentList] = useState([]);
  const [stdList, setStdList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setisVisible] = useState(false);
  useEffect(() => {
    getStudentList();
  }, []);

  const getStudentList = async () => {
    setIsLoading(true);
    const Endpoint: EndpointType = ApiEndpoints.GetStudentList;
    Endpoint.params = '?isOnlyActiveStd=true';

    Get(Endpoint).then((res: any) => {
      setIsLoading(false);
      setStudentList(res);
      setStdList(res);
    });
  };

  const onChangeText = (studentList: any) => {
    let array: any = [];
    studentList.forEach((element: any) => {
      array.push(element);
    });
    setStudentList(array);
  };
  return (
    <_Screen
      header={
        <CstHeader
          isMenu
          isSearchBtn={true}
          OpenSearch={() => {
            setisVisible(true);
          }}
          OpenMenu={() => {
            props.navigation.toggleDrawer();
          }}
          Screen={'Student List'}
        />
      }
      backgroundColor={whiteThemeColors.background}
      flex={1}
      hideTopSafeArea
      onAndroidBack={backPress}
    >
      {isVisible && (
        <Search
          onInputChange={onChangeText}
          onClose={() => {
            setisVisible(false);
          }}
          animSpeed={100}
          data={stdList}
          searchKey='studentName'
          isVisible={isVisible}
          outPos={-110}
          inPos={-10}
          height={60}
        />
      )}
      <_View style={styles.containerList}>
        {isLoading ? (
          <ActivityIndicator
            size={'large'}
            color={whiteThemeColors.primary}
            style={{ flex: 1 }}
          />
        ) : (
          <FlatList
            data={studentList}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <DriveStudentRenderItem item={item} props={props} header={header} />
            )}
            ListEmptyComponent={() => <EmptyList text={'No Student Found'} />}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </_View>
    </_Screen>
  );
};
export { DriveStudentList };
