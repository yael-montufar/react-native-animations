import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TrimmerProps, CalculateGripPosition } from '~types';

import { Markers, Track, LeftGrip } from '~components';

const MEDIA_DURATION = 90
const CLIP_DURATION = 1

const ROOT_HEIGHT = 72
const TRACK_COLOR = '#202020'


const MARKER_CAP = 60
const UNIT_MARKER_INTERVAL = 5
const MARKER_WIDTH = 2
const MARKER_COLOR = '#858585' // #C0C0C0A0 | #202020

const TRIMMER_COLOR = '#CBFE00'
const GRIP_WIDTH = 16

export default function index(props: TrimmerProps) {
  const [rootWidth, setRootWidth] = useState(0)

  const MARKERS = new Array(MEDIA_DURATION + 1).fill('') || [];

  const MARKER_GAP = MARKERS.length - 1 > MARKER_CAP
    ? (rootWidth - ((MARKER_CAP + 1) * MARKER_WIDTH) - (GRIP_WIDTH * 2)) / (MARKER_CAP)
    : (rootWidth - (MARKERS.length * MARKER_WIDTH) - (GRIP_WIDTH * 2)) / (MARKERS.length - 1)

  const TRACK_WIDTH = (2 * GRIP_WIDTH) + (MARKER_GAP * MEDIA_DURATION) + (2 * MARKERS.length)

  const SCALE_FACTOR = MEDIA_DURATION > MARKER_CAP
    ? (rootWidth - (GRIP_WIDTH * 2) - MARKER_WIDTH) / MARKER_CAP
    : (rootWidth - (GRIP_WIDTH * 2) - MARKER_WIDTH) / MEDIA_DURATION

  const getGripPosition: CalculateGripPosition = (secondsMark, variant) => {
    return variant === 'left'
      ? secondsMark * SCALE_FACTOR
      : -((GRIP_WIDTH * 2) + (secondsMark * SCALE_FACTOR) + MARKER_WIDTH) + GRIP_WIDTH
  }

  return (
    <View
      style={[
        styles.root,
        { height: ROOT_HEIGHT, backgroundColor: TRACK_COLOR },
      ]}
      onLayout={(event) => setRootWidth(event.nativeEvent.layout.width)}
    >
      <Track dimensions={{ rootHeight: ROOT_HEIGHT, rootWidth: rootWidth, trackWidth: TRACK_WIDTH }}>
        <LeftGrip
          gripWidth={GRIP_WIDTH}
          color={TRIMMER_COLOR}
          gripPosition={getGripPosition}
          dimensions={{ trackWidth: TRACK_WIDTH }}
        />
        <Markers
          gripOffset={GRIP_WIDTH}
          markers={MARKERS}
          markerWidth={MARKER_WIDTH}
          markerColor={MARKER_COLOR}
          unitMarkerInterval={UNIT_MARKER_INTERVAL}
          markerGap={MARKER_GAP}
        />
      </Track>
    </View >
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',

    overflow: 'hidden',
  },
});
