import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export const NoPermission = () => {
  return (
    <View style={styles.container}>
      <Image
        //source={require('../../assets/NoPermisison.png')} // Replace this with your local image path
        source={require('../..//assets/NoPermissions.png')} // Replace this with your local image path
        style={styles.image}
        resizeMode='center'
      />
      <Text style={styles.message}>No Permission Found</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
  },
});
