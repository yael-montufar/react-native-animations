import Animated from "react-native-reanimated";

export interface PageProps {
  title: string;
  index: number;
  reference: Animated.SharedValue<number>
}