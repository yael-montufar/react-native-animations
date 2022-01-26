import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MarkerProps } from './Types';

const Markers: React.FC<MarkerProps> = ({ duration, scrollWidth, gripWidth, color }) => {
  const MARKERS = new Array(duration + 1).fill('') || [];
  const UNIT_MARKER_INTERVAL = 5

  return (
    <View style={[styles.root, { paddingHorizontal: gripWidth }]}>
      {MARKERS.map((_, index) => {
        const markerWidth = 2

        return (
          <View key={`${index}`} style={[
            styles.marker,
            { width: markerWidth, borderRadius: markerWidth, backgroundColor: color },
            index % UNIT_MARKER_INTERVAL === 0 && { height: '50%' },
            MARKERS.length - 1 > 60
              ?
              index !== 0 && { marginLeft: (scrollWidth - (61 * markerWidth) - (gripWidth * 2)) / (61 - 1) }
              :
              index !== 0 && { marginLeft: (scrollWidth - (MARKERS.length * markerWidth) - (gripWidth * 2)) / (MARKERS.length - 1) },
            // index === 0 && { marginLeft: handleWidth },
            // index === MARKERS.length - 1 && { marginRight: handleWidth },
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

    // backgroundColor: 'pink',
  },
  marker: {
    height: '25%',
  },
});

export default Markers
