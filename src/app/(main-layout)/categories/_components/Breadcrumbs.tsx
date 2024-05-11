"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

export const Breadcrumbs = () => {
  const { categorie } = useParams();
  const decodedCategorie = decodeURIComponent(`${categorie}`);

  return (
    <div className="text-sm breadcrumbs my-6 ">
      <ul>
        <li>
          <Link href="/" className="text-[20px] ">
            الرئيسية
          </Link>
        </li>
        <li>
          <Link href="/products" className="text-[20px] font-bold">
            {decodedCategorie}
          </Link>
        </li>
      </ul>
    </div>
  );
};
