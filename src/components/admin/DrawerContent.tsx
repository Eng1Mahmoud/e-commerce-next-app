import Link from "next/link";
export const DrawerContent = () => {
  return (
    <ul className="menu bg-base-200  max-w-[300px] w-full h-[110vh]  ">
      <h1 className="font-bold font-main text-center text-[25px] my-5">
        لوحة التحكم
      </h1>
      <li>
        <Link href={"/admin"}>المستخدمين</Link>
      </li>
      <li>
        <details open>
          <summary>المنتجات</summary>
          <ul>
            <li>
              <Link href={"/admin"}>الخضروات</Link>
            </li>
            <li>
              <Link href={"/admin"}>الفواكه</Link>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <Link href={"/admin"}>الفئات</Link>
      </li>
      <li>
        <Link href={"admin/add-product"}>
          اضافة منتج
        </Link>
      </li>
    </ul>
  );
};
