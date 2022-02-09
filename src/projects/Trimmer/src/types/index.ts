import React from "react"
import Animated from "react-native-reanimated";

/* ---------------------------------- ROOT ---------------------------------- */
export interface TrimmerProps {
  mediaDuration: number;
  clipDuration: number;

  height?: number;
  trackColor?: string;

  markerCap?: number;
  unitMarkerInterval?: number;
  markerWidth?: number;
  markerColor?: string;

  trimmerColor?: string;
  gripWidth?: number;
}

/* ----------------------------- COMPONENTS ----------------------------- */
export interface MarkerProps {
  gripOffset: number;

  markers: any[];

  markerWidth: number;
  markerColor: string;

  unitMarkerInterval: number;

  markerGap: number;
}

export interface TrackProps {
  dimensions: {
    rootHeight: number;
    rootWidth: number;
    trackWidth: number;
  }

  children: React.ReactNode;

  visibleTrackRange: Animated.SharedValue<number[]>
  scrollTranslation: Animated.SharedValue<number>
  boundedScrollTranslation: Animated.SharedValue<number>
}

export interface LeftGripProps {
  gripWidth: number;
  color: string;

  gripPosition: CalculateGripPosition;

  dimensions: {
    rootWidth: number;
    trackWidth: number;
  }

  visibleTrackRange: Animated.SharedValue<number[]>
  scrollTranslation: Animated.SharedValue<number>
}

export interface ClipProps {
  handleGripPosition: CalculateGripPosition

  gripWidth: number,
  color: string,
}

/* -------------------------------- GESTURES -------------------------------- */
export type ScrollGestureContext = {
  changeX: number;
}

export type GripGestureContext = {
  changeX: number;
}

/* -------------------------------- UTILITIES ------------------------------- */
export type CalculateGripPosition = (secondsMark: number, variant: 'left' | 'right') => number;

export type Dimensions = {
  rootHeight?: number;
  rootWidth?: number;
  trackHeight?: number;
  trackWidth?: number;
}