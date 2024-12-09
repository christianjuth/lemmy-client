import { useNavigation } from "one";
import {
  PostComment,
  buildCommentMap,
} from "~/src/components/posts/post-comment";
import { useEffect } from "react";
import { usePost, usePostComments } from "~/src/lib/lemmy";
import { PostDetail } from "~/src/components/posts/post-details";
import { Sidebar } from "~/src/components/communities/community-sidebar";
import { FeedGutters } from "../components/feed-gutters";

import { CommentView, PostView } from "lemmy-js-client";
import { memo, useMemo } from "react";
import { useTheme, View } from "tamagui";
import _ from "lodash";
import { FlatList } from "react-native";

const MemoedPostComment = memo(PostComment);

const EMPTY_ARR = [];

export function PostComments({
  postView,
  commentViews,
  loadMore,
  opId,
}: {
  postView: PostView;
  commentViews: CommentView[];
  loadMore: () => any;
  opId: number | undefined;
}) {
  const theme = useTheme();

  const structured = useMemo(() => {
    const map = buildCommentMap(commentViews);
    const topLevelItems = _.entries(map).sort(
      ([id1, a], [id2, b]) => a.sort - b.sort,
    );
    return { map, topLevelItems };
  }, [commentViews]);

  return (
    <FlatList
      data={["sidebar", "post", ...structured.topLevelItems] as const}
      renderItem={({ item }) => {
        if (item === "sidebar") {
          return (
            <FeedGutters>
              <View flex={1} />
              <Sidebar />
            </FeedGutters>
          );
        }

        if (item === "post") {
          return (
            <FeedGutters>
              <PostDetail postView={postView} />
              <></>
            </FeedGutters>
          );
        }

        return (
          <FeedGutters>
            <MemoedPostComment commentMap={item[1]} level={0} opId={opId} />
            <></>
          </FeedGutters>
        );
      }}
      keyExtractor={(id) => (typeof id === "string" ? id : id[0])}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      contentContainerStyle={{
        backgroundColor: theme.color1.val,
      }}
      stickyHeaderIndices={[0]}
    />
  );
}

export function Post({ postId }: { postId?: string }) {
  const nav = useNavigation();

  const { data } = usePost({
    id: postId ? parseInt(postId) : undefined,
  });

  const comments = usePostComments({
    post_id: postId ? parseInt(postId) : undefined,
    limit: 50,
    type_: "All",
    max_depth: 6,
    saved_only: false,
  });

  const postView = data?.post_view;

  const communityTitle = postView?.community.title;

  useEffect(() => {
    nav.setOptions({ title: communityTitle ?? "" });
  }, [communityTitle]);

  const allComments = comments.data
    ? comments.data.pages.map((p) => p.comments).flat()
    : EMPTY_ARR;

  if (!postView) {
    return null;
  }

  return (
    <PostComments
      commentViews={allComments}
      postView={postView}
      loadMore={() => {
        if (comments.hasNextPage && !comments.isFetchingNextPage) {
          comments.fetchNextPage();
        }
      }}
      opId={postView?.creator.id}
    />
  );
}
