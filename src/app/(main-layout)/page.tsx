"use client";
import { Categories } from "@/components/Home/categories/Categories";
import { Slider } from "@/components/Home/slider/Slider";
import { CategoriesSection } from "@/components/Home/categories-section/CategoriesSection";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
export default function Home() {
  const [categories, setCategories] = useState([]);
  // get categories from the server
  useEffect(() => {
    axiosInstance.get("/admin/get-categorise").then((res) => {
      setCategories(res.data.categorises);
    });
  }, []);
  return (
    <div>
      <Slider />
      <Categories />
      {categories.map((categorie:any) => (
        <CategoriesSection key={categorie?._id} categorie={categorie?.name} />
      ))}
      
    </div>
  );
}
