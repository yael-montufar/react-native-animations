const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREV = process.env.APP_VARIANT === "preview";

export default ({ config }) => { // passed from app.json
  return {
    ...config,
    name: IS_DEV ? "React Native Animations (Dev)" :
      IS_PREV ? "React Native Animations (Prev)" : config.name,
    slug: IS_DEV ? "react-native-animations-dev" :
      IS_PREV ? "react-native-animations-prev" : config.slug,
    version: process.env.VERSION || "1.0.0",
    ios: {
      bundleIdentifier: IS_DEV ? "com.yaelmontufar.reactnativeanimations.dev" :
        IS_PREV ? "com.yaelmontufar.reactnativeanimations.prev" : config.ios.bundleIdentifier,
      buildNumber: process.env.BUILD_NUMBER || "1",
    },
    android: {
      package: IS_DEV ? "com.yaelmontufar.reactnativeanimations.dev" :
        IS_PREV ? "com.yaelmontufar.reactnativeanimations.prev" : config.android.package,
      versionCode: process.env.VERSION_CODE || "1",
    },
  }
};
