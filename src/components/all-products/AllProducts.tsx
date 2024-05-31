"use client";
import { useEffect, useState } from "react";
import ProductCard from "../general/ProductCard";

import ProductsSkeleton from "../general/skeletonLoading/ProductsSkeleton";
import { IProduct } from "@/types/product";
import axiosInstance from "@/lib/axiosInstance";
const AllProducts = ({ categorie }: { categorie: string }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [endProducts, setEndProducts] = useState<boolean>(false);

  // handle pagination
  const handlePagination = async () => {
    setPage((prev) => prev + 1);
    setLoadingMore(true);
    // fetch more products
    axiosInstance
      .get(`/products/${categorie}/${page}/${limit}`)
      .then((res) => {
        if (res.data.products.length === 0) {
          setEndProducts(true);
          return;
        }
        setProducts((prev) => [...prev, ...res.data.products]);
      })
      .finally(() => {
        setLoadingMore(false);
      });
  };

  // fetch inital products
  useEffect(() => {
    setLoading(true);
    const getProducts = async () => {
      axiosInstance
        .get(`/products/${categorie}/${1}/${limit}`)
        .then((res) => {
          if (res.data.products.length === 0) {
            setEndProducts(true);
            return;
          }
          setProducts(res.data.products);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    if (!endProducts) {
      getProducts();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container my-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {loading
          ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <ProductsSkeleton key={n} />
            )) // skeleton loading
          : products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>
      {!endProducts ? (
        <div className="flex justify-center mt-4">
          <button
            onClick={handlePagination}
            className={`bg-[#ffad33] text-white px-10 py-5 my-5 rounded-lg `}
            disabled={endProducts}
          >
            {loadingMore ? "جاري التحميل..." : "المزيد من المنتجات"}
          </button>
        </div>
      ) : (
        <div className="flex justify-center mt-4">
          <p className="text-lg text-red-500">لا يوجد المزيد من المنتجات</p>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
