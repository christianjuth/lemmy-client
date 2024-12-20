import type { OneRouter } from 'one'

declare module 'one' {
  export namespace OneRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(home)` | `/(home)/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/(home)` | `/(tabs)/(home)/` | `/(tabs)/chat` | `/(tabs)/communities` | `/(tabs)/communities/` | `/(tabs)/create` | `/(tabs)/settings` | `/_sitemap` | `/auth` | `/chat` | `/communities` | `/communities/` | `/create` | `/md` | `/settings`
      DynamicRoutes: `/(home)/c/${OneRouter.SingleRoutePart<T>}` | `/(home)/c/${OneRouter.SingleRoutePart<T>}/posts/${OneRouter.SingleRoutePart<T>}` | `/(tabs)/(home)/c/${OneRouter.SingleRoutePart<T>}` | `/(tabs)/(home)/c/${OneRouter.SingleRoutePart<T>}/posts/${OneRouter.SingleRoutePart<T>}` | `/(tabs)/c/${OneRouter.SingleRoutePart<T>}` | `/(tabs)/c/${OneRouter.SingleRoutePart<T>}/posts/${OneRouter.SingleRoutePart<T>}` | `/(tabs)/communities/c/${OneRouter.SingleRoutePart<T>}` | `/(tabs)/communities/c/${OneRouter.SingleRoutePart<T>}/posts/${OneRouter.SingleRoutePart<T>}` | `/c/${OneRouter.SingleRoutePart<T>}` | `/c/${OneRouter.SingleRoutePart<T>}/posts/${OneRouter.SingleRoutePart<T>}` | `/communities/c/${OneRouter.SingleRoutePart<T>}` | `/communities/c/${OneRouter.SingleRoutePart<T>}/posts/${OneRouter.SingleRoutePart<T>}`
      DynamicRouteTemplate: `/(home)/c/[communityName]` | `/(home)/c/[communityName]/posts/[postId]` | `/(tabs)/(home)/c/[communityName]` | `/(tabs)/(home)/c/[communityName]/posts/[postId]` | `/(tabs)/c/[communityName]` | `/(tabs)/c/[communityName]/posts/[postId]` | `/(tabs)/communities/c/[communityName]` | `/(tabs)/communities/c/[communityName]/posts/[postId]` | `/c/[communityName]` | `/c/[communityName]/posts/[postId]` | `/communities/c/[communityName]` | `/communities/c/[communityName]/posts/[postId]`
      IsTyped: true
    }
  }
}