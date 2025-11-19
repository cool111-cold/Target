import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

export const EphirIcon = ({ size = 30, color = '#000' }) => {
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 138.627 140">
        <G 
          fill="none" 
          stroke={color} 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="4"
        >
          <Path d="m94.579 77.947-25.27 35.62-25.26-35.62 25.26 15.38 25.27-15.38z"/>
          <Path d="m94.579 68.893-25.27 15.37-25.26-15.37 25.26-11.19 25.27 11.19z"/>
          <Path d="m94.579 68.893-25.27-11.19-25.26 11.19 25.26-42.46 25.27 42.46z"/>
        </G>
      </Svg>
    </View>
  );
};
