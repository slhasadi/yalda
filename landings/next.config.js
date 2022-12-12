// const withPlugins = require("next-compose-plugins");
// const optimizedImages = require("next-optimized-images");

/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const nextConfig = {
  i18n,
  reactStrictMode: false,
  images: {
    domains: [
      "api.sports.vidaneh.com",
      "api.landings.q00p.ir",
      "api.baazigooshi.com",
      "api.baazigooshi.q00p.ir",
      "api.prediction.tika-team.ir",
      "localhost",
    ],
    disableStaticImages: true,
    minimumCacheTTL: 3600,
  },
  output: {
    hashFunction: "sha256",
  },
  basePath: "",
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/prediction",
  //       permanent: false,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
