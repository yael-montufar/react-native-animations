import React from 'react';
import { StyleSheet, View, useWindowDimensions, Text } from 'react-native';
import Animated, {
  useSharedValue
} from 'react-native-reanimated';
import { PageProps } from './Type'

const Page: React.FC<PageProps> = ({ title, index, reference }) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions()

  return (
    <View style={[
      styles({ screenWidth, screenHeight }).container,
      { backgroundColor: `rgba(0, 256, 0, 0.${index + 1})` }
    ]}>
      <Animated.View style={[styles({}).textContainer]}>
        <Text style={styles({}).text}>{title}</Text>
      </Animated.View>
    </View>
  );
}

const styles = (props?: any) => StyleSheet.create({
  container: {
    width: props.screenWidth,
    height: props.screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
  },
  text: {
    color: '#E5E5E5',
    fontSize: 32,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default Page
