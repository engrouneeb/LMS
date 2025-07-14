import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { _Text, _View, _VectorIcons } from '../../../components';
import { whiteThemeColors } from 'utilities';
import CommonStyles from 'screens/CommonStyles';
import {
  ScrollView,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';

interface YearListProps {
  setSelectedMonth: (val: string) => void;
  GetEventsDetails: (val: string) => void;
  setIsModalVisible: (val: boolean) => void;
}

export const YearList: React.FC<YearListProps> = ({
  setSelectedMonth,
  GetEventsDetails,
  setIsModalVisible,
}) => {
  const [arr, setArr] = useState([]);
  useEffect(() => {
    for (let i = dayjs().year(); i > dayjs().year() - 100; i--) {
      setArr((prev) => [...prev, i]);
    }
  }, []);
  return (
    arr.length > 0 && (
      <_View
        style={{
          zIndex: 10,
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: whiteThemeColors.white,
          borderRadius: 20,
          padding: 10,
        }}
      >
        <_View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 40,
          }}
        >
          <_View style={{ width: '100%', alignItems: 'center' }}>
            <_Text
              style={{
                fontSize: 18,
                fontFamily: CommonStyles.fonts.semiBold,
              }}
            >
              Select Year
            </_Text>
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              style={{
                width: 30,
                height: 30,
                backgroundColor: whiteThemeColors.background,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                right: 10,
              }}
            >
              <_VectorIcons
                type={'Entypo'}
                name='cross'
                size={20}
                color={whiteThemeColors.black}
              />
            </TouchableOpacity>
          </_View>

          <TouchableNativeFeedback onPress={() => setIsModalVisible(false)}>
            <_View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            ></_View>
          </TouchableNativeFeedback>
        </_View>
        <ScrollView nestedScrollEnabled>
          <_View
            style={{
              alignItems: 'center',
              zIndex: 25,

              width: '100%',
              height: '100%',
            }}
          >
            {arr.map((year) => (
              <TouchableOpacity
                key={year}
                onPress={() => {
                  GetEventsDetails(
                    dayjs().subtract(dayjs().year() - year, 'years'),
                  );
                  setSelectedMonth(
                    new Date(dayjs().subtract(dayjs().year() - year, 'years')),
                  );
                  setIsModalVisible(false);
                }}
              >
                <_View style={{ width: '100%', marginBottom: 25 }}>
                  <_Text
                    style={{
                      fontSize: 16,
                      fontFamily: CommonStyles.fonts.medium,
                    }}
                  >
                    {year}
                  </_Text>
                </_View>
              </TouchableOpacity>
            ))}
          </_View>
        </ScrollView>
      </_View>
    )
  );
};
