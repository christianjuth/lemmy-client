import { Text, View, YStack } from "tamagui";
import { Image } from "~/src/components/image";
import { Markdown } from "~/src/components/markdown";
import { Voting } from "~/src/components/posts/post-buttons";
import { PostView } from "lemmy-js-client";
import { Byline } from "../byline";

export function PostDetail({ postView }: { postView: PostView }) {
  const post = postView.post;
  const thumbnail = post?.thumbnail_url;
  const body = post?.body;

  return (
    <YStack
      $md={{
        px: "$2.5",
      }}
      py="$2.5"
      bbc="$color5"
      bbw={1}
      gap="$2"
      flex={1}
    >
      <Text fontWeight={500} fontSize="$8" lineHeight="$7">
        {postView.post.name}
      </Text>
      {thumbnail && <Image imageUrl={thumbnail} priority borderRadius={15} />}
      {body && <Markdown markdown={body} />}

      <Byline
        avatar={postView.community.icon}
        author={postView.community.name}
        publishedDate={post.published}
        comunityName={postView.community.name}
      />

      <View dsp="flex" fd="row" ai="flex-start">
        {postView && <Voting postView={postView} />}
      </View>
    </YStack>
  );
}
