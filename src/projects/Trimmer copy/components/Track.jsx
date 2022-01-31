import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  cancelAnimation,
  withDecay,
} from 'react-native-reanimated';
import {
  PanGestureHandler
} from 'react-native-gesture-handler';

import Markers from './Markers';

const MEDIA_DURATION = 10

const MARKER_CAP = 10
const UNIT_MARKER_INTERVAL = 5

const MARKER_WIDTH = 2
const GRIP_WIDTH = 16

const MARKER_COLOR = '#858585' // #C0C0C0A0 | #202020
const TRACK_COLOR = '#202020'
const TRIMMER_COLOR = '#CBFE00'

export default function Track({ rootWidth }) {
  const SCALE_FACTOR = MEDIA_DURATION > MARKER_CAP
    ? (rootWidth - (GRIP_WIDTH * 2) - MARKER_WIDTH) / MARKER_CAP
    : (rootWidth - (GRIP_WIDTH * 2) - MARKER_WIDTH) / MEDIA_DURATION

  const translationX = useSharedValue(0)

  // const boundedTranslationX = useDerivedValue(() => {
  //   const lowerBound = Math.min(translationX.value, 0)
  //   const upperBound = -(screenWidth * (PAGES.length - 1))

  //   return Math.max(lowerBound, upperBound)
  // })

  const gestureEventHandler = useAnimatedGestureHandler({
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
          trackStyle,
        ]}
      >
        <Markers
          duration={MEDIA_DURATION}
          cap={MARKER_CAP}
          interval={UNIT_MARKER_INTERVAL}
          trackWidth={rootWidth}
          gripWidth={GRIP_WIDTH}
          markerWidth={MARKER_WIDTH}
          color={MARKER_COLOR}
        />
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 72,
    flexDirection: 'row',
  }
});
