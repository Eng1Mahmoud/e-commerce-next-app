import React, { useState } from "react";
import Image from "next/image";
import { uploadImages } from "@/actions/uploadImages";

interface FormState {
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  amount: number;
  unit: string;
}
const UploadImages = ({
  formState,
  setFormState,
}: {
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
}) => {
  const [loading, setLoading] = useState<boolean[]>([false]);
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setLoading((prevLoading) => {
      const newLoading = [...prevLoading];
      newLoading[index] = true;
      return newLoading;
    });

    const file = e.target.files?.[0] as File;
    const formData = new FormData();
    formData.append("file", file);
    const { imageUrl } = await uploadImages({}, formData);
    const newImages = [...formState.images];
    newImages[index] = imageUrl;
    setFormState({ ...formState, images: newImages });

    setLoading((prevLoading) => {
      const newLoading = [...prevLoading];
      newLoading[index] = false;
      return newLoading;
    });
  };

  // add image upload box
  const addImageUploadBox = () => {
    setFormState({ ...formState, images: [...formState.images, ""] });
    setLoading((prevLoading) => [...prevLoading, false]);
  };

  // handle delete image
  const deleteImage = (index: number) => {
    const newImages = [...formState.images];
    newImages.splice(index, 1);
    setFormState({ ...formState, images: newImages });
  };
  return (
    <>
      <div className="flex flex-wrap w-full">
        {formState.images.map((image, index) => (
          <div key={index} className="w-full md:w-1/2 p-2">
            {loading[index] ? (
              <div className="flex items-center h-[150px] pointer border-2 border-dashed border-gray-400 justify-center bg-white">
                <span className="font-normal text-gray-500">جاري التحميل</span>
              </div>
            ) : image ? (
              <div className="w-full h-[150px] relative z-50 pointer border-2 border-dashed border-gray-400">
                <Image
                  src={image}
                  width={200}
                  height={200}
                  alt="product"
                  className="w-full h-full object-cover"
                />
                <button
                  className="absolute top-0 right-0 btn  h-[50px] z-50"
                  onClick={() => deleteImage(index)}
                >
                  حذف الصورة
                </button>
              </div>
            ) : (
              <label
                className=" w-full h-[150px] flex flex-col items-center justify-center space-y-5 cursor-pointer border-2 border-dashed border-gray-400 bg-white p-6 rounded-lg shadow-md"
                htmlFor={`file-${index}`}
              >
                <div className="flex items-center justify-center ">
                  <span className="font-normal text-gray-500">
                    اضغط للتحميل
                  </span>
                </div>
                <input
                  type="file"
                  id={`file-${index}`}
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, index)}
                />
              </label>
            )}
          </div>
        ))}

        <div className=" w-full md:w-1/2 p-2 ">
          <div
            className="h-[150px] flex items-center justify-center border-2 border-dashed border-blue-600 cursor-pointer"
            onClick={addImageUploadBox}
          >
            <span className="font-normal text-gray-500"> اضافة المزيد</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadImages;
