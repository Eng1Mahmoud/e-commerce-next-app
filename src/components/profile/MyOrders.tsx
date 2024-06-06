import React from "react";
import { formatDate } from "@/lib/ConvertDateFormating";
import Link from "next/link";

const statusColor = (status: string) => {
  switch (status) {
    case "جديده":
      return "text-blue-500";
    case "تحت التجهيز":
      return "text-yellow-500";
    case "جاري التوصيل":
      return "text-orange-500";
    case "مكتمله":
      return "text-green-500";
    case "ملغيه":
      return "text-red-500";
    default:
      return "";
  }
};

const MyOrders = ({ orders, loading }: { orders: any; loading: boolean }) => {
  return (
    <div>
      <h1 className="pb-10 text-primary font-bold font-main text-[30px]">
        طلباتي
      </h1>
      <div className="overflow-x-auto">
        {loading && (
          <div className="flex flex-col gap-5">
            {[1, 2, 3, 4, 5].map((item) => {
              return <div className="skeleton h-8 w-full" key={item}></div>;
            })}
          </div>
        )}
        {!loading && orders.length === 0 && (
          <div className="text-center text-error font-bold font-main text-[20px]">
            لا يوجد طلبات
          </div>
        )}
        {!loading && orders.length > 0 && (
          <table className="table mb-8">
            <thead>
              <tr>
                <th className="text-center">حالة الطلب </th>
                <th className="text-center">حالة الدفع </th>
                <th className="text-center font-bold"> السعر الكلي</th>
                <th className="text-center font-bold"> تفاصيل الطلب</th>
                <th className="text-center"> تاريخ الطلب</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) => (
                <tr key={order?._id}>
                  <td className={`text-center ${statusColor(order?.status)}`}>
                    {order?.status}
                  </td>
                  <td className="text-center">{order?.paymentStatus}</td>
                  <td className="text-center">{order?.total}</td>
                  <td className="text-center">
                    <Link
                      href={`/profile/all-orders/${order?._id}`}
                      className="btn"
                    >
                      تفاصيل
                    </Link>
                  </td>
                  <td className="text-center">
                    {formatDate(order?.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
