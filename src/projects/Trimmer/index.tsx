import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TrimmerProps } from '~types';

import { Markers, Track } from '~components';

const MEDIA_DURATION = 15
const CLIP_DURATION = 1

const ROOT_HEIGHT = 72
const TRACK_COLOR = '#202020'


const MARKER_CAP = 10
const UNIT_MARKER_INTERVAL = 5
const MARKER_WIDTH = 2
const MARKER_COLOR = '#858585' // #C0C0C0A0 | #202020

const TRIMMER_COLOR = '#CBFE00'
const GRIP_WIDTH = 16

export default function index(props: TrimmerProps) {
  const [rootWidth, setRootWidth] = useState(0)

  const SCALE_FACTOR = MEDIA_DURATION > MARKER_CAP
    ? (rootWidth - (GRIP_WIDTH * 2) - MARKER_WIDTH) / MARKER_CAP
    : (rootWidth - (GRIP_WIDTH * 2) - MARKER_WIDTH) / MEDIA_DURATION

  // const handleGripPosition: CalculateGripPosition = (secondsMark, variant) => {
  //   return variant === 'left'
  //     ? secondsMark * SCALE_FACTOR
  //     : -((GRIP_WIDTH * 2) + (secondsMark * SCALE_FACTOR) + MARKER_WIDTH) + GRIP_WIDTH
  // }

  return (
    <View
      style={[
        styles.root,
        { height: ROOT_HEIGHT, backgroundColor: TRACK_COLOR },
      ]}
      onLayout={(event) => setRootWidth(event.nativeEvent.layout.width)}
    >
      <Track rootDimensions={{ height: ROOT_HEIGHT, width: rootWidth }}>
        <Markers
          duration={MEDIA_DURATION}
          cap={MARKER_CAP}
          interval={UNIT_MARKER_INTERVAL}
          rootWidth={rootWidth}
          gripWidth={GRIP_WIDTH}
          markerWidth={MARKER_WIDTH}
          color={MARKER_COLOR}
        />
      </Track>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',

    overflow: 'hidden',
  },
});
