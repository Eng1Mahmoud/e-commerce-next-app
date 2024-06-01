"use client";
import axiosInstance from '@/lib/axiosInstance';
import React, { useEffect, useState } from 'react'
const OrderDetails = ({params}:{
  params:{
    id: string
  
  }
}) => {
  const [order, setOrder] = useState<any>(null);
  // get order details by id
  useEffect(() => {
    axiosInstance.post("/admin/get-order-details", { id: params.id }).then((res) => {
      setOrder(res.data.order);

    });
  }, [params.id]);
  return (
    <div className='container'>
      <h1 className='font-bold font-main text-[30px] text-primary my-8'>تفاصيل الطلب </h1>

    </div>
  )
}

export default OrderDetails