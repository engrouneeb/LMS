import { StyleSheet, FlatList, Modal, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { _Screen, _View, _Text, _Button,_VectorIcons } from '../../../components';
import  Header  from '../../Headers';
import { useNavigation } from '@react-navigation/native';
import screeNames from '../../../navigation/Drawer/DrawerScreenNames';
import CommonStyles from '../../CommonStyles';
import { whiteThemeColors } from '../../../Utilities';
import Search from '../../Search';
import { DataAccess } from '../../../../data/DAL';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { _ActivityIndicator } from '../..//Loader/_ActivityIndicator';

export const StudentKioskPins = () => {
    const [isVisible, setisVisible] = useState(false);
    const [PinList, setPinList] = useState<any>([]);
    const [filterdStdList, setFilterdStdList] = useState<any>([]);
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [kioskPin, setKioskPin] = useState<string | null>(null);
    const openSearch = () => setisVisible(true);
    const onChangeText = (data: any) => setFilterdStdList(data);
    const navigation = useNavigation();
    const { Get } = DataAccess();

    useEffect(() => {
      const fetchStudents = async () => {
        setLoading(true);
        const Endpoint = { ...ApiEndpoints.GetStudentList, params: '?isOnlyActiveStd=false' };
        try {
          const res = await Get(Endpoint);
          // Map API data to table format
          const mapped = (res || []).map((s: any) => {
            const name = `${s.firstName ?? s.studentName?.split(' ')[0] ?? ''} ${s.lastName ?? s.studentName?.split(' ')[1] ?? ''}`.trim();
            const status = s.status ?? (s.isActive ? 'Active' : 'Inactive');
            const userId = s.userId ?? s.studentId;
            // Log studentId for debugging
            console.log('Mapping student:', {
              studentId: s.studentId,
              userId: userId,
              name: name,
              status: status
            });
            return {
              name,
              status,
              userId,
            };
          });

          // Fetch all pins in parallel using Promise.all
          const pins = await Promise.all(
            mapped.map(async (student: any) => {
              const EndpointPin = { ...ApiEndpoints.GetPinDetailByUserId, params: `?userId=${student.userId}` };
              try {
                const resPin = await Get(EndpointPin);
                console.log('Response for userId', student.userId, ':', resPin);
                return resPin?.user?.pinCode ?? '------';
              } catch (e) {
                return '------';
              }
            })
          );

          // Merge pins into mapped students
          const mappedWithPins = mapped.map((student: any, idx: number) => ({ ...student, pin: pins[idx] }));
          setPinList(mappedWithPins);
          setFilterdStdList(mappedWithPins);
        } catch (e) {
          setPinList([]);
          setFilterdStdList([]);
        }
        setLoading(false);
      };
      fetchStudents();
    }, []);

    const openStudentModal = async (student: any) => {
      setSelectedStudent(student);
      setShowModal(true);
      setKioskPin(null);
      setModalLoading(true);
      try {
        const Endpoint = { ...ApiEndpoints.GetPinDetailByUserId, params: `?userId=${student.userId}` };
        const res = await Get(Endpoint);
        setKioskPin(res?.user?.pinCode ?? '------');
      } catch (e) {
        setKioskPin('------');
      }
      setModalLoading(false);
    };
    const closeStudentModal = () => {
      setShowModal(false);
      setSelectedStudent(null);
      setKioskPin(null);
    };

  return (
    <_Screen
      header={
        <Header
          isBack
          isSearchBtn
          OpenSearch={openSearch}
          goBack={() => {
            navigation.goBack();
          }}
          Screen={screeNames.StudentKioskPins.name}
        />
      }
      backgroundColor={whiteThemeColors.background}
      onAndroidBack={() => {
        navigation.goBack();
        return true;
      }}
      hideTopSafeArea
      flex={1}
    >
        {isVisible && (
        <Search
                  onInputChange={onChangeText}
                  onClose={() => {
                      setisVisible(false);
                  } }
                  animSpeed={100}
                  data={PinList}
                  searchKey='name,pin'
                  isVisible={isVisible}
                  outPos={-110}
                  inPos={-10}
                  height={60} showCross        />
      )}
      {loading ? (
        <_ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
      ) : (
      <_View style={styles.tableContainer}>
        {/* Table Header */}
        <_View style={styles.tableHeader}>
          <_Text style={[styles.headerCell, { flex: 0.5 }]}>#</_Text>
          <_Text style={[styles.headerCell, { flex: 2 }]}>Full Name</_Text>
          <_Text style={[styles.headerCell, { flex: 1.5 }]}>Status</_Text>
          <_Text style={[styles.headerCell, { flex: 1 }]}>PIN</_Text>
        </_View>
        {/* Table Rows with FlatList */}
        <FlatList
          data={filterdStdList}
          keyExtractor={(_item, index) => `${_item.name}-${index}`}
          renderItem={({ item, index }: { item: any; index: number }) => (
            <Pressable
              key={item.name + index}
              style={[
                styles.tableRow,
                { backgroundColor: whiteThemeColors.white },
              ]}
            >
              <_Text style={[styles.cell, { flex: 0.5 }]}>{index + 1}</_Text>
              <_Text style={[styles.cell, { flex: 1.5 }]}>{item.name}</_Text>
              <_View style={[styles.cell, { flex: 1 }]}> 
                <_View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        item.status === 'Active'
                          ? whiteThemeColors.green
                          : whiteThemeColors.red,
                    },
                  ]}
                >
                  <_Text style={styles.statusText}>{item.status}</_Text>
                </_View>
              </_View>
              <_View style={[styles.cell, { flex: 1 }]}> 
                <Pressable
                  onPress={() => openStudentModal(item)}
                  style={{ marginLeft: 20, padding: 4 }}
                  hitSlop={8}
                >
                  <_VectorIcons
                    type="Feather"
                    name="eye"
                    size={20}
                    color={whiteThemeColors.primary}
                  />
                </Pressable>
              </_View>
            </Pressable>
          )}
          ListEmptyComponent={<_Text style={{ textAlign: 'center', margin: 20 }}>No students found.</_Text>}
        />
      </_View>
      )}
      {/* Student Info Modal */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={closeStudentModal}
      >
        <_View style={modalStyles.overlay}>
          <_View style={modalStyles.modalContainer}>
            <_Text style={modalStyles.modalTitle}>Kiosk PIN</_Text>
            <_Text style={modalStyles.modalName}>{selectedStudent?.name}</_Text>
            {modalLoading ? (
              <_ActivityIndicator size="large" style={{ marginVertical: 20 }} />
            ) : (
              <_Text style={modalStyles.modalPin}>{kioskPin}</_Text>
            )}
            <_View style={modalStyles.statusRow}>
              <_Text style={modalStyles.statusLabel}>Status: </_Text>
              <_Text style={[
                modalStyles.statusValue,
                { color: selectedStudent?.status === 'Active' ? whiteThemeColors.green : whiteThemeColors.red },
              ]}>
                {selectedStudent?.status}
              </_Text>
            </_View>
            <_Button
              btnText="Close"
              style={modalStyles.closeBtn}
              BtnTxt={modalStyles.closeBtnText}
              borderRadius={6}
              width={120}
              callback={closeStudentModal}
              submitting={true}
            />
          </_View>
        </_View>
      </Modal>
      {/* End Student Info Modal */}
    </_Screen>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    margin: 16,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: whiteThemeColors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: whiteThemeColors.background,
    borderBottomWidth: 1,
    borderBottomColor: whiteThemeColors.greyLite,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  headerCell: {
    fontFamily: CommonStyles.fonts.semiBold,
    fontSize: 15,
    color: whiteThemeColors.lightBlack,
    textAlign: 'left',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    marginVertical: 4,
    paddingHorizontal: 8,
    borderWidth: .5,
    borderRadius: 8,
    backgroundColor: whiteThemeColors.white,
    overflow: 'hidden',
  },
  cell: {
    justifyContent: 'center',
  },
  statusBadge: {
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: whiteThemeColors.white,
    fontFamily: CommonStyles.fonts.medium,
    fontSize: 13,
  },
  pinText: {
    fontFamily: CommonStyles.fonts.regular,
    fontSize: 15,
    color: whiteThemeColors.lightBlack,
    paddingHorizontal: 10,
    paddingVertical: 6,
    letterSpacing: 1,
    minWidth: 70,
    textAlign: 'center',
  },
  updateBtn: {
    backgroundColor: whiteThemeColors.primary,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: 4,
    marginRight: 4,
  },
  updateBtnText: {
    color: whiteThemeColors.white,
    fontFamily: CommonStyles.fonts.semiBold,
    fontSize: 14,
    textAlign: 'center',
  },
});

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: whiteThemeColors.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: whiteThemeColors.primary,
  },
  modalName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: whiteThemeColors.lightBlack,
  },
  modalPin: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 12,
    color: whiteThemeColors.primaryDark,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  statusLabel: {
    fontSize: 15,
    color: whiteThemeColors.lightBlack,
    fontWeight: '500',
  },
  statusValue: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  closeBtn: {
    backgroundColor: whiteThemeColors.primary,
    marginTop: 8,
    alignSelf: 'center',
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtnText: {
    color: whiteThemeColors.white,
    fontWeight: '600',
    fontSize: 15,
    textAlign: 'center',
  },
});