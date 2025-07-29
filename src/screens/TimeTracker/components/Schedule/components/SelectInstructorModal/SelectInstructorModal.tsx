import {
  ScheduleSelectInstructorModalInterface,
  wageInterface,
} from '../../../../../../interfaces';
import React, {useEffect, useState} from 'react';
import {FlatList, KeyboardAvoidingView, Modal, Platform} from 'react-native';
import {_ActivityIndicator} from '../../../../../Loader/_ActivityIndicator';
import ApiEndpoints from '../../../../../../../data/ApiEndpoints';
import {DataAccess} from '../../../../../../../data/DAL';
import {_View, endpoint} from '../../../../../../components';
import {
  ChangeButton,
  ListItemSeperator,
  ModalHeader,
  NoInstructorFound,
  RenderItem,
  SearchTextInput,
  StatusBox,
  WagesDropDown,
} from './components';
import {styles} from './style';

export const SelectInstructorModal: React.FC<
  ScheduleSelectInstructorModalInterface
> = ({
  modalVisible,
  setModalVisible,
  DayID,
  DayDate,
  ScheduleID,
  Description,
  BgColor,
  StartTimeString,
  EndTimeString,
  changeModalState,
  UserID,
}) => {
  const [allInstructors, setAllInstructors] = useState<
    fetchInstructorInterface[]
  >([]);
  const [selectedInstructor, setSelectedInstructor] = useState<any>(null);
  const [searchName, setSearchName] = useState('');
  const [userWages, setUserWages] = useState<wageInterface[]>([]);
  const [selectedWage, setSelectedWage] = useState<wageInterface>();
  const [dropdownWagesList, setDropdownWagesList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [wageListLoader, setWageListLoader] = useState(false);
  const [mainLoader, setMainLoader] = useState(false);
  const {PostSecured, Get} = DataAccess();

  interface fetchInstructorInterface {
    value: number;
    text: string;
  }

  const fetchInstructorList = () => {
    let url: endpoint = ApiEndpoints.GetScheduleInstructorList;
    url.params = `?Take=${10}&Skip=${0}`;
    setMainLoader(true);
    Get(url)
      .then((res: fetchInstructorInterface[]) => {
        if (res.length > 0)
          setAllInstructors(
            res.filter(
              (item: fetchInstructorInterface) => item.value != UserID,
            ),
          );
      })
      .catch((e: any) => {})
      .finally(() => setMainLoader(false));
  };

  const changeInstructor = () => {
    setLoading(true);

    const data = {
      DayID: DayID,
      UserID: selectedInstructor.value,
      DayDate: `${DayDate}`,
      ScheduleID: ScheduleID,
      Description: Description,
      BgColor: BgColor,
      StartTimeString: StartTimeString,
      EndTimeString: EndTimeString,
      ApplyForItem: selectedWage?.wageID,
    };
    PostSecured(ApiEndpoints.SaveSpecificDaySchedule, data).then(() => {
      setLoading(false);
      setModalVisible(false);
      changeModalState();
    });
  };
  useEffect(() => {
    fetchInstructorList();
  }, [modalVisible]);
  useEffect(() => {
    if (searchName !== '') {
      const results = allInstructors.filter((item: any) =>
        item.text.includes(searchName),
      );
      setUserWages([]);
      setSelectedInstructor(null);
      setAllInstructors(results);
    } else {
      fetchInstructorList();
    }
  }, [searchName]);

  const fetchWages = (item: fetchInstructorInterface) => {
    setSelectedWage(undefined);
    setWageListLoader(true);
    setUserWages([]);
    setSelectedInstructor(item);
    let _url: endpoint = ApiEndpoints.getUserWages;
    _url.params = `?userId=${item.value}`;
    Get(_url)
      .then((wages: wageInterface[]) => {
        setDropdownWagesList(
          wages.map((data: any) => {
            return data.itemName;
          }),
        );
        setUserWages(wages);
        setWageListLoader(false);
      })
      .catch((e: any) => {});
  };

  const handleOnWageChange = (index: number) => {
    setSelectedWage(userWages[index]);
  };

  return (
    <Modal
      transparent
      supportedOrientations={['portrait', 'landscape']}
      animationType="slide"
      visible={modalVisible}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
        style={styles.centeredView}>
        <_View style={styles.modalView}>
          <ModalHeader setModalVisible={setModalVisible} />
          <SearchTextInput setSearchName={setSearchName} />

          <WagesDropDown
            show={userWages.length > 0 && selectedInstructor}
            data={dropdownWagesList}
            onValueChange={handleOnWageChange}
          />

          <StatusBox
            wagesLength={userWages.length}
            isSelected={selectedInstructor}
            showLoader={wageListLoader}
          />

          {mainLoader ? (
            <_View style={styles.loaderContainer}>
              <_ActivityIndicator size="large" />
            </_View>
          ) : (
            <FlatList
              data={allInstructors}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <RenderItem
                  item={item}
                  selectedInstructor={selectedInstructor}
                  fetchWages={fetchWages}
                />
              )}
              ItemSeparatorComponent={() => <ListItemSeperator />}
              ListFooterComponent={<_View style={{height: 80}} />}
              ListEmptyComponent={() => (
                <NoInstructorFound show={allInstructors.length < 1} />
              )}
              keyExtractor={(item: any) => item.id}
            />
          )}

          <ChangeButton
            selectedInstructor={selectedInstructor}
            selectedWage={selectedWage}
            loading={loading}
            changeInstructor={changeInstructor}
          />
        </_View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
