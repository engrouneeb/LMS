import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../Utilities';
import ApiEndpoints from '../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../data/DAL';
import {
  _Button,
  _Text,
  _VectorIcons,
  _View,
  endpoint,
} from '../../../../components';
import Loader from '../../../Loader/loader';
import { AssignedStudentsModal } from '../components/AssignedStudentsModal';
import { EmptyList } from '../components/EmptyList';
import CommonStyles from '../../../../screens/CommonStyles';
interface props {
  staffId: number | undefined;
}
const AssignStudents: React.FC<props> = ({ staffId }) => {
  const { Get } = DataAccess();
  const [showAssignedStudents, setAssignedStudents] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>();
  const [classesList, setClassesList] = useState();
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    getStaffDetailsList();
  }, []);

  const getStaffDetailsList = () => {
    setLoading(true);
    var EndPoint: endpoint = ApiEndpoints.GetStaffAssignedClasses;
    EndPoint.params = `?StaffId=${staffId}`;
    Get(EndPoint)
      .then((res: any) => {
        if (res) {
          setClassesList(res?.classTiming);
        }
      })
      .catch((e: any) => console.log('Error: ', e))
      .finally(() => setLoading(false));
  };

  return (
    <_View
      flex={1}
      style={{
        paddingHorizontal: 15,
        backgroundColor: whiteThemeColors.background,
      }}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={classesList}
          ListEmptyComponent={() => <EmptyList />}
          renderItem={({ item }) => (
            <_View style={styles.cardContainer}>
              <_View style={styles.cardInnerContainer}>
                <_Text
                  numberOfLines={1}
                  style={[styles.courseName, { marginLeft: 10 }]}
                >
                  {item?.course}
                </_Text>
                <_View style={{ flexDirection: 'row' }}>
                  <_Text
                    numberOfLines={1}
                    style={[
                      styles.valueText,
                      { fontSize: 12, marginLeft: 10, marginTop: 5 },
                    ]}
                  >
                    {item?.className}
                  </_Text>
                </_View>

                <_View style={styles.instuctorText}>
                  <_Text style={styles.fromText}>{item?.dates}</_Text>
                </_View>
              </_View>

              <_Button
                width={130}
                borderRadius={6}
                style={styles.button}
                callback={() => {
                  setSelectedItem(item);
                  setAssignedStudents(true);
                }}
                submitting={true}
                BtnTxt={styles.buttonStyles}
                btnText='Assigned Students'
              />
            </_View>
          )}
        />
      )}
      {showAssignedStudents && (
        <AssignedStudentsModal
          modalVisible={showAssignedStudents}
          setModalVisible={setAssignedStudents}
          item={selectedItem}
          staffId={staffId}
        />
      )}
    </_View>
  );
};

export { AssignStudents };

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: 125,
    backgroundColor: whiteThemeColors.white + 90,
    marginTop: 10,
    borderRadius: 20,
    padding: 15,
  },
  cardInnerContainer: {
    // marginLeft: 2,
    marginTop: 5,
    borderLeftWidth: 3,
    borderLeftColor: whiteThemeColors.primary,
  },
  courseText: {
    marginLeft: 10,
    fontSize: 13,
    color: whiteThemeColors.primary,
  },
  valueText: {
    color: whiteThemeColors.greyDark,
    width: '100%',
    fontFamily: CommonStyles.fonts.regular,
  },
  courseName: {
    color: whiteThemeColors.greyDark,
    width: '100%',
    fontFamily: CommonStyles.fonts.semiBold,
    fontSize: 16,
  },
  instuctorText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    fontFamily: CommonStyles.fonts.regular,
  },

  instrucName: {
    color: whiteThemeColors.greyDark,
    fontSize: 12,
    fontFamily: CommonStyles.fonts.regular,
  },
  fromText: {
    color: whiteThemeColors.black,
    fontSize: 10,
    fontFamily: CommonStyles.fonts.regular,
    marginLeft: 10,
  },
  button: {
    backgroundColor: whiteThemeColors.primary + 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 15,
  },
  buttonStyles: {
    color: whiteThemeColors.primary,
    fontSize: 11,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  staffTag: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 10,
    backgroundColor: whiteThemeColors.background,
    borderRadius: 5,
    width: '40%',
  },
});
