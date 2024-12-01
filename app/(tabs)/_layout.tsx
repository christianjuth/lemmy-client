import { Tabs, Slot } from "one";
import { Home } from "@tamagui/lucide-icons";
import { useShouldUseReactNavigation } from "~/src/lib/navigation";

export default function Layout() {
  const shoudUseNativeNav = useShouldUseReactNavigation();

  return (
    <>
      {!shoudUseNativeNav ? (
        <Slot />
      ) : (
        <Tabs>
          <Tabs.Screen
            name="(home)"
            options={{
              title: "Home",
              tabBarIcon: ({ color }) => <Home color={color} />,
              headerShown: false,
            }}
          />
        </Tabs>
      )}
    </>
  );
}
