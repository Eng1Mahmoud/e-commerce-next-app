"use client";
import { useEffect, useState } from "react";
import ProductCard from "../general/ProductCard";
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  countInStock: number;
  rating: number;
  numReviews: number;
  image: string;
  amount: number;
}
import ProductsSkeleton from "../general/skeletonLoading/ProductsSkeleton";
const AllProducts = ({ categorie }: { categorie: string }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [endProducts, setEndProducts] = useState<boolean>(false);

  // handle pagination
  const handlePagination = async () => {
    setPage((prev) => prev + 1);
    setLoadingMore(true);
    // fetch more products
   console.log(process.env.NEXT_PUBLIC_API_URL);
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${categorie}/${
        page + 1
      }/${limit}`
    )
      .then((res) => {
        if (res.status === 404) {
          setEndProducts(true);
          return;
        }
        res.json().then((data) => {
          setProducts((prev) => [...prev, ...data]);
        });
      })

      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoadingMore(false);
      });
  };

  // fetch inital products
  useEffect(() => {
    setLoading(true);
    const getProducts = async () => {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${categorie}/${1}/${limit}`,{
          headers: {
            'Content-Type': 'application/json',
             
        },
        method: 'GET',
      }
      )
        .then((res) => {
          if (res.status === 404) {
            setEndProducts(true);
            return;
          }
          else{
            return res.json().then((data) => {
              console.log(data);  
              setProducts(data);
            
            });
          }
         
        })

        .catch((err) => {
          console.error(err);
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
