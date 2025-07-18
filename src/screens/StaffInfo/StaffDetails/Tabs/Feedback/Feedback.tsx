import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../../Utilities';
import ApiEndpoints from '../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../data/DAL';
import { _View, endpoint } from '../../../../../components';
import Loader from '../../../../Loader/loader';
import { CoursesListModal } from './CoursesListModal';
import { EmptyList, RenderItem } from './components';
interface props {
  staffId: number;
}
const Feedback: React.FC<props> = ({ staffId }) => {
  const [stdList, setStdList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showCoursesModal, setShowCoursesModal] = useState(false);
  const [selectedCourseDiscussion, setSelectedCourseDiscussion] = useState();
  const { Get } = DataAccess();
  const getFeed = async () => {
    var url: endpoint = ApiEndpoints.GetStaffStudentsFeedbackTab;
    url.params = `?staffId=${staffId}`;
    setLoader(true);
    Get(url)
      .then((response: any) => {
        if (response) {
          setStdList(response);
        } else {
          setStdList([]);
        }
      })
      .catch((e: any) => console.log('Error in Fetching StdList ', e))
      .finally(() => setLoader(false));
  };

  useEffect(() => {
    getFeed();
  }, []);

  const handleShowCoursesModal = (item: any) => {
    setSelectedCourseDiscussion(item?.classesList);
    setShowCoursesModal(true);
  };

  return (
    <_View style={styles.container}>
      {loader ? (
        <Loader />
      ) : (
        <FlatList
          data={stdList}
          style={styles.flatListStyle}
          ListEmptyComponent={() => <EmptyList />}
          renderItem={({ item }) => (
            <RenderItem item={item} hanleOnPress={handleShowCoursesModal} />
          )}
          ListHeaderComponent={() => (
            <_View style={styles.headerFooterComponent} />
          )}
          ListFooterComponent={() => (
            <_View style={styles.headerFooterComponent} />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <_View style={styles.headerFooterComponent} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}

      {showCoursesModal ? (
        <CoursesListModal
          selectedCourse={selectedCourseDiscussion}
          modalVisible={showCoursesModal}
          setModalVisible={setShowCoursesModal}
        />
      ) : null}

      {/* {showDiscussionSection ? (
        <DiscussionModal selectedCourse={selectedCourse} />
      ) : null} */}
    </_View>
  );
};

export { Feedback };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteThemeColors.background,
  },
  flatListStyle: {
    backgroundColor: whiteThemeColors.background,
    marginHorizontal: 10,
  },
  headerFooterComponent: { height: 10 },
});
