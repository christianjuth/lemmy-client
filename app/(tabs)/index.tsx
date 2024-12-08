import { View } from "tamagui";
import { Feed } from "~/src/features/feed";

export default function HomePage() {
  return (
    <View height="100%" bg="$color1">
      <Feed />
    </View>
  );
}
