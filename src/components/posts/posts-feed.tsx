import { PostCard } from "~/src/components/posts/post";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { useTheme, View } from "tamagui";
import {
  Sidebar,
  SmallScreenSidebar,
} from "~/src/components/communities/community-sidebar";
import { CommunityBanner } from "../communities/community-banner";
import { FeedGutters } from "../feed-gutters";
import { useParams } from "one";
import { PopularCommunitiesSidebar } from "../populat-communities-sidebar";
import { useScrollToTop } from "@react-navigation/native";
import { useRef } from "react";
import { useCustomHeaderHeight } from "../nav/hooks";
import { useCustomTabBarHeight } from "../nav/bottom-tab-bar";
import { FlatList } from "react-native";

const EMPTY_ARR = [];

export function PostsFeed({
  posts,
}: {
  posts: UseInfiniteQueryResult<
    InfiniteData<{ posts: number[] }, unknown>,
    Error
  >;
}) {
  const tabBar = useCustomTabBarHeight();
  const header = useCustomHeaderHeight();

  const ref = useRef(null);
  useScrollToTop(ref);

  const { communityName } = useParams<{ communityName: string }>();

  const theme = useTheme();

  const {
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = posts;

  const data = posts.data?.pages.flatMap((res) => res.posts) ?? EMPTY_ARR;

  return (
    <FlatList
      contentInset={{
        top: header.height,
        bottom: tabBar.height,
      }}
      automaticallyAdjustsScrollIndicatorInsets={false}
      scrollIndicatorInsets={{
        top: header.height,
        bottom: tabBar.height,
      }}
      ref={ref}
      data={["sidebar-desktop", "sidebar-mobile", ...data] as const}
      renderItem={({ item }) => {
        if (item === "sidebar-desktop") {
          return (
            <FeedGutters>
              <View flex={1} />
              {communityName ? (
                <Sidebar communityName={communityName} />
              ) : (
                <PopularCommunitiesSidebar />
              )}
            </FeedGutters>
          );
        }

        if (item === "sidebar-mobile") {
          return communityName ? (
            <FeedGutters>
              <SmallScreenSidebar communityName={communityName} />
              <></>
            </FeedGutters>
          ) : null;
        }

        return (
          <FeedGutters>
            <PostCard postId={item} />
            <></>
          </FeedGutters>
        );
      }}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
      keyExtractor={(item) => String(item)}
      contentContainerStyle={{
        backgroundColor: theme.color1.val,
      }}
      refreshing={isRefetching}
      onRefresh={() => {
        if (!isRefetching) {
          refetch();
        }
      }}
      ListHeaderComponent={() => (
        <FeedGutters>
          <CommunityBanner />
        </FeedGutters>
      )}
      stickyHeaderIndices={[1]}
      scrollEventThrottle={16}
    />
  );
}
