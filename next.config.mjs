/** @type {import('next').NextConfig} */
const nextConfig = {
   
        images: {
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'ruslansharipov.site',
              port: '',
              search: '',
            },
          ],
        },
      
};

export default nextConfig;

