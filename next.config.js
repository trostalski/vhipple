/** @type {import('next').NextConfig} */
const nextConfig = {
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
