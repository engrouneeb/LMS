import React, { FC, useState } from 'react';
import { TouchableHighlight, TouchableOpacity } from 'react-native';
import StarRating from 'react-native-star-rating';
import {
  _Text,
  _View,
  _Image,
  _VectorIcons,
} from '../../../../../../../../components';
import { whiteThemeColors, collapsiableAnimation } from 'utilities';
import { styles } from './styles';
import { SkillCardInterface } from 'interfaces';
import CommonStyles from 'screens/CommonStyles';

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
      <StarRating
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

              <StarRating
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
