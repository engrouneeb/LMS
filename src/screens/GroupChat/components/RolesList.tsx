import React, { FC } from 'react';
import { _View, _Text, _VectorIcons } from '../../../components';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import CommonStyles from '../../CommonStyles';
import { whiteThemeColors } from '../../../Utilities';

interface Props {
  roles: { Chatfor: number; TabName: string };
  setRoles: (item: { Chatfor: number; TabName: string }) => void;
}
export const RoleList: FC<Props> = ({ roles, setRoles }) => {
  return (
    <_View style={styles.webViewContainer}>
      <_Text style={styles.headText}>Select Role</_Text>
      <_Text style={styles.desc}>
        Choose the role that best fits your participation in the group. Each
        role comes with specific users.
      </_Text>
      <FlatList
        data={roles}
        style={{ marginTop: 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setRoles(item)} style={styles.card}>
            <_View style={{ marginLeft: 10 }}>
              <_Text style={{ fontFamily: CommonStyles.fonts.medium }}>
                {item.TabName}
              </_Text>
            </_View>
            <_View style={styles.container}>
              <_VectorIcons type='AntDesign' name='right' />
            </_View>
          </TouchableOpacity>
        )}
      />
    </_View>
  );
};
const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 70,
    backgroundColor: whiteThemeColors.primary + 20,
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  container: {
    backgroundColor: whiteThemeColors.primary + 40,
    width: 24,
    height: 24,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 30,
  },
  headText: {
    fontFamily: CommonStyles.fonts.semiBold,
    fontSize: 20,
  },
  desc: {
    fontFamily: CommonStyles.fonts.regular,
    fontSize: 12,
    color: 'gray',
  },
  webViewContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});
