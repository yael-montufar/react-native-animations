import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { CalculateGripPosition } from '~types'

import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated';

import { Markers, Trimmer } from '~components';

export default function index() {
  const [scrollWidth, setScrollWidth] = useState(0)

  const MEDIA_DURATION = 10
  // const CLIP_DURATION = 5

  const MARKER_CAP = 60
  const UNIT_MARKER_INTERVAL = 5

  const MARKER_WIDTH = 2
  const GRIP_WIDTH = 16

  const MARKER_COLOR = '#858585' // #C0C0C0A0 | #202020
  const TRACK_COLOR = '#202020'
  const TRIMMER_COLOR = '#CBFE00'

  const SCALE_FACTOR = MEDIA_DURATION > MARKER_CAP
    ? (scrollWidth - (GRIP_WIDTH * 2) - MARKER_WIDTH) / MARKER_CAP
    : (scrollWidth - (GRIP_WIDTH * 2) - MARKER_WIDTH) / MEDIA_DURATION

  const handleGripPosition: CalculateGripPosition = (secondsMark, variant) => {
    return variant === 'left'
      ? secondsMark * SCALE_FACTOR
      : -((GRIP_WIDTH * 2) + (secondsMark * SCALE_FACTOR) + MARKER_WIDTH) + GRIP_WIDTH
  }

  const handleScroll = useAnimatedScrollHandler((event) => {
  })

  return (
    <View style={styles.root}>
      <Animated.ScrollView
        style={[styles.scroll, { backgroundColor: TRACK_COLOR }]}
        horizontal
        bounces={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        onLayout={(event) => setScrollWidth(event.nativeEvent.layout.width)}
      // onContentSizeChange={(width) => setScrollLength(width)}
      // contentContainerStyle={{alignItems: 'center'}}
      >
        <Markers
          duration={MEDIA_DURATION}
          interval={UNIT_MARKER_INTERVAL}
          cap={MARKER_CAP}
          scrollWidth={scrollWidth}
          gripWidth={GRIP_WIDTH}
          color={MARKER_COLOR}
          markerWidth={MARKER_WIDTH}
        />
        <Trimmer
          gripWidth={GRIP_WIDTH}
          color={TRIMMER_COLOR}
          gripPosition={handleGripPosition}
        />
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 72,
    width: '100%',

    backgroundColor: 'transparent'
  },
  scroll: {
    height: '100%',
    width: '100%',
  },
});
