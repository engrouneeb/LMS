import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Stars from 'react-native-star-rating';
import { whiteThemeColors } from 'utilities';
import { _Text, _View } from '../../components';

function RatingComponent(props) {
  useEffect(() => {}, [props.rating]);
  return (
    <_View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Stars
        maxStars={props.maxStars}
        disabled={true}
        rating={props.rating}
        emptyStarColor={whiteThemeColors.greyDark}
        fullStarColor={whiteThemeColors.orange}
        halfStarColor={whiteThemeColors.orange}
        starSize={props.size == undefined ? 26 : props.size}
        starStyle={{ marginHorizontal: 1 }}
      />
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
