import React from 'react';
import { StyleSheet } from 'react-native';
import { TrackProps, ScrollGestureContext } from '~types'

import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  cancelAnimation,
  withDecay,
} from 'react-native-reanimated';

import {
  PanGestureHandler, PanGestureHandlerGestureEvent
} from 'react-native-gesture-handler';


export default function Track({ children, rootDimensions }: TrackProps) {
  const translationX = useSharedValue(0)

  // const boundedTranslationX = useDerivedValue(() => {
  //   const lowerBound = Math.min(translationX.value, 0)
  //   const upperBound = -(screenWidth * (PAGES.length - 1))

  //   return Math.max(lowerBound, upperBound)
  // })

  const gestureEventHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ScrollGestureContext>({
    onStart: (event, context) => {
      context.changeX = translationX.value

      cancelAnimation(translationX)
    },
    onActive: (event, context) => {
      translationX.value = context.changeX + event.translationX
    },
    onEnd: (event, context) => {
      translationX.value = withDecay({ velocity: event.velocityX })
    },
  })

  const trackStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translationX.value }
      ]
    }
  })

  return (
    <PanGestureHandler onGestureEvent={gestureEventHandler}>
      <Animated.View
        style={[
          styles.track,
          { height: rootDimensions.height },
          trackStyle,
        ]}
      >
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
  },
});
