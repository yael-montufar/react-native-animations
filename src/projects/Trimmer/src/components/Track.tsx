import React from 'react';
import { StyleSheet } from 'react-native';
import { TrackProps, ScrollGestureContext } from '~types'

import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  cancelAnimation,
  withDecay,
  useDerivedValue,
} from 'react-native-reanimated';

import {
  PanGestureHandler, PanGestureHandlerGestureEvent
} from 'react-native-gesture-handler';


export default function Track({ children, dimensions }: TrackProps) {
  const translationX = useSharedValue(0)

  const boundedTranslationX = useDerivedValue(() => {
    const lowerBound = Math.min(translationX.value, 0)
    const upperBound = dimensions.rootWidth - dimensions.trackWidth

    return Math.max(lowerBound, upperBound)
  })

  const scrollEventHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ScrollGestureContext>({
    onStart: (_event, context) => {
      context.changeX = boundedTranslationX.value

      cancelAnimation(translationX)
    },
    onActive: (event, context) => {
      translationX.value = context.changeX + event.translationX

      // console.log(event.translationX)
    },
    onEnd: (event) => {
      translationX.value = withDecay({ velocity: event.velocityX })
    },
  })

  const trackStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: boundedTranslationX.value }
      ]
    }
  })

  return (
    <PanGestureHandler onGestureEvent={scrollEventHandler}>
      <Animated.View
        style={[
          styles.track,
          { height: dimensions.rootHeight },
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
