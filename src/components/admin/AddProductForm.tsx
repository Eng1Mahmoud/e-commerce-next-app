"use client";
import { uploadImages } from "@/actions/uploadImages";
import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";

const AddProductForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  } as {
    name: string;
    description: string;
    price: string;
    category: string;
    image: string;
  });
  // button status

  const SummitButton = () => {
    const { pending } = useFormStatus();
    return (
      <button
        type="submit"
        className="btn  w-[200px] h-[50px] mt-[20px]"
        onClick={(e) => handleSubmit(e)}
        disabled={pending}
      >
        {pending ? "Waiting.... " : "Add Product"}
      </button>
    );
  };

  // handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    const file = e.target.files?.[0] as File;
    const formData = new FormData();
    formData.append("file", file);
    const { imageUrl } = await uploadImages({}, formData);
    setFormState({ ...formState, image: imageUrl });
  };
  // handle change state
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  // handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const response = await fetch(
      "http://localhost:3000/api/admin/add-product",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      }
    );
    const data = await response.json();
    if (response.ok) {
      alert(data.message);
    } else {
      alert(data.message);
    }
  };
  return (
    <div className="py-11">
      <h2 className="text-center text-[35px] font-bold  text-teal-500">
        Upload New Product
      </h2>
      <div className="container mx-auto my-[100px] max-w-screen-lg">
        <form className="w-full" >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="grid grid-cols-1 gap-5">
              <input
                type="text"
                placeholder="Enter Product Name"
                className="input input-bordered w-full "
                name="name"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="text"
                placeholder="Enter Product Description"
                className="input input-bordered w-full "
                name="description"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="number"
                placeholder="Enter Product Price"
                className="input input-bordered w-full "
                name="price"
                onChange={(e) => handleChange(e)}
              />

              <label className="form-control w-full ">
                <select
                  className="select select-bordered"
                  name="category"
                  defaultValue={"Star Wars"}
                  onChange={(e) => handleChange(e)}
                >
                  <option disabled selected>
                    categorys
                  </option>
                  <option>Star Wars</option>
                  <option>Harry Potter</option>
                  <option>Lord of the Rings</option>
                  <option>Planet of the Apes</option>
                  <option>Star Trek</option>
                </select>
              </label>
            </div>
            <div className="w-full h-[250px]  bg-slate-400 flex justify-center">
              {formState.image ? (
                <Image
                  src={formState.image}
                  alt="product image"
                  width={200}
                  height={200}
                />
              ) : (
                <label
                  className="h-full w-full flex flex-col items-center justify-center space-y-5 cursor-pointer border-2 border-dashed border-gray-400 bg-white p-6 rounded-lg shadow-md"
                  htmlFor="file"
                >
                  <div className="flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-20 text-gray-500"
                      fill=""
                      viewBox="0 0 24 24"
                    >
                      <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                      <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        id="SVGRepo_tracerCarrier"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          fill=""
                          d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        ></path>{" "}
                      </g>
                    </svg>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="font-normal text-gray-500">
                      Click to upload image
                    </span>
                  </div>
                  <input
                    type="file"
                    id="file"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e)}
                  />
                </label>
              )}
            </div>
            <div className="flex ">
              <SummitButton />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddProductForm;
