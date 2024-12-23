import { XStack, YStack, Text, View, Avatar } from "tamagui";
import {
  Home,
  Users,
  Plus,
  MessageCircleMore,
  Settings,
} from "@tamagui/lucide-icons";
import { Link } from "one";
import * as routes from "~/src/lib/routes";
import { useRecentCommunities } from "../stores/recent-communities";
import { Community } from "lemmy-js-client";
import { createCommunitySlug } from "../lib/lemmy";
import { Image } from "expo-image";
import Logo from "~/assets/logo.svg";
import { useCustomHeaderHeight } from "./nav/hooks";

function SmallComunityCard({
  community,
}: {
  community: Pick<Community, "icon" | "title" | "name" | "id" | "actor_id">;
}) {
  const slug = createCommunitySlug(community);
  return (
    <Link href={`/c/${slug}`} key={community.id} asChild replace>
      <XStack ai="center" gap="$2.5" tag="a">
        <Avatar size="$2.5" borderRadius="$12">
          <Avatar.Image src={community.icon} />
          <Avatar.Fallback
            backgroundColor="$color8"
            borderRadius="$12"
            ai="center"
            jc="center"
          >
            <Text fontSize="$4" allowFontScaling>
              {community.title.substring(0, 1)}
            </Text>
          </Avatar.Fallback>
        </Avatar>
        <Text fontSize="$3.5" allowFontScaling>
          c/{community.name}
        </Text>
      </XStack>
    </Link>
  );
}

export function Sidebar() {
  const communities = useRecentCommunities((s) => s.recentlyVisited);
  const header = useCustomHeaderHeight();

  return (
    <>
      <YStack h={header.height} px="$4" jc="center">
        <Image
          source={Logo}
          style={{ height: 38, width: 90 }}
          contentFit="contain"
        />
      </YStack>
      <YStack gap="$3" p="$4" py="$2">
        <Link href={routes.home} replace asChild>
          <XStack ai="center" gap="$2.5" tag="a">
            <Home />
            <Text>Home</Text>
          </XStack>
        </Link>

        <Link href={routes.communities} replace asChild>
          <XStack ai="center" gap="$2.5" tag="a">
            <Users />
            <Text>Communities</Text>
          </XStack>
        </Link>

        <Link href={routes.create} replace asChild>
          <XStack ai="center" gap="$2.5" tag="a">
            <Plus />
            <Text>Create</Text>
          </XStack>
        </Link>

        <Link href={routes.chat} replace asChild>
          <XStack ai="center" gap="$2.5" tag="a">
            <MessageCircleMore />
            <Text>Chat</Text>
          </XStack>
        </Link>

        <Link href={routes.settings} replace asChild>
          <XStack ai="center" gap="$2.5" tag="a">
            <Settings />
            <Text>Settings</Text>
          </XStack>
        </Link>

        <View h={1} flex={1} bg="$color4" my="$2" />

        <Text color="$color10" fontSize="$3">
          RECENT
        </Text>
        {communities.map((c) => (
          <SmallComunityCard key={c.id} community={c} />
        ))}
      </YStack>
    </>
  );
}
