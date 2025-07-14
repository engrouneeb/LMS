import { Pressable, TouchableOpacity } from 'react-native';
import {
  _View,
  _Text,
  _VectorIcons,
  _NoDataFound,
  endpoint,
} from '../../../../../components';
import { UserImg } from '../../../../ThumbNail';
import { styles } from './Styles';
import React from 'react';
import { whiteThemeColors } from 'utilities';
import { ScrollView } from 'react-native';
import { useState } from 'react';
import { DetailModal } from './DetailModal/DetailModal';
import ApiEndpoints from '../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../data/DAL';
import { useEffect } from 'react';
import Loader from '../../../../Loader/loader';
import { SelectRole } from './DetailModal/SelectRole';
import { useNavigation } from '@react-navigation/native';
import DrawerScreenNames from '../../../../../navigation/Drawer/DrawerScreenNames';
interface props {
  staffId: number;
}
const Details: React.FC<props> = ({ staffId }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [staffLoader, setStaffLoader] = useState(false);
  const [details, setDetails] = useState({});
  const [staffDetails, setStaffDetalis] = useState<any>({});
  const navigation = useNavigation();
  const { Get } = DataAccess();
  useEffect(() => {
    getDetails();
    getStaffDetails();
  }, []);

  const getStaffDetails = () => {
    setStaffLoader(true);
    var EndPoint: endpoint = ApiEndpoints.staffDetail;
    EndPoint.params = `?staffId=${staffId}`;
    Get(EndPoint)
      .then((res: any) => {
        if (res) {
          setStaffDetalis(res);
        }
      })
      .catch((e: any) => console.log('Error: ', e))
      .finally(() => setStaffLoader(false));
  };

  const getDetails = () => {
    var EndPoint: endpoint = ApiEndpoints.Details;
    EndPoint.params = `?staffId=${staffId}`;
    Get(EndPoint)
      .then((res: any) => {
        if (res) {
          setDetails(res);
        }
      })
      .catch((e: any) => console.log('Error: ', e));
  };

  return (
    <_View style={{ backgroundColor: whiteThemeColors.background, flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {staffLoader ? (
          <_View style={styles.loaderContainer}>
            <Loader />
          </_View>
        ) : (
          <_View style={styles.cardContainer}>
            <_View style={styles.imageContainer}>
              <_View
                style={[
                  styles.status,
                  {
                    backgroundColor: staffDetails?.isActive
                      ? whiteThemeColors.green
                      : whiteThemeColors.red,
                  },
                ]}
              />
              <UserImg
                UserInfo={{
                  FirstName: staffDetails?.firstName + '',
                  LastName: staffDetails?.lastName + '',
                  UserImage: staffDetails?.image || '',
                  UserImageColor: whiteThemeColors.primary,
                }}
                size={86}
              />
            </_View>
            <_Text
              style={[styles.headerText, { paddingVertical: 15 }]}
            >{`${staffDetails?.firstName} ${staffDetails?.lastName}`}</_Text>
            <_View style={styles.innerContainer}>
              <_View style={[styles.detailscon, { paddingTop: 10 }]}>
                <_Text style={styles.keyText}>{'Joining Date'}</_Text>
                <_Text style={styles.valueText}>{staffDetails?.joinDate}</_Text>
              </_View>
              <_View style={[styles.detailscon]}>
                <_Text style={styles.keyText}>{'First Name'}</_Text>
                <_Text style={styles.valueText}>
                  {staffDetails?.firstName}
                </_Text>
              </_View>

              <_View style={styles.detailscon}>
                <_Text style={styles.keyText}>{'Last Name'}</_Text>
                <_Text style={styles.valueText}>{staffDetails?.lastName}</_Text>
              </_View>
              <_View style={styles.detailscon}>
                <_Text style={styles.keyText}>{'Email'}</_Text>
                <_Text style={styles.valueText}>{staffDetails?.email}</_Text>
              </_View>
              {staffDetails?.dob ? (
                <_View style={styles.detailscon}>
                  <_Text style={styles.keyText}>{'Birth Date'}</_Text>
                  <_Text style={styles.valueText}>{staffDetails?.dob}</_Text>
                </_View>
              ) : null}

              {staffDetails?.phone ? (
                <_View style={styles.detailscon}>
                  <_Text style={styles.keyText}>{'Phone Number'}</_Text>
                  <_Text style={styles.valueText}>{staffDetails?.phone}</_Text>
                </_View>
              ) : null}
              <_View style={styles.detailscon}>
                <_Text style={styles.keyText}>{'User Name'}</_Text>
                <_Text
                  style={styles.valueText}
                >{`@${staffDetails?.userName}`}</_Text>
              </_View>
              {staffDetails?.roleName ? (
                <_View style={styles.detailscon}>
                  <_Text style={styles.keyText}>{'Security Role'}</_Text>
                  <_Text style={styles.valueText}>
                    {staffDetails?.roleName}
                  </_Text>
                </_View>
              ) : null}
              {staffDetails?.staffRoleId ? (
                <_View style={styles.detailscon}>
                  <_Text style={styles.keyText}>{'Staff Roles'}</_Text>
                  <_Text style={styles.valueText}>
                    {SelectRole(staffDetails?.staffRoleId)}
                  </_Text>
                </_View>
              ) : null}

              {/* {
              staffDetails?.departmentIds!=0?
              <_View style={styles.detailscon}>
              <_Text style={styles.keyText}>{'Department'}</_Text>
                {
                  staffDetails?.departmentIds?.map((item)=>(
                    <_Text style={styles.valueText} >{`${item}`}</_Text>
                  ))

                }
            </_View>
            :null
            } */}
              <_View style={styles.showContactsContainer}>
                <Pressable
                  onPress={() => setShowDetails(true)}
                  style={styles.showBtn}
                >
                  <_VectorIcons
                    style={{ alignSelf: 'center' }}
                    type={'MaterialCommunityIcons'}
                    name='account-details'
                    color={whiteThemeColors.primaryDark}
                    size={20}
                  />
                  <_Text style={styles.showBtnTxt}>{'Show Details'}</_Text>
                </Pressable>
              </_View>
            </_View>
          </_View>
        )}
        <DetailModal
          show={showDetails}
          close={setShowDetails}
          Details={details}
        />
      </ScrollView>
    </_View>
  );
};

export { Details };
