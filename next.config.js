/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    SERVER_URL: process.env.SERVER_URL,
    R_SERVER_URL: process.env.R_SERVER_URL,
  },
};

module.exports = nextConfig;
