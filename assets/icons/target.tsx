import React from 'react';
import Svg, { Path, G } from 'react-native-svg';
import { ProjectColors } from '../colors';

export const Target = ({ width = 60, height = 60, color = ProjectColors.white }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 128 128"
    >
      <G>
        <Path
          fill={color}
          d="M81.3 63.1c-.4-8.8-7.6-16-16.4-16.4V37h-1.8v9.7c-8.8.4-16 7.6-16.4 16.4H37v1.8h9.7c.4 8.8 7.6 16 16.4 16.4V91h1.8v-9.7c8.9-.4 16-7.6 16.4-16.4H91v-1.8h-9.7zm-3.5 1.8c-.4 6.9-6 12.5-12.9 12.9v-7.1h-1.8v7.1c-6.9-.4-12.5-6-12.9-12.9h7.1v-1.8h-7.1c.4-6.9 6-12.5 12.9-12.9v7.1h1.8v-7.1c6.9.4 12.5 6 12.9 12.9h-6.6v1.8h6.6zm39.4-2.7c-.9-27.9-23.4-50.5-51.4-51.4V0h-3.5v10.8c-27.9.9-50.5 23.4-51.4 51.4H0v3.5h10.8c.9 27.9 23.4 50.5 51.4 51.4V128h3.5v-10.8c28-.9 50.5-23.4 51.4-51.4H128v-3.5h-10.8zM64 111.9c-26.4 0-47.9-21.5-47.9-47.9S37.6 16.1 64 16.1s47.9 21.5 47.9 47.9-21.5 47.9-47.9 47.9z"
        />
      </G>
    </Svg>
  );
};