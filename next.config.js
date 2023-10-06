/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/datasets",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
