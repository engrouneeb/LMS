import { CopyWeekScheduleInterface } from 'interfaces';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, FlatList, Modal } from 'react-native';
import { useDispatch } from 'react-redux';
import ApiEndpoints from '../../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../../data/DAL';
import { loading } from '../../../../../../actions/AsyncStorage';
import { endpoint, isPortrait, _View } from '../../../../../../components';
import Header from '../../../../../Headers';
import { RenderList, Title, YearMonthDropDown } from './components';
import {
  getInitialData,
  handleOnMonthValueChange,
} from './CopyWeekScheduleFunctions';
import { styles } from './style';

const CopyWeekSchedule: React.FC<CopyWeekScheduleInterface> = ({
  selectedWeekStartDate,
  selectedWeekEndDate,
  changeModalState,
  fetchData,
  userID,
  showModal,
}) => {
  const dispatch = useDispatch();
  const [weekDatesList, setWeekDatesList] = useState([]);
  const [monthName, setMonthName] = useState('');
  const monthsNameList = moment.months();
  const yearName = moment(new Date(selectedWeekStartDate)).format('YYYY');
  const [screenHeight, setScreenHeight] = useState(680);
  const { PostSecured } = DataAccess();

  useEffect(() => {
    getInitialData(selectedWeekStartDate, setMonthName, setWeekDatesList);
  }, []);
  useEffect(() => {
    const subs = Dimensions.addEventListener('change', () => {
      setScreenHeight(isPortrait() ? 680 : 300);
    });
    return () => subs.remove();
  }, []);
  const handleCopyWeekSchedule = (startDate: string, endDate: string) => {
    let endPoint: endpoint = ApiEndpoints.CopyWeekSchedule;
    var obj = {
      selectedWeekStartDate: selectedWeekStartDate,
      selectedWeekEndDate: selectedWeekEndDate,
      copyWeekStartDate: startDate,
      copyWeekEndDate: endDate,
      userId: userID,
    };

    dispatch(loading(true));
    PostSecured(endPoint, obj).then((res: any) => {
      dispatch(loading(false));
      if (Boolean(res)) {
        if (res.isCopied) {
          fetchData();
          changeModalState(false);
        }
      } else
        Alert.alert(
          res.error_description || 'There is an error Copying Schedule'
        );
    });
  };

  const handleSelect = (index: any) => {
    handleOnMonthValueChange(
      index,
      monthsNameList,
      yearName,
      setMonthName,
      setWeekDatesList
    );
  };
  return (
    <Modal
      animationType='slide'
      transparent={false}
      visible={showModal}
      onRequestClose={() => changeModalState(false)}
      supportedOrientations={['landscape', 'portrait']}
    >
      <Header
        isBack
        Screen={'Copy Week Schedule'}
        GoBack={() => changeModalState(false)}
      />
      <_View>
        <_View style={{ paddingVertical: 20 }}>
          <Title
            startDate={selectedWeekStartDate}
            endDate={selectedWeekEndDate}
          />

          <YearMonthDropDown
            yearName={yearName}
            monthsNameList={monthsNameList}
            monthName={monthName}
            onSelect={(index: string) => handleSelect(index)}
          />
        </_View>
        <_View
          style={{
            ...styles.flatListContainer,
            height: screenHeight,
          }}
        >
          <FlatList
            style={styles.flatListStyle}
            showsVerticalScrollIndicator={false}
            data={weekDatesList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <RenderList
                item={item}
                index={index}
                monthName={monthName}
                copyWeekSchedule={handleCopyWeekSchedule}
              />
            )}
            ListFooterComponent={<_View style={{ height: 200 }} />}
          />
        </_View>
      </_View>
    </Modal>
  );
};

export { CopyWeekSchedule };
