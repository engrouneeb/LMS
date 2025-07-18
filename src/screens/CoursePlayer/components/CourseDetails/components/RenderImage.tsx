import React from 'react';
import { Image } from 'react-native';
import defaultImg from '../../../../../../assets/courseDefault.jpg';
import { _Image, _View, _Text } from '../../../../../components';
import { _ActivityIndicator } from '../../../../Loader';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from '../styles';
interface props {
  image: string;
  imgType: string;
  load: boolean;
  setLoad: any;
}
export const RenderImage: React.FC<props> = ({ imgType, image, load }) => {
  return imgType === 'defaultImage' ? (
    <_View flex={1} style={styles.imgView}>
      <Image resizeMode='cover' source={defaultImg} style={styles.classImage} />
      <LinearGradient
        colors={['rgba(255, 255, 255, 0)', 'rgb(233, 238, 254)']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '60%',
        }}
      />
    </_View>
  ) : (
    <_View flex={1} style={styles.imgView}>
      <_Image  uri={image} style={styles.classImage} />
      <LinearGradient
        colors={['rgba(255, 255, 255, 0)', 'rgb(233, 238, 254)']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '60%',
        }}
      />
      {load && (
        <_ActivityIndicator
          style={{ bottom: 100 }}
          size={'large'}
          showText={false}
        />
      )}
    </_View>
  );
};
