import { ScrollView, View } from "tamagui";
import { Sidebar } from "./sidebar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform } from "react-native";

function WebMaxHeight({ children }: { children: React.ReactNode }) {
  if (Platform.OS !== "web") {
    return children;
  }

  return <View h="100svh">{children}</View>;
}

export function MainAppTemplate({ children }: { children: React.ReactNode }) {
  return (
    <WebMaxHeight>
      <View h="100%" dsp="flex" fd="row" $sm={{ dsp: "contents" }}>
        <View
          w={270}
          backgroundColor="$background"
          brc="$color5"
          brw={1}
          $sm={{ dsp: "none" }}
        >
          <ScrollView>
            <SafeAreaView>
              <View>
                <Sidebar />
              </View>
            </SafeAreaView>
          </ScrollView>
        </View>

        <View flex={1} h="100%" $sm={{ dsp: "contents" }}>
          {children}
        </View>
      </View>
    </WebMaxHeight>
  );
}
