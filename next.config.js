/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects(){
    return [
      {
        source: '/',
        destination: '/listing',
        permanent: true

      }
    ]
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
