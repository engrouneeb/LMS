import React, { FC } from 'react';
import { _View, _Text, _Image, _Button } from '../../../components';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import CommonStyles from '../../CommonStyles';
import { isParent, isStudent, whiteThemeColors } from '../../../Utilities';
interface Props {
  setShowModal: (val: boolean) => void;
  isLoading: boolean;
  role: string;
}
export const NoGroupComponents: FC<Props> = ({
  setShowModal,
  isLoading,
  role,
}) => {
  return (
    <_View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          color={whiteThemeColors.primary}
          style={styles.spinner}
        />
      ) : (
        <>
          <Image
            style={styles.image}
            source={require('../../../../assets/groupChat.png')}
          />
          <_View style={styles.textContainer}>
            <_Text style={styles.headText}>
              Enjoy the new experience of chating with other users
            </_Text>
            <_Text style={styles.descText}>
              Our group chat app is a communications platform designed to help
              people connect, collaborate and share in groups.
            </_Text>
          </_View>
          {!isStudent(role) && !isParent(role) && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowModal(true)}
            >
              <_Text style={styles.buttonText}>Create Group</_Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </_View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: 200,
    marginTop: 50,
  },
  textContainer: {
    height: 200,
    width: '75%',
    justifyContent: 'center',
  },
  headText: {
    fontSize: 18,
    fontFamily: CommonStyles.fonts.semiBold,
    textAlign: 'center',
    marginTop: 10,
  },
  descText: {
    fontSize: 12,
    fontFamily: CommonStyles.fonts.regular,

    textAlign: 'center',
    marginTop: 10,
    color: 'gray',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: whiteThemeColors.primary + 80,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  spinner: {
    flex: 1,
    marginTop: '40%',
  },
});
