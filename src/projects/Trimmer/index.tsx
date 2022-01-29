import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated';

import { Markers, Trimmer } from '~components';

export default function index() {
  const [scrollWidth, setScrollWidth] = useState(0)

  const MEDIA_DURATION = 61
  const CLIP_DURATION = 10

  const GRIP_WIDTH = 16

  const MARKER_COLOR = '#858585' // #C0C0C0A0 | #202020
  const TRACK_COLOR = '#202020'
  const TRIMMER_COLOR = '#CBFE00'

  const SCALE_FACTOR = MEDIA_DURATION > 60
    ? (scrollWidth - (GRIP_WIDTH * 2) - 2) / 60
    : (scrollWidth - (GRIP_WIDTH * 2) - 2) / MEDIA_DURATION

  const handleScroll = useAnimatedScrollHandler((event) => {
    console.log((scrollWidth - (GRIP_WIDTH * 2) - 2) / 60)
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
          scrollWidth={scrollWidth}
          gripWidth={GRIP_WIDTH}
          color={MARKER_COLOR}
        />
        <Trimmer
          scale={SCALE_FACTOR}
          duration={CLIP_DURATION}
          gripWidth={GRIP_WIDTH}
          color={TRIMMER_COLOR}
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
