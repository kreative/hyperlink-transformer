/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: 'https://kreativehyperlink.com',
        permanent: true,
      },
    ];
  }
};

module.exports = nextConfig;
