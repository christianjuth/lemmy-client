import { View, Text, XStack, YStack } from "tamagui";
import { Markdown } from "~/src/components/markdown";
import _ from "lodash";
import { Byline } from "../byline";
import { CommentReplyButton, CommentVoting } from "../comments/comment-buttons";
import {
  InlineCommentReply,
  useCommentReaplyContext,
} from "../comments/comment-reply-modal";
import { useState } from "react";
import { useCommentsStore } from "~/src/stores/comments";

export function PostComment({
  commentMap,
  level,
  opId,
  myUserId,
  noBorder = false,
}: {
  commentMap: CommentMap;
  level: number;
  opId: number | undefined;
  myUserId: number | undefined;
  noBorder?: boolean;
}) {
  const replyCtx = useCommentReaplyContext();
  const [replying, setReplying] = useState(false);

  const { comment: commentPath, sort, ...rest } = commentMap;

  const commentView = useCommentsStore((s) =>
    commentPath ? s.comments[commentPath.path]?.data : undefined,
  );

  if (!commentView) {
    return null;
  }

  const sorted = _.entries(_.omit(rest)).sort(
    ([id1, a], [id2, b]) => a.sort - b.sort,
  );

  let color = "red";
  switch (level % 6) {
    case 0:
      color = "#FF2A33";
      break;
    case 1:
      color = "#F98C1D";
      break;
    case 2:
      color = "#DAB84D";
      break;
    case 3:
      color = "#459E6F";
      break;
    case 4:
      color = "#3088C1";
      break;
    case 5:
      color = "purple";
      break;
  }

  const comment = commentView.comment;
  const creator = commentView.creator;
  const avatar = creator.avatar;

  const hideContent = comment.removed || comment.deleted;

  return (
    <YStack
      mt={level === 0 ? "$2" : undefined}
      py={level === 0 ? "$3" : "$2"}
      bg="$background"
      bbc="$color3"
      bbw={level === 0 && !noBorder ? 1 : 0}
      $md={{
        px: level === 0 ? "$2.5" : undefined,
      }}
      flex={1}
      w="100%"
      opacity={comment.id < 0 ? 0.5 : undefined}
    >
      <Byline
        avatar={avatar}
        author={creator.name}
        publishedDate={comment.published}
        authorType={
          creator.id === opId
            ? "OP"
            : creator.id === myUserId
              ? "Me"
              : undefined
        }
      />

      <View
        blw={2}
        blc={color}
        p="$2"
        pr={0}
        pb={0}
        mt="$1"
        ml={9}
        ai="flex-start"
      >
        {comment.deleted && <Text fontStyle="italic">deleted</Text>}
        {comment.removed && <Text fontStyle="italic">removed</Text>}

        {!hideContent && (
          <View>
            <Markdown markdown={comment.content} />
          </View>
        )}

        <XStack
          ai="center"
          jc="flex-end"
          w="100%"
          mt="$1.5"
          mb="$1"
          mr="$1"
          gap="$3"
        >
          <CommentReplyButton
            commentView={commentView}
            onPress={() => {
              setReplying(true);
              replyCtx.setParentComment(commentView);
            }}
          />
          <CommentVoting commentView={commentView} />
        </XStack>

        {replying && (
          <InlineCommentReply
            postId={comment.post_id}
            onCancel={() => setReplying(false)}
            onSubmit={() => setReplying(false)}
            parent={commentView}
            autoFocus
          />
        )}

        {sorted.map(([id, map], i) => (
          <PostComment
            key={id}
            commentMap={map}
            level={level + 1}
            opId={opId}
            myUserId={myUserId}
          />
        ))}
      </View>
    </YStack>
  );
}

interface CommentMap {
  comment?: {
    path: string;
  };
  sort: number;
  [key: number]: CommentMap;
}

interface CommentMapTopLevel {
  [key: number]: CommentMap;
}

export function buildCommentMap(
  commentViews: {
    path: string;
  }[],
) {
  const map: CommentMapTopLevel = {};

  let i = 0;
  for (const view of commentViews) {
    let loc = map;
    const [_, ...path] = view.path.split(".");

    while (path.length > 1) {
      const front = path.shift()!;
      loc[front] = loc[front] ?? {};
      loc = loc[front];
    }

    const front = path.shift()!;
    loc[front] = loc[front] ?? {};
    loc[front].comment = view;
    loc[front].sort = i++;
  }

  return map;
}
