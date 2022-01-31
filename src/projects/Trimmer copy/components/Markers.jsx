import React from 'react';
import { StyleSheet, View } from 'react-native';

const Markers = ({
  duration,
  cap,
  interval,

  trackWidth,
  gripWidth,
  markerWidth,
  color
}) => {
  const MARKERS = new Array(duration + 1).fill('') || [];

  const calculateMargin = () => {
    return MARKERS.length - 1 > cap
      ? (trackWidth - ((cap + 1) * markerWidth) - (gripWidth * 2)) / (cap)
      : (trackWidth - (MARKERS.length * markerWidth) - (gripWidth * 2)) / (MARKERS.length - 1)
  }

  return (
    <View style={[styles.root, { paddingHorizontal: gripWidth }]}>
      {MARKERS.map((_, index) => {
        return (
          <View key={`${index}`} style={[
            styles.marker,
            { width: markerWidth, borderRadius: markerWidth, backgroundColor: color },
            index % interval === 0 && { height: '50%' },
            index !== 0 && { marginLeft: calculateMargin() },
          ]
          } />
        )
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: '100%',

    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: 'yellow',
  },
  marker: {
    height: '25%',
  },
});

export default Markers
