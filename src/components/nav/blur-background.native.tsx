import { View } from "tamagui";
import { BlurView } from "expo-blur";

export function BlurBackground() {
  return (
    <>
      <BlurView
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
      />
      <View bg="$color1" opacity={0.7} pos="absolute" t={0} r={0} b={0} l={0} />
    </>
  );
}
