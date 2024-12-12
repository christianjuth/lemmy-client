import { useListCommunities } from "~/src/lib/lemmy";
import { FlatList } from "react-native";
import { CommunityView } from "lemmy-js-client";
import { Text, YStack, Avatar, XStack } from "tamagui";
import { Link } from "one";
import { abbriviateNumber } from "~/src/lib/format";
import { Community } from "~/src/components/community";

// export function Community({ communityView }: { communityView: CommunityView }) {
//   const { community, counts } = communityView;

//   return (
//     <Link href={`/c/${community.id}`} key={community.id} asChild push>
//       <XStack ai="center" gap="$2" tag="a" p="$2">
//         <Avatar size="$3.5" borderRadius="$12">
//           <Avatar.Image src={community.icon} />
//           <Avatar.Fallback
//             backgroundColor="$color8"
//             borderRadius="$12"
//             ai="center"
//             jc="center"
//           >
//             <Text fontSize="$4">{community.title.substring(0, 1)}</Text>
//           </Avatar.Fallback>
//         </Avatar>
//         <YStack gap="$1">
//           <Text fontSize="$3.5">{community.title}</Text>
//           <Text fontSize="$3">
//             {abbriviateNumber(counts.subscribers)} members •{" "}
//             {abbriviateNumber(counts.posts)} posts
//           </Text>
//         </YStack>
//       </XStack>
//     </Link>
//   );
// }

export default function Communities() {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useListCommunities({
      limit: 50,
      sort: "TopDay",
    });

  const communities = data?.pages.map((p) => p.communities).flat();

  return (
    <FlatList
      data={communities}
      renderItem={(item) => <Community communityView={item.item} />}
      keyExtractor={(item) => String(item.community.id)}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
    />
  );
}
