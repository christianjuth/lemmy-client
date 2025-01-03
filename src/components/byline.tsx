import { View, Text, Avatar } from "tamagui";
import { RelativeTime } from "~/src/components/relative-time";

export function Byline({
  avatar,
  author,
  publishedDate,
  comunityName,
  authorType,
}: {
  avatar?: string;
  author: string;
  publishedDate: string;
  comunityName?: string;
  authorType?: "OP" | "Me";
}) {
  return (
    <View dsp="flex" fd="row" ai="center">
      <Avatar size={21} mr="$2">
        <Avatar.Image src={avatar} borderRadius="$12" />
        <Avatar.Fallback
          backgroundColor="$color8"
          borderRadius="$12"
          ai="center"
          jc="center"
        >
          <Text fontSize="$1">{author?.substring(0, 1).toUpperCase()}</Text>
        </Avatar.Fallback>
      </Avatar>
      {comunityName && (
        <>
          <Text fontSize="$3" fontWeight={500} color="$color11">
            {comunityName}
          </Text>
          <Text fontSize="$3" color="$color11">
            {" "}
            by{" "}
          </Text>
        </>
      )}
      <Text fontSize="$3" fontWeight={500}>
        {author}
        {authorType && <Text color={"$accentColor"}> ({authorType})</Text>}
      </Text>
      <RelativeTime
        prefix=" • "
        time={publishedDate}
        color="$color11"
        fontSize="$3"
      />
    </View>
  );
}
