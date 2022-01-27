import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GripProps } from '~types';

import { FontAwesome5 } from '@expo/vector-icons';

const Grip: React.FC<GripProps> = ({ gripWidth, color, opacity, variant }) => {
  return (
    <View style={[
      styles.grip,
      {
        width: gripWidth,
        backgroundColor: color,
        opacity: opacity,
        borderTopLeftRadius: gripWidth / 8,
        borderBottomLeftRadius: gripWidth / 8
      },
      variant === 'right' && { transform: [{ rotate: '180deg' }] }
    ]}>
      <GripIcon />
    </View>
  );
}

const styles = StyleSheet.create({
  grip: {
    height: '100%',

    justifyContent: 'center',
    alignItems: 'center',

    zIndex: 1,
  },
});

export default Grip

const GripIcon = () => (
  <>
    <FontAwesome5 name="grip-vertical" size={12} color="black" />
    <FontAwesome5 name="grip-vertical" size={12} color="black" />
    <FontAwesome5 name="grip-vertical" size={12} color="black" />
  </>
)
