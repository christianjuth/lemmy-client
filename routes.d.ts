import type { OneRouter } from 'one'

declare module 'one' {
  export namespace OneRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(home)` | `/(home)/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/(home)` | `/(tabs)/(home)/` | `/(tabs)/communities` | `/(tabs)/communities/` | `/(tabs)/create` | `/(tabs)/inbox` | `/(tabs)/inbox/` | `/(tabs)/settings` | `/_sitemap` | `/auth` | `/communities` | `/communities/` | `/create` | `/inbox` | `/inbox/` | `/md` | `/settings`
      DynamicRoutes: `/(home)/c/${OneRouter.SingleRoutePart<T>}` | `/(home)/c/${OneRouter.SingleRoutePart<T>}/posts/${OneRouter.SingleRoutePart<T>}` | `/(home)/c/${OneRouter.SingleRoutePart<T>}/posts/${OneRouter.SingleRoutePart<T>}/comments/${OneRouter.SingleRoutePart<T>}` | `/(tabs)/(home)/c/${OneRouter.SingleRoutePart<T>}` | `/(tabs)/(home)/c/${OneRouter.SingleRoutePart<T>}/posts/${OneRouter.SingleRoutePart<T>}` | `/(tabs)/(home)/c/${OneRouter.SingleRoutePart<T>}/posts/${OneRouter.SingleRoutePart<T>}/comments/${OneRouter.SingleRoutePart<T>}` | `/(tabs)/c/${OneRouter.SingleRoutePart<T>}` | `/(tabs)/c/${OneRouter.SingleRoutePart<T>}/posts/${OneRouter.SingleRoutePart<T>}` | `/(tabs)/c/${OneRouter.SingleRoutePart<T>}/posts/${OneRouter.SingleRoutePart<T>}/comments/${OneRouter.SingleRoutePart<T>}` | `/(tabs)/communities/c/${OneRouter.SingleRoutePart<T>}` | `/(tabs)/communities/c/${OneRouter.SingleRoutePart<T>}/posts/${OneRouter.SingleRoutePart<T>}` | `/(tabs)/inbox/c/${OneRouter.SingleRoutePart<T>}` | `/(tabs)/inbox/c/${OneRouter.SingleRoutePart<T>}/posts/${OneRouter.SingleRoutePart<T>}` | `/(tabs)/inbox/c/${OneRouter.SingleRoutePart<T>}/posts/${OneRouter.SingleRoutePart<T>}/comments/${OneRouter.SingleRoutePart<T>}` | `/c/${OneRouter.SingleRoutePart<T>}` | `/c/${OneRouter.SingleRoutePart<T>}/posts/${OneRouter.SingleRoutePart<T>}` | `/c/${OneRouter.SingleRoutePart<T>}/posts/${OneRouter.SingleRoutePart<T>}/comments/${OneRouter.SingleRoutePart<T>}` | `/communities/c/${OneRouter.SingleRoutePart<T>}` | `/communities/c/${OneRouter.SingleRoutePart<T>}/posts/${OneRouter.SingleRoutePart<T>}` | `/inbox/c/${OneRouter.SingleRoutePart<T>}` | `/inbox/c/${OneRouter.SingleRoutePart<T>}/posts/${OneRouter.SingleRoutePart<T>}` | `/inbox/c/${OneRouter.SingleRoutePart<T>}/posts/${OneRouter.SingleRoutePart<T>}/comments/${OneRouter.SingleRoutePart<T>}`
      DynamicRouteTemplate: `/(home)/c/[communityName]` | `/(home)/c/[communityName]/posts/[postId]` | `/(home)/c/[communityName]/posts/[postId]/comments/[commentPath]` | `/(tabs)/(home)/c/[communityName]` | `/(tabs)/(home)/c/[communityName]/posts/[postId]` | `/(tabs)/(home)/c/[communityName]/posts/[postId]/comments/[commentPath]` | `/(tabs)/c/[communityName]` | `/(tabs)/c/[communityName]/posts/[postId]` | `/(tabs)/c/[communityName]/posts/[postId]/comments/[commentPath]` | `/(tabs)/communities/c/[communityName]` | `/(tabs)/communities/c/[communityName]/posts/[postId]` | `/(tabs)/inbox/c/[communityName]` | `/(tabs)/inbox/c/[communityName]/posts/[postId]` | `/(tabs)/inbox/c/[communityName]/posts/[postId]/comments/[commentPath]` | `/c/[communityName]` | `/c/[communityName]/posts/[postId]` | `/c/[communityName]/posts/[postId]/comments/[commentPath]` | `/communities/c/[communityName]` | `/communities/c/[communityName]/posts/[postId]` | `/inbox/c/[communityName]` | `/inbox/c/[communityName]/posts/[postId]` | `/inbox/c/[communityName]/posts/[postId]/comments/[commentPath]`
      IsTyped: true
    }
  }
}