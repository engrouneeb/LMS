import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _View, attendanceStudentInterface } from '../../../components';
import { _ActivityIndicator } from '../../Loader';
import EmptyList from './ListEmpty';
import StudentListCard from './StudentListCard';
const StudentsList = (props: attendanceStudentInterface) => {
  const [refetchLoader] = useState(false);
  const [previous, setprevious] = useState<null | number>(null);
  const onitrate = (index: number) => {
    let arr: any = [...props.filteredStudentlist];
    if (previous !== null) {
      if (previous === index && arr[previous].showDropDown) {
        arr[previous].showDropDown = false;
        arr[index].showDropDown = false;
        setprevious(null);
      } else {
        arr[previous].showDropDown = false;
        arr[index].showDropDown = true;
        setprevious(index);
      }
    } else {
      arr[index].showDropDown = true;
      setprevious(index);
    }
    props.setFilteredStudentlist(arr);
  };
  const FooterLoader = () => {
    return (
      <_View
        style={{
          width: '100%',
          height: 40,
          justifyContent: 'center',
          marginTop: 10,
        }}
      >
        <_ActivityIndicator
          color={whiteThemeColors.greyDark}
          showText={false}
        />
      </_View>
    );
  };
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={{ paddingVertical: 5 }}
      data={props?.filteredStudentlist}
      contentContainerStyle={{ paddingBottom: 95 }}
      ListEmptyComponent={() => <EmptyList />}
      onEndReachedThreshold={0.3}
      renderItem={({ item, index }) => (
        <StudentListCard
          key={index}
          item={item}
          props={props}
          index={index}
          onItrate={onitrate}
        />
      )}
      ListFooterComponent={refetchLoader ? <FooterLoader /> : undefined}
    />
  );
};

export default StudentsList;
