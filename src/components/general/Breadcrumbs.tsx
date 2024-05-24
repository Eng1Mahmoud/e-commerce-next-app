"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

export const Breadcrumbs = () => {
  const { categorie, id, name } = useParams();
  const decodedCategorie = decodeURIComponent(`${categorie}`);
  const decodedName = decodeURIComponent(`${name}`);
  
 

  return (
    <div className="text-sm breadcrumbs my-6 ">
      <ul>
        <li>
          <Link href="/" className="text-[20px] ">
            الرئيسية
          </Link>
        </li>
        <li>
          <Link href={`/products/${decodedCategorie}`} className="text-[20px] font-bold">
            {decodedCategorie}
          </Link>
        </li>
         {/**if decodname undefined not render link it  */}
        {name && (
          <li>
            <Link href={`/products/${decodedCategorie}/${id}/${decodedName}`} className="text-[20px] font-bold">
              {decodedName}
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};
