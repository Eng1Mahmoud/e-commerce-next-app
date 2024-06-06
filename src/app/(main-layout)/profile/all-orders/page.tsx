"use client";
import MyOrders from "@/components/profile/MyOrders";
import axiosInstance from "@/lib/axiosInstance";
import React, { useEffect, useState } from "react";
const CurrentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  // get orders for user
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/order/get-orders-user")
      .then((res) => {
        setOrders(res.data.orders);
        console.log(res.data.orders);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <MyOrders orders={orders} loading={loading} />
    </div>
  );
};

export default CurrentOrders;
