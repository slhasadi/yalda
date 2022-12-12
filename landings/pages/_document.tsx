import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="fa" dir="rtl">
      <Head>
        <link
          rel="stylesheet"
          href="https://plus.sabavision.com/dox/dox.min.css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
