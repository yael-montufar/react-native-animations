import React from 'react';
import { StyleSheet } from 'react-native';
import { TrackProps, ScrollGestureContext } from '~types'

import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  cancelAnimation,
  withDecay,
} from 'react-native-reanimated';

import {
  PanGestureHandler, PanGestureHandlerGestureEvent
} from 'react-native-gesture-handler';


export default function Track({ children, dimensions, visibleTrackRange, scrollTranslation, boundedScrollTranslation }: TrackProps) {
  const scrollEventHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ScrollGestureContext>({
    onStart: (_event, context) => {
      context.changeX = boundedScrollTranslation.value

      cancelAnimation(scrollTranslation)
    },
    onActive: (event, context) => {
      scrollTranslation.value = context.changeX + event.translationX

      const lowerBound = Math.abs(boundedScrollTranslation.value)
      const upperBound = Math.abs(boundedScrollTranslation.value - dimensions.rootWidth)

      visibleTrackRange.value = [lowerBound, upperBound]

      console.log(visibleTrackRange.value)
    },
    onEnd: (event) => {
      scrollTranslation.value = withDecay({ velocity: event.velocityX })
    },
  })

  const trackStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: boundedScrollTranslation.value }
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
