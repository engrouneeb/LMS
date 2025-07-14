import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Text, _View } from '../../../../components';
import CommonStyles from '../../../CommonStyles';
import { _ActivityIndicator } from '../../../Loader';
interface props {
  loading?: boolean;
  Obj?: any;
  onPress?: any;
  title: string;
  isTag?: boolean;
}
const CardButton: React.FC<props> = ({
  loading = false,
  onPress,
  title,
  isTag = false,
}) => {
  return (
    <TouchableOpacity
      disabled={isTag}
      style={[
        styles.cancelbtn,
        {
          backgroundColor:
            title == 'Cancel' ? whiteThemeColors.red : whiteThemeColors.green,
        },
      ]}
      onPress={onPress}
    >
      {loading ? (
        <_View style={{ paddingVertical: 20, paddingHorizontal: 23 }}>
          <_ActivityIndicator color={'white'} showText={false} />
        </_View>
      ) : (
        <_Text
          style={{
            fontSize: 12,
            color: 'white',
            fontFamily: CommonStyles.fonts.semiBold,
          }}
        >
          {title}
        </_Text>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  cancelClass: {
    fontWeight: '100',
    padding: 5,
    paddingTop: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingBottom: 0,
  },
  cancelbtn: {
    backgroundColor: whiteThemeColors.red,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default CardButton;
