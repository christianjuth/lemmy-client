import {
  GetCommunity,
  GetPosts,
  LemmyHttp,
  ListCommunities,
  Login,
} from "lemmy-js-client";
import {
  useQuery,
  useInfiniteQuery,
  InfiniteData,
  useQueryClient,
} from "@tanstack/react-query";
import {
  GetComments,
  GetPost,
  GetPostResponse,
  GetPostsResponse,
} from "lemmy-js-client";
import { Image as Image } from "react-native";
import { useSorts } from "~/src/stores/sorts";

const imageAspectRatioCache = new Map<
  string,
  Promise<{ width: number; height: number }>
>();

export async function measureImage(src: string) {
  if (imageAspectRatioCache.has(src)) {
    return imageAspectRatioCache.get(src);
  }

  const p = new Promise<{
    width: number;
    height: number;
  }>((resolve, reject) => {
    Image.getSize(
      src,
      (width, height) => {
        resolve({ width, height });
      },
      reject,
    );
  });

  imageAspectRatioCache.set(src, p);

  p.catch(() => {
    imageAspectRatioCache.delete(src);
  });
}

// Build the client
const baseUrl = "https://lemmy.world";
export const lemmy: LemmyHttp = new LemmyHttp(baseUrl);

export function getPostFromCache(
  cache: InfiniteData<GetPostsResponse, unknown> | undefined,
  postId: number | undefined,
) {
  if (!postId || !cache) {
    return undefined;
  }

  for (const page of cache.pages) {
    for (const view of page.posts) {
      if (view.post.id === postId) {
        return view;
      }
    }
  }

  return undefined;
}

export function usePost(form: GetPost) {
  const queryClient = useQueryClient();

  const postSort = useSorts((s) => s.postSort);

  const cachedPosts = queryClient.getQueryData<
    InfiniteData<GetPostsResponse, unknown>
  >([`getPosts--${postSort}`]);

  const cachedPosts2 = queryClient.getQueryData<
    InfiniteData<GetPostsResponse, unknown>
  >([`getPosts-${form.comment_id}-${postSort}`]);

  const queryKey = ["getPost", `getPost-${form.id}`];

  return useQuery<Partial<GetPostResponse>>({
    queryKey,
    queryFn: async () => {
      const res = await lemmy.getPost(form);
      if (res.post_view.post.thumbnail_url) {
        measureImage(res.post_view.post.thumbnail_url);
      }
      return res;
    },
    enabled: !!form.id,
    initialData: () => {
      const prev = queryClient.getQueryData<GetPostResponse>(queryKey);
      return (
        prev ?? {
          post_view:
            getPostFromCache(cachedPosts, form.id) ??
            getPostFromCache(cachedPosts2, form.id),
        }
      );
    },
  });
}

export function usePostComments(form: GetComments) {
  const queryClient = useQueryClient();

  const commentSort = useSorts((s) => s.commentSort);
  const sort = form.sort ?? commentSort;

  const queryKey = ["getComments", `getComments-${sort}-${form.post_id}`];

  return useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }) => {
      const limit = form.limit ?? 50;
      const { comments } = await lemmy.getComments({
        ...form,
        limit,
        page: pageParam,
        sort,
      });
      return {
        comments,
        nextPage: comments.length < limit ? null : pageParam + 1,
      };
    },
    enabled: !!form.post_id,
    getNextPageParam: (data) => data.nextPage,
    initialPageParam: 1,
    placeholderData: (prev) => {
      const firstComment = prev?.pages[0]?.comments?.[0];
      if (!firstComment || firstComment.post.id !== form.post_id) {
        return undefined;
      }
      return prev;
    },
    // initialData: () => queryClient.getQueryData<any>(queryKey),
  });
}

export function usePosts(form: GetPosts) {
  const queryClient = useQueryClient();

  const queryKey = [`getPosts-${form.community_id ?? ""}-${form.sort}`];

  return useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }) => {
      const res = await lemmy.getPosts({
        ...form,
        page_cursor: pageParam === "init" ? undefined : pageParam,
      });

      for (const { post } of res.posts) {
        if (post.thumbnail_url) {
          measureImage(post.thumbnail_url);
        }
      }

      return res;
    },
    getNextPageParam: (lastPage) => lastPage.next_page,
    initialPageParam: "init",
    // initialData: () => queryClient.getQueryData<any>(queryKey),
  });
}

export function useListCommunities(form: ListCommunities) {
  const queryClient = useQueryClient();

  const queryKey = ["listCommunities"];

  return useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }) => {
      const limit = form.limit ?? 50;
      const { communities } = await lemmy.listCommunities({
        ...form,
        page: pageParam,
      });
      return {
        communities,
        nextPage: communities.length < limit ? null : pageParam + 1,
      };
    },
    getNextPageParam: (data) => data.nextPage,
    initialPageParam: 1,
    // initialData: () => queryClient.getQueryData<any>(queryKey),
  });
}

export function useCommunity(form: { id?: string | number }) {
  const queryClient = useQueryClient();

  const queryKey = ["getCommunity", `getCommunity-${form.id}`];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const res = await lemmy.getCommunity({
        id: +form.id!,
      });
      return res;
    },
    enabled: !!form.id,
    // initialData: () => queryClient.getQueryData<GetCommunity>(queryKey),
  });
}
