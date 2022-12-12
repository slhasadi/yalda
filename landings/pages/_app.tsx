/* eslint-disable react-hooks/exhaustive-deps */
import { AppProps } from "next/app";
import ReactGA from "react-ga";
import { appWithTranslation } from "next-i18next";
import { Provider } from "react-redux";
import Layout from "../components/layout/Layout";
import { store } from "../store";
import "../styles/globals.scss";
import "swiper/css";
import "../styles/globals.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { CookiesProvider } from "react-cookie";
import { ParallaxProvider } from "react-scroll-parallax";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();

  useEffect(() => {
    ReactGA.pageview(router.asPath);
  }, [router.asPath]);

  return (
    <>
      <CookiesProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Layout>
              <ParallaxProvider>
                <Component {...pageProps} />
              </ParallaxProvider>
            </Layout>
          </QueryClientProvider>
        </Provider>
      </CookiesProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
