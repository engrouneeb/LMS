import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';

export function Orientation(props: any) {
  useEffect(() => {
    props.getOrientation(
      Dimensions.get('window').height > Dimensions.get('window').width
        ? 'PORTRAIT'
        : 'LANDSCAPE',
    );
    const handleChangeDimension = (dimension: any) => {
      if (dimension.window.height > dimension.window.width) {
        props.getOrientation('PORTRAIT');
      } else {
        props.getOrientation('LANDSCAPE');
      }
    };
    Dimensions.addEventListener('change', handleChangeDimension);

    return () => {};
    // Dimensions.removeEventListener('change', handleChangeDimension);
  }, [props]);

  return <>{props.children}</>;
}

Orientation.propType = {
  getOrientation: PropTypes.func.isRequired,
};
