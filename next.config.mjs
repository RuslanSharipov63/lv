/** @type {import('next').NextConfig} */
const nextConfig = {
   
        images: {
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'tehnogaz63.ru',
              port: '',
              search: '',
            },
          ],
        },
      
};

export default nextConfig;

