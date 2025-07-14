import { SelectInstructorModalRenderItemInterface } from 'interfaces';
import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Text, _VectorIcons, _View } from '../../../../../../../components';
import { UserImg } from '../../../../../../ThumbNail';
import CommonStyles from 'screens/CommonStyles';

export const RenderItem: FC<SelectInstructorModalRenderItemInterface> = ({
  item,
  selectedInstructor,
  fetchWages,
}) => {
  return (
    <_View>
      <TouchableOpacity
        disabled={selectedInstructor?.value == item?.value}
        onPress={() => fetchWages(item)}
        style={styles.cardContainer}
      >
        <UserImg
          UserInfo={{
            FirstName: item?.text?.split(' ')[0][0],
            LastName: item?.text?.split(' ')[1][0],
            UserImage: '',
            UserImageColor: whiteThemeColors.primary,
          }}
          size={60}
        />
        <_Text style={styles.nameText}>{item.text}</_Text>
        {selectedInstructor?.value == item?.value ? (
          <_VectorIcons
            type={'Entypo'}
            name='check'
            size={20}
            color={whiteThemeColors.primary}
            style={styles.iconStyle}
          />
        ) : null}
      </TouchableOpacity>
    </_View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  cardContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomColor: 'lightgray',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 15,
    paddingLeft: 20,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  iconStyle: {
    padding: 10,
    position: 'absolute',
    right: 10,
  },
});
