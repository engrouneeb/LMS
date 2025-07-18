import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import CommonStyles from '../../CommonStyles';
import { _ActivityIndicator } from '../../Loader';
import { Counter } from '../../../Utilities';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import {
  _Text,
  _View,
  _VectorIcons,
  endpoint,
  _Image,
} from '../../../components';
import { Appstate } from '../../../reducers/Appstate';
import styles from '../style';
interface props {
  userID: number | null;
  showChalangesAchivedPoint:boolean
}

export const StudentPoints: React.FC<props> = ({ userID ,showChalangesAchivedPoint}) => {
  const [studentCourseWisePointsList, setStudentCourseWisePointsList] =
    useState([]);
  const [chalangesAchivedPoint, setChalangesAchivedPoint] = useState(0);
  const [bonusPoint, setBonusPoint] = useState(0);
  const [avilablePoint, setAvilablePoint] = useState(0);
  const [reedemPoint, setReedemPoint] = useState(0);
  const [loading, setLoadingState] = useState(false);
  const { dashboardScreen } = useSelector((state: Appstate) => state.language);
  const { Get } = DataAccess();

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
        setBonusPoint(res.studentTotalBonusPoints);
        setChalangesAchivedPoint(res.studentAchievedChallengesPoints);
        setAvilablePoint(res.availablePoints);
        setReedemPoint(res.studentTotalRedeemedPoints);
        setLoadingState(false);
        return;
      })
      .catch(() => {
        return;
      });
  };
  const PointsCard = ({ title, count }: { title: string; count: number }) => (
    <_View style={[styles.cardContainer2, { margin: 5 }]}>
      <Image style={styles.icon} source={require('../../../../assets/points.png')} />
      <_Text style={styles.title}>{title}</_Text>
      <_Text style={styles.count}><Counter Count={count} /></_Text>
    </_View>
  );

  return (
    <_View style={{ marginHorizontal: 0 }}>
  <_View style={{ flex: 1, minHeight: 200 }}>
    {loading ? (
      <_ActivityIndicator />
    ) : (
      <>
        <_Text style={{
          marginTop: 10,
          fontFamily: CommonStyles.fonts.semiBold,
          fontSize: 14,
        }}>
          {dashboardScreen.StudentPoints}
        </_Text>

        <_View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 10,
          }}
        >
          {showChalangesAchivedPoint && chalangesAchivedPoint !== null && (
            <PointsCard title={dashboardScreen.ChallengePoints} count={chalangesAchivedPoint} />
          )}
            <PointsCard title={dashboardScreen.BounsPoints} count={bonusPoint} />
            <PointsCard title={dashboardScreen.RedeemedPoints} count={reedemPoint} />
            <PointsCard title={dashboardScreen.AvailablePoints} count={avilablePoint} />
        </_View>
      </>
    )}
  </_View>
</_View>
  );
};
