const nextConfig = {
  images: {
    domains: [
      "source.unsplash.com",
      "d3ugyf2ht6aenh.cloudfront.net",
      "api.custer.com.ar",
    ],
  },
  i18n: {
    locales: ["es"],
    defaultLocale: "es",
  },
  env: {
    URL_SERVER: process.env.NEXTAUTH_URL,
  },
};

module.exports = nextConfig;
