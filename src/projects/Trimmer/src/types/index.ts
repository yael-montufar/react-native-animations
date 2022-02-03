import React from "react"

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
    width: number;
  },

  children: React.ReactNode
}

export interface ClipProps {
  handleGripPosition: CalculateGripPosition

  gripWidth: number,
  color: string,
}

export interface GripProps {
  gripWidth: number,
  color: string,
  opacity: number,

  gestureHandler: any,
  animatedStyle: any,
}

/* -------------------------------- GESTURES -------------------------------- */
export type GripGestureContext = {
  changeX: number;
}

export type ScrollGestureContext = {
  changeX: number;
}

/* -------------------------------- UTILITIES ------------------------------- */
export type CalculateGripPosition = (secondsMark: number, variant: 'left' | 'right') => number
