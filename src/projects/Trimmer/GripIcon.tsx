import React from 'react';
import { StyleSheet } from 'react-native';
import { GripIconProps } from './Types';

import { FontAwesome5 } from '@expo/vector-icons';

const GripIcon: React.FC<GripIconProps> = () =>
  <>
    <FontAwesome5 name="grip-vertical" size={12} color="black" />
    <FontAwesome5 name="grip-vertical" size={12} color="black" />
    <FontAwesome5 name="grip-vertical" size={12} color="black" />
  </>

export default GripIcon
