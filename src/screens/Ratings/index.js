import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
// REMOVED: import Stars from 'react-native-star-rating';
// REPLACED WITH: Custom star rating component using React Native's built-in components
import { TouchableOpacity } from 'react-native';
import { whiteThemeColors } from '../../Utilities';
import { _Text, _View, _VectorIcons } from '../../components';

// Custom star rating component to replace react-native-star-rating
const renderStars = (rating, maxStars, size, emptyStarColor, fullStarColor) => {
  const stars = [];
  const starSize = size == undefined ? 26 : size;
  
  for (let i = 1; i <= maxStars; i++) {
    const filled = i <= rating;
    const halfFilled = i - 0.5 <= rating && i > rating;
    
    stars.push(
      <_VectorIcons
        key={i}
        type="MaterialIcons"
        name={filled ? 'star' : halfFilled ? 'star-half' : 'star-border'}
        size={starSize}
        color={filled || halfFilled ? fullStarColor : emptyStarColor}
        style={{ marginHorizontal: 1 }}
      />
    );
  }
  return stars;
};

function RatingComponent(props) {
  useEffect(() => {}, [props.rating]);
  return (
    <_View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <_View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {renderStars(
          props.rating,
          props.maxStars,
          props.size,
          whiteThemeColors.greyDark,
          whiteThemeColors.orange
        )}
      </_View>
      {props.reviewsCount >= 1 ? (
        <_Text
          style={[
            { marginLeft: 5, color: whiteThemeColors.greyDark },
            props.textStyle,
          ]}
        >{`${props.reviewsCount}`}</_Text>
      ) : null}
    </_View>
  );
}

RatingComponent.propTypes = {
  maxStars: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  reviewsCount: PropTypes.number,
};

export default React.memo(RatingComponent);
