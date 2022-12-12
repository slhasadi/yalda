import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
const Meta = () => {
  const [fav, setFav] = useState("/images/meta/favicon-128.png")
  const [cookies]= useCookies(["data"]);
  useEffect(()=>{
    if (cookies.data?.ads_banner_type === "soroush_api") {
      setFav(cookies.data?.fav_icon)
    }
  },[cookies.data])
  return(
  <div>
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
        {/* <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/images/meta/apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/images/meta/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/images/meta/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/images/meta/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon-precomposed" sizes="60x60" href="/images/meta/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon-precomposed" sizes="120x120" href="/images/meta/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon-precomposed" sizes="76x76" href="/images/meta/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/images/meta/apple-touch-icon-152x152.png" />
        <link rel="icon" type="image/png" href="/images/meta/favicon-196x196.png" sizes="196x196" />
        <link rel="icon" type="image/png" href="/images/meta/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/png" href="/images/meta/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/images/meta/favicon-16x16.png" sizes="16x16" /> */}
        <link rel="icon" type="image/png" href={fav} sizes="128x128" />
        {/* <meta name="application-name" content="&nbsp;"/>
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-TileImage" content="/images/meta/mstile-144x144.png" />
        <meta name="msapplication-square70x70logo" content="/images/meta/mstile-70x70.png" />
        <meta name="msapplication-square150x150logo" content="/images/meta/mstile-150x150.png" />
        <meta name="msapplication-wide310x150logo" content="/images/meta/mstile-310x150.png" />
        <meta name="msapplication-square310x310logo" content="/images/meta/mstile-310x310.png" /> */}
    </Head>
  </div>
  )
}

export default Meta;