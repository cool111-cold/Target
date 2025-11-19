import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { ProjectColors } from '../colors';

export const CuponIcon = ({ 
  size = 32, 
  color = ProjectColors.black, 
  ...props 
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      {...props}
    >
      {/* Основная форма билета */}
      <Path
        fill={color}
        d="M28.46 9H27a1 1 0 0 0 0 2h1v12H12a2 2 0 0 0 0-.35 1 1 0 0 0-2 0 .35.35 0 0 1-.35.35h-5.3a.35.35 0 0 1-.35-.35v-11.3a.35.35 0 0 1 .35-.35h5.3a.35.35 0 0 1 .35.35 1 1 0 1 0 2 0 2 2 0 0 0 0-.35h11a1 1 0 0 0 0-2H11a1 1 0 0 0-.51.16A2.32 2.32 0 0 0 9.65 9h-5.3A2.35 2.35 0 0 0 2 11.35v11.3A2.35 2.35 0 0 0 4.35 25h5.3a2.32 2.32 0 0 0 .84-.16A1 1 0 0 0 11 25h17.46A1.54 1.54 0 0 0 30 23.46V10.54A1.54 1.54 0 0 0 28.46 9z"
      />
      
      {/* Перфорации на билете */}
      <Path
        fill={color}
        d="M11 15a1 1 0 0 0 1-1 1 1 0 0 0-1-1 1 1 0 0 0-1 1 1 1 0 0 0 1 1z"
      />
      <Path
        fill={color}
        d="M10 17.11a1 1 0 0 0 2 0V17a1 1 0 0 0-2 0z"
      />
      <Path
        fill={color}
        d="M11 21a1 1 0 0 0 0-2 1 1 0 0 0 0 2z"
      />
      
      {/* Текст на билете */}
      <Path
        fill={color}
        d="M20 18a1 1 0 0 0 1 1h4a1 1 0 0 0 0-2h-4a1 1 0 0 0-1 1z"
      />
      <Path
        fill={color}
        d="M25 20h-7a1 1 0 0 0 0 2h7a1 1 0 0 0 0-2z"
      />
    </Svg>
  );
};