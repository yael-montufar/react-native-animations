import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Page from './Page'

const PAGES = [
  'Page 1',
  'Page 2',
  'Page 3',
]

export default function index() {
  const translationX = useSharedValue(0)

  const handleScroll = useAnimatedScrollHandler((event) => {
    /** Page index by offset
     * Page1: translationX = 0 | index = 0
     * Page2: translationX = 412 | index = 1
     * page3: translationX = 828 | index = 2
     * ∴ screenWidth * index = Page breakpoints
     */
    console.log(event.contentOffset.x)
    translationX.value = event.contentOffset.x
  })

  return (
    <Animated.ScrollView
      pagingEnabled
      horizontal
      style={styles.root}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      {PAGES.map((page, index) => (
        <Page key={`${index}`} title={page} index={index} reference={translationX} />
      ))}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#202020',
  }
});
