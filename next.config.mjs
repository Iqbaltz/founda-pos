/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_APPLICATION_NAME:"Pursida POS App",
        // NEXT_PUBLIC_BASE_URL:"http://45.13.132.76/api",
        NEXT_PUBLIC_BASE_URL:"http://127.0.0.1:8000/api",
        NEXTAUTH_SECRET: 'mQ46qpFwfE1BHuqMC+qlm19qBAD9fVPgh28werwe3ASFlAfnKjM=',
    }
};

export default nextConfig;
