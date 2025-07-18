import React, { useEffect, useState } from 'react';
import { FlatList, Image } from 'react-native';
import CommonStyles from '../../CommonStyles';
import { _ActivityIndicator } from '../../Loader';
import { Counter, getTerminologyLabel, TerminologyMap } from '../../../Utilities';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import {
  _Text,
  _View,
  _VectorIcons,
  endpoint,
  _Image,
} from '../../../components';
import styles from '../style';
interface props {
  userID: number | null;
}

export const CoursePoints: React.FC<props> = ({ userID }) => {
  const [studentCourseWisePointsList, setStudentCourseWisePointsList] =
    useState([]);
  const [loading, setLoadingState] = useState(false);
  const { Get } = DataAccess();
  const [terminologies, setTerminologies] = useState<Partial<TerminologyMap>>(
    {},
  );
  useEffect(() => {
    const fetchTerminologies = async () => {
      const terms = await getTerminologyLabel();
      setTerminologies(terms);
    };
    fetchTerminologies();
  }, []);

  useEffect(() => {
    getStudentPointsCounters();
  }, [userID]);

  const getStudentPointsCounters = () => {
    setLoadingState(true);
    var EndPoint: endpoint = ApiEndpoints.StudentPointsCounters;
    EndPoint.params = `?studentId=${userID}`;

    Get(EndPoint)
      .then((res: any) => {
        setStudentCourseWisePointsList(res.studentCourseWisePointsList);
        setLoadingState(false);
        return;
      })
      .catch(() => {
        return;
      });
  };

  return (
    <_View style={[{ marginTop: 0, marginBottom: 5, marginHorizontal: 0 }]}>
      <_View
        style={{
          flex: 1,
          height: 200,
          width: '100%',
          flexDirection: 'column',
        }}
      >
        {loading ? (
          <_ActivityIndicator />
        ) : (
          <>
            <_Text
              style={{
                paddingTop: 1,
                marginTop: 15,
                fontFamily: CommonStyles.fonts.semiBold,
                fontSize: 14,
              }}
            >
              {`${terminologies['Course']?.label} Points`}
            </_Text>

            {studentCourseWisePointsList &&
            studentCourseWisePointsList?.length != 0 ? (
              <_View style={{ flex: 1, marginTop: 10 }}>
                <FlatList
                  data={studentCourseWisePointsList}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => (
                    <_View style={styles.card}>
                      <_Text
                        style={{
                          fontFamily: CommonStyles.fonts.semiBold,
                        }}
                      >
                        {`${terminologies['Course']?.label}`}
                      </_Text>
                      <_Text
                        style={{
                          fontFamily: CommonStyles.fonts.regular,
                          fontSize: 10,
                          color: 'black',
                        }}
                        numberOfLines={3}
                      >
                        {item?.courseName}
                      </_Text>
                      <_View style={styles.pointsIcon}>
                        <Image
                          style={{ width: 30, height: 30, tintColor: 'white' }}
                          source={require('../../../../assets/points.png')}
                        />
                        <_Text style={styles.pointsText}>
                          <Counter
                            Count={item?.courseChallengesAchievedPoints}
                          />
                        </_Text>
                      </_View>
                    </_View>
                  )}
                />
              </_View>
            ) : null}
          </>
        )}
      </_View>
    </_View>
  );
};
