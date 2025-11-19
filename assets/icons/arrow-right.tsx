import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const ArrowRight = () => {
    return (
      <Svg
        width={40}
        height={40}
        viewBox="0 0 24 24"
      >
        <Path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" fill="black" />
      </Svg>
    );
  };