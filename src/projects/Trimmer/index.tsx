import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated';

import Markers from './Markers';
import Trimmer from './Trimmer';

export default function index() {
  const DURATION = 70
  const GRIP_WIDTH = 16
  const TRIMMER_COLOR = '#CBFE00'
  const MARKER_COLOR = '#858585' // #C0C0C0A0 | #202020
  const TRACK_COLOR = '#202020'

  const [scrollLength, setScrollLength] = useState(0)
  const [scrollWidth, setScrollWidth] = useState(0)

  const handleScroll = useAnimatedScrollHandler((event) => {
    console.log(scrollLength, scrollWidth, event.contentOffset.x)
    // console.log((scrollLength - scrollWidth) / ((MARKERS.length - 61)))
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
        onContentSizeChange={(width) => setScrollLength(width)}
        contentContainerStyle={{
          // alignItems: 'center',
        }}
      >
        <Markers
          duration={DURATION}
          scrollWidth={scrollWidth}
          gripWidth={GRIP_WIDTH}
          color={MARKER_COLOR}
        />
        <Trimmer
          gripWidth={GRIP_WIDTH}
          width={scrollWidth}
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
