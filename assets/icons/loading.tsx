import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import Svg, { G, Rect } from "react-native-svg";

const AnimatedRect = Animated.createAnimatedComponent(Rect);

export const Spinner = ({
  size = 100,
  color = "#000",
  duration = 1000,
}) => {
  const animations = useRef(
    [...Array(12)].map(() => new Animated.Value(1))
  ).current;

  useEffect(() => {
    const loops = animations.map((anim, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay((duration / 12) * i),
          Animated.timing(anim, {
            toValue: 0,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      )
    );

    loops.forEach(loop => loop.start());

    return () => loops.forEach(loop => loop.stop());
  }, []);

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {animations.map((opacity, i) => (
        <G key={i} transform={`rotate(${i * 30} 50 50)`}>
          <AnimatedRect
            x="47.5"
            y="19.5"
            width="5"
            height="5"
            rx="2.35"
            ry="2.35"
            fill={color}
            opacity={opacity}
          />
        </G>
      ))}
    </Svg>
  );
}
