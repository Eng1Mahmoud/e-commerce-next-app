import Link from "next/link";
export const DrawerContent = () => {
  return (
    <ul className="menu bg-base-200  max-w-[300px] w-full overflow-auto h-screen">
      <h1 className="font-bold font-main text-center text-[25px] my-5">
        لوحة التحكم
      </h1>
      <li className="mt-2">
        <Link href={"/"}>الرجوع الي الموقع</Link>
      </li>
      <li className="mt-2">
        <Link href={"/admin"}>المستخدمين</Link>
      </li>
      <li className="mt-2">
        <details open>
          <summary>المنتجات</summary>
          <ul>
            <li className="mt-2">
              <Link href={"/admin/products/خضروات"}>خضروات</Link>
            </li>
            <li className="mt-2">
              <Link href={"/admin/products/فواكه"}>فواكه</Link>
            </li>
            <li className="mt-2">
              <Link href={"/admin/products/تمور"}>تمور</Link>
            </li>
          </ul>
        </details>
      </li>
      <li className="mt-2">
        <details open>
          <summary>الطلبات</summary>
          <ul>
            <li className="mt-2">
              <Link href={"/admin/orders/جديده"}>الطلبات الجديدة</Link>
            </li>
            <li className="mt-2">
              <Link href={"/admin/orders/تحت التجهيز"}>تحت التجهيز</Link>
            </li>
            <li className="mt-2">
              <Link href={"/admin/orders/مكتمله"}>مكتمله</Link>
            </li>
            <li className="mt-2">
              <Link href={"/admin/orders/جاري التوصيل"}>جاري التوصيل</Link>
            </li>
            <li className="mt-2">
              <Link href={"/admin/orders/ملغيه"}>ملغيه</Link>
            </li>
          </ul>
        </details>
      </li>

      <li className="mt-2">
        <details open>
          <summary>الفئات</summary>
          <ul>
            <li className="mt-2">
              <Link href={"/admin/add-categories"}> اضافة فئة جديده</Link>
            </li>
            <li className="mt-2">
              <Link href={"/admin/categories"}>عرض الفئات</Link>
            </li>
          </ul>
        </details>
      </li>
      <li className="mt-2">
        <Link href={"/admin/add-product"}>
          اضافة منتج
        </Link>
      </li>
    </ul>
  );
};
