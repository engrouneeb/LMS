import { TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { _View, _VectorIcons, _Text } from 'components';
import React from 'react';
interface props {
  month: string;
  year: number;
  onPressPrev: () => void;
  onPressNext: () => void;
  setIsModalVisible: (val: boolean) => void;
}
export const CustomCalendarHeader: React.FC<props> = ({
  month,
  year,
  onPressPrev,
  onPressNext,
  setIsModalVisible,
}) => {
  return (
    <_View style={styles.assignedCalendarHeader}>
      <>
        <TouchableOpacity
          style={styles.assignedCalendarleft}
          onPress={onPressPrev}
        >
          <_VectorIcons type='AntDesign' name='left' color={'white'} />
        </TouchableOpacity>
        <_View style={styles.assignedMonthDay}>
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <_Text style={styles.assignedMonthText}>{`${month} ${year}`}</_Text>
          </TouchableOpacity>
        </_View>
        <TouchableOpacity
          style={styles.assignedCalendarRight}
          onPress={onPressNext}
        >
          <_VectorIcons type='AntDesign' name='right' color='white' />
        </TouchableOpacity>
      </>
    </_View>
  );
};
