import { Image } from 'react-native';
import { styles } from '../styles';
import { _Image } from '../../../../../components';
export const RenderImage = ({ imgType, image }: any) =>
  imgType === 'defaultImage' ? (
    <Image resizeMode='contain' source={image} style={styles.img} />
  ) : (
    <_Image resizeMode='contain' uri={image} style={styles.img} />
  );
