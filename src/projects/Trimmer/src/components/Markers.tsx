import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MarkerProps } from '~types';

export default function Markers({
  gripOffset,

  markers,

  markerWidth,
  markerColor,

  unitMarkerInterval,

  markerGap,
}: MarkerProps) {
  return (
    <View style={[styles.root, { paddingHorizontal: gripOffset }]}>
      {markers.map((_: any, index: number) => {
        return (
          <View key={`${index}`} style={[
            styles.marker,
            { width: markerWidth, borderRadius: markerWidth, backgroundColor: markerColor },
            index % unitMarkerInterval === 0 && { height: '50%' },
            index !== 0 && { marginLeft: markerGap },
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

    position: 'absolute',
  },
  marker: {
    height: '25%',
  },
});
