import React, { useEffect } from 'react';
import { useWindowDimensions, ViewProps } from 'react-native';
import {
  Easing,
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';

import { AnimationContainer } from './styles';

interface CardAnimationProps extends ViewProps {
  children: React.ReactNode;
}

export function CardAnimation({ children, ...rest }: CardAnimationProps) {
  const { width: displayWidth } = useWindowDimensions();

  const cardOpacity = useSharedValue(0);
  const cardOffset = useSharedValue(0.25 * displayWidth);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(cardOffset.value, [0, 25, 30, 50], [1, 0.8, 0.5, 0], Extrapolate.CLAMP),
      transform: [
        {translateX: interpolate(
          cardOffset.value,
          [0, 50],
          [0, 0.25 * displayWidth],
          Extrapolate.CLAMP
        )}
      ]
    }
  })

  useEffect(() => {
    cardOffset.value = withTiming(0, {duration: 1000});
    cardOpacity.value = withTiming(1, {duration: 1000});
  }, [cardOpacity.value, cardOffset.value]);

  return (
    <AnimationContainer {...rest} style={animatedStyle}>
      {children}
    </AnimationContainer>
  )
}
