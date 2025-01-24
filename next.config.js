/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: process.env.NODE_ENV === "production",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};
