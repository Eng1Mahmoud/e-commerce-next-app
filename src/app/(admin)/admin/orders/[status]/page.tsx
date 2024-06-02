"use client";
import axiosInstance from "@/lib/axiosInstance";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const Orders = ({
  params,
}: {
  params: {
    status: string;
  };
}) => {
  const decodedStatus = decodeURIComponent(`${params.status}`);
  const [orders, setOrders] = useState<any>([]);
  const router = useRouter();
  // fetch orders by status
  useEffect(() => {
    axiosInstance
      .post("/admin/get-orders", { status: decodedStatus })
      .then((res) => {
        setOrders(res.data.orders);
      });
  }, [decodedStatus]);
  // show order details page
  const handleShowDetails = (id: string) => {
    router.push(`/admin/show-order/${id}`);
  };
  return (
    <div className="container">
      <h1 className="my-8 font-main font-bold text-primary text-[35px]">
        {decodedStatus}
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className="text-center">اسم المستخدم</th>
              <th className="text-center">رقم الهاتف</th>
              <th className="text-center">العنوان</th>
              <th className="text-center"> حالة الطلب</th>
              <th className="text-center">التفاصيل</th>
              <th className="text-center">الرقم</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any, index: number) => {
              return (
                <tr key={order?._id}>
                  <td className="text-center">{order?.userId?.username}</td>
                  <td className="text-center">{order?.userId?.phone}</td>
                  <td className="text-center">{order?.userId?.address}</td>

                  <td className="text-center">{order?.status}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleShowDetails(order?._id)}
                    >
                      تفاصيل
                    </button>
                  </td>
                  <td className="text-center">{index}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
