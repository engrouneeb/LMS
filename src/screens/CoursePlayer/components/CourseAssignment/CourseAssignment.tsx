import React, { useEffect, useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { whiteThemeColors } from 'utilities';
import { NoApprovels } from '../../../../../assets/Icons';
import Endpoint from '../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../data/DAL';
import { _Screen, _Text, _View, endpoint } from '../../../../components';
import { TopMiniTabs } from '../../../../components/TopMiniTabs';
import { Appstate } from '../../../../reducers/Appstate';
import Headers from '../../../Headers';
import { _ActivityIndicator } from '../../../Loader';
import { Item } from './components/RenderItem';
import { styles } from './styles';
import { CourseAssignmentInterface } from 'interfaces';

const _CourseAssignment: React.FC<CourseAssignmentInterface> = ({
  navigation,
  route,
}) => {
  const { courseContentScreenAssign } = useSelector(
    (state: Appstate) => state.language
  );
  const { Get } = DataAccess();
  const [selected, setSelected] = useState(new Map());
  const [selectedAssignees] = useState([]);
  const [failed, setFailedState] = useState(false);
  const [loading, setLoadingState] = useState(false);
  const [activeStdData, setActiveStdData] = useState([]);
  const [inactiveStdData, setInactiveStdData] = useState([]);
  const [activeTab, setActiveTab] = useState({ name: 'Active', id: 0 });

  useMemo(() => {
    setSelected(new Map());
  }, [route.params.type]);

  const retrieveStdList = (list: any) => {
    setActiveStdData(list?.filter((item: any) => item.isActive == true));
    setInactiveStdData(list?.filter((item: any) => item.isActive == false));
  };

  useEffect(() => {
    setSelected(new Map());
    if (route.params.type === 1) {
      getStudents();
    } else {
      enableInitialSelected(selectedAssignees);
    }
  }, [route.params.classId]);

  //get all students including selected and non selected
  const getStudents = () => {
    setLoadingState(true);
    let url: endpoint = Endpoint.getCourseClassStudents;
    url.params = `?classId=${route.params.classId}`;
    Get(url)
      .then((res: any) => {
        retrieveStdList(res);
        setLoadingState(false);
        setFailedState(false);
        return;
      })
      .catch(() => {
        setLoadingState(false);
        setFailedState(true);
        return;
      });
  };

  const enableInitialSelected = (assign: any) => {
    const newSelected = new Map(selected);

    for (let i = 0; i < assign.length; i++) {
      newSelected.set(assign[i], false);
    }

    for (let i = 0; i < assign.length; i++) {
      if (selected.values.length === 0) {
        newSelected.set(assign[i], true);
      } else if (selected.get(assign[i]) === false) {
        newSelected.set(assign[i], true);
      }
    }
    setSelected(newSelected);
  };

  const renderItem = ({ item, index }: any) => {
    return (
      <Item
        key={index}
        title={item.name}
        selected={item.isActive}
        reduceText={reduceText}
      />
    );
  };

  const activeOrInactiveTab = () => {
    const tabs = [
      { name: 'Active', id: 0 },
      { name: 'Inactive', id: 0 },
    ];
    return (
      <_View
        style={{
          backgroundColor: whiteThemeColors.background,
          paddingBottom: 10,
        }}
      >
        <TopMiniTabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </_View>
    );
  };
  const reduceText = (word = '') => {
    return word.length > 17 ? word.substring(0, 17).concat('...') : word;
  };

  const EmptyList = ({ msg }: { msg: string }) => {
    return (
      <_View style={styles.emptyListContainer}>
        <NoApprovels />
        <_Text style={styles.emptyListText}>{msg}</_Text>
      </_View>
    );
  };

  const handleBack = () => {
    navigation.goBack();
    return true; //disable back button
  };

  return (
    <_Screen
      header={
        <Headers
          isBack={true}
          isMenu={false}
          Screen={
            route.params.type === 1
              ? courseContentScreenAssign.AssignStudents
              : courseContentScreenAssign.AssignInstructors
          }
          isLogout={false}
          GoBack={() => {
            navigation.goBack();
          }}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={handleBack}
    >
      <_View style={styles.container}>
        {loading ? (
          <_ActivityIndicator size='large' />
        ) : failed ? (
          <_Text style={styles.failureText}>{'Failed to load data'}</_Text>
        ) : activeStdData?.length + inactiveStdData?.length <= 0 ? (
          <_View style={styles.centralizedComponent}>
            <EmptyList msg={' No students found.'} />
          </_View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={activeTab.name == 'Active' ? activeStdData : inactiveStdData}
            style={{ width: '95%' }}
            keyExtractor={(item: any) => item.value}
            ListHeaderComponent={activeOrInactiveTab}
            ListEmptyComponent={
              <EmptyList
                msg={`No ${
                  activeTab.name == 'active' ? 'active' : 'inactive'
                } student`}
              />
            }
            ListFooterComponent={<_View style={{ height: 60 }} />}
            renderItem={renderItem}
            extraData={selected}
            removeClippedSubviews={true}
            stickyHeaderIndices={[0]}
          />
        )}
      </_View>
    </_Screen>
  );
};

export const CourseAssignment = React.memo(_CourseAssignment);
