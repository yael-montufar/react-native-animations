import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GripProps } from './Types';

import GripIcon from './GripIcon'

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

export const Left = (props: any) => <Grip {...props} variant='left' />

export const Right = (props: any) => <Grip {...props} variant='right' />

const styles = StyleSheet.create({
  grip: {
    height: '100%',

    justifyContent: 'center',
    alignItems: 'center',

    zIndex: 1,
  },
});
