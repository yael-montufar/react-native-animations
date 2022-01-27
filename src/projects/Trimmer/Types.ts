import { StyleProp, ViewStyle } from "react-native";

export interface MarkerProps {
  duration: number,
  scrollWidth: number,
  gripWidth: number,
  color: string,
}

export interface GripProps {
  gripWidth: number,
  color: string,
  opacity: number,
  variant: string,
}

export interface TrimmerProps {
  gripWidth: number,
  width: number | string,
  color: string,
}

export interface GripIconProps {

}