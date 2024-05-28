"use server"
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
   });

export const uploadImages = async (state:any, data:FormData) => {
    // Get the file from the form data
   const file = data.get('file') as File;
   const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const results:any = await new Promise ((resolve, reject) => {
            cloudinary.uploader.upload_stream({tags: ['e-commerce'],folder:"e-commerce" }, function (error, result){
                if ( error ) {
                    reject(error);
                    return;
                }
                resolve(result);
             
            }).end(buffer);
        })

    return {imageUrl: results.secure_url, };

  }
