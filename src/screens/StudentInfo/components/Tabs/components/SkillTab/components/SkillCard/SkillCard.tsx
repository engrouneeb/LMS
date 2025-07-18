import React, { FC, useState } from 'react';
import { TouchableHighlight, TouchableOpacity } from 'react-native';
// REMOVED: import StarRating from 'react-native-star-rating';
// REPLACED WITH: Custom star rating component using React Native's built-in components
import {
  _Text,
  _View,
  _Image,
  _VectorIcons,
} from '../../../../../../../../components';
import { whiteThemeColors, collapsiableAnimation } from '../../../../../../../../Utilities';
import { styles } from './styles';
import { SkillCardInterface } from '../../../../../../../../interfaces';
import CommonStyles from '../../../../../../../CommonStyles';

// Custom star rating component to replace react-native-star-rating
const CustomStarRating: FC<{
  rating: number;
  maxStars: number;
  starSize: number;
  fullStarColor: string;
  disabled?: boolean;
  halfStarEnabled?: boolean;
  containerStyle?: any;
  starStyle?: any;
}> = ({ 
  rating, 
  maxStars, 
  starSize, 
  fullStarColor, 
  disabled = true,
  halfStarEnabled = false,
  containerStyle,
  starStyle
}) => {
  const renderStars = () => {
    const stars = [];
    const emptyStarColor = whiteThemeColors.greyDark;
    
    for (let i = 1; i <= maxStars; i++) {
      const filled = i <= rating;
      const halfFilled = halfStarEnabled && i - 0.5 <= rating && i > rating;
      
      stars.push(
        <_VectorIcons
          key={i}
          type="MaterialIcons"
          name={filled ? 'star' : halfFilled ? 'star-half' : 'star-border'}
          size={starSize}
          color={filled || halfFilled ? fullStarColor : emptyStarColor}
          style={starStyle}
        />
      );
    }
    return stars;
  };

  return (
    <_View style={[{ flexDirection: 'row', alignItems: 'center' }, containerStyle]}>
      {renderStars()}
    </_View>
  );
};

const SkillCard: FC<SkillCardInterface> = ({
  courseTitle,
  courseRating,
  levels,
  courseCertificate,
}) => {
  const [showImage, setShowImage] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  return (
    <_View style={styles.innerContainer}>
      <_View style={{ flexDirection: 'row' }}>
        <_Text
          numberOfLines={2}
          style={[
            styles.courseText,
            {
              maxWidth: '90%',
            },
          ]}
        >
          {courseTitle}
        </_Text>
        <TouchableOpacity
          onPress={() => {
            collapsiableAnimation();
            setShowDetails(!showDetails);
          }}
          style={styles.arrowIcon}
        >
          <_VectorIcons
            type='AntDesign'
            name={showDetails ? 'up' : 'down'}
            color={'white'}
          />
        </TouchableOpacity>
      </_View>
      <CustomStarRating
        disabled={true}
        maxStars={5}
        rating={courseRating}
        starStyle={{ paddingHorizontal: 4 }}
        starSize={14}
        containerStyle={styles.starContainer}
        halfStarEnabled
        fullStarColor={whiteThemeColors.orange}
      />
      {courseCertificate && (
        <TouchableOpacity
          onPress={() => {
            collapsiableAnimation();
            setShowCertificate(!showCertificate);
          }}
          style={styles.viewCertibtn}
        >
          <_Text style={styles.buttonText}>View Certificate</_Text>
        </TouchableOpacity>
      )}
      {showDetails &&
        Boolean(levels) &&
        levels.map((level) => {
          return (
            <_View style={styles.levelContainer}>
              <_Text numberOfLines={2} style={styles.levelText}>
                {level.levelTitle}
              </_Text>

              <CustomStarRating
                disabled={true}
                maxStars={5}
                rating={level.levelRating}
                starStyle={{ paddingHorizontal: 2 }}
                starSize={14}
                halfStarEnabled
                containerStyle={styles.starContainer2}
                fullStarColor={whiteThemeColors.orange}
              />
            </_View>
          );
        })}

      {showCertificate && (
        <_View
          style={[
            styles.imgContainer,
            {
              height: 250,
              width: '100%',
              marginBottom: 15,
              display: courseCertificate == '' ? 'none' : 'flex',
            },
          ]}
        >
          <_Image uri={courseCertificate} style={styles.image} />
        </_View>
      )}
    </_View>
  );
};
export default SkillCard;
