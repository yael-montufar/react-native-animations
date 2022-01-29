import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MarkerProps } from '~types';

const Markers: React.FC<MarkerProps> = ({
  duration,
  cap,
  interval,

  scrollWidth,
  gripWidth,
  markerWidth,
  color
}) => {
  const MARKERS = new Array(duration + 1).fill('') || [];

  const calculateMargin = (): number => {
    let margin

    if (MARKERS.length - 1 > cap) {
      margin = (scrollWidth - ((cap + 1) * markerWidth) - (gripWidth * 2)) / (cap)
    } else {
      margin = (scrollWidth - (MARKERS.length * markerWidth) - (gripWidth * 2)) / (MARKERS.length - 1)
    }

    return margin
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
  },
  marker: {
    height: '25%',
  },
});

export default Markers
