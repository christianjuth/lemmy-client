import "./_layout.css";
import "./tamagui.css";

import { LoadProgressBar, Slot } from "one";
import { isWeb } from "tamagui";
import { MainAppTemplate } from "~/src/components/main-app-template";
import { Providers } from "~/src/components/providers";

export default function Layout() {
  return (
    <>
      {isWeb && (
        <>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=5"
          />
          <link rel="icon" href="/favicon.svg" />
        </>
      )}

      <LoadProgressBar />

      <Providers>
        <MainAppTemplate>
          <Slot />
        </MainAppTemplate>
      </Providers>
    </>
  );
}
