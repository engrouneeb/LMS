import { _Image, _Text, _VectorIcons, _View } from '../../../../components';
import React, { FC, useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import CommonStyles from '../../../../screens/CommonStyles';
import { whiteThemeColors } from 'utilities/colors';

interface CourseCardProps {
  courseDetails: {
    id: number;
    name: string;
    isSelected: boolean | undefined;
  };
  onSelect: (id: number) => void;
}

export const CourseCard: FC<CourseCardProps> = ({
  courseDetails,
  onSelect,
}) => {
  const { id, name, isSelected } = courseDetails;
  const [selected, setIsSelected] = useState<boolean | null>(isSelected);
  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);
  return (
    <_View style={styles.card}>
      <_View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: whiteThemeColors.primary + 30,
          borderWidth: 1,
          borderColor: whiteThemeColors.primary + 90,
          marginRight: 10,
        }}
      >
        <_VectorIcons
          size={25}
          type={'MaterialCommunityIcons'}
          name={'clipboard-text-outline'}
          color={whiteThemeColors.primary + 90}
        />
      </_View>
      <_View flexDirection='row' style={styles.content}>
        <_View width={'90%'}>
          <_Text style={styles.courseName}>{name}</_Text>
        </_View>
        <TouchableOpacity
          hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
          onPress={() => {
            onSelect(id);
            setIsSelected(!selected);
          }}
          style={{ alignSelf: 'flex-end' }}
        >
          <_VectorIcons
            size={20}
            type={'AntDesign'}
            name={'checkcircleo'}
            color={selected ? 'green' : 'grey'}
          />
        </TouchableOpacity>
      </_View>
    </_View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginVertical: 5,
    padding: 15,
  },
  content: {
    flex: 1,
  },
  courseName: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: CommonStyles.fonts.medium,
  },
  checkInStatus: {
    fontSize: 12,
    color: '#555555',
  },
});

export default CourseCard;
