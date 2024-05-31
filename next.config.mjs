/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
   
       remotePatterns: [{
          protocol: 'https',
          hostname: 'res.cloudinary.com',
   
       },
      {
         protocol:"https",
         hostname:"img.daisyui.com"
      },
      {
          protocol:"https",
          hostname:"images.unsplash.com"
        },
        {
         protocol:"https",
         hostname:"image%20width={200}%20height={200}.daisyui.com"
        }
       
    
    ],
    },
  

};
export default nextConfig;
