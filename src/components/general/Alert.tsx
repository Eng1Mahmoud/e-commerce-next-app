"use client";
import { alertStore } from "@/store/alert";
import React, { useEffect } from "react";

export const Alert = () => {
  const { alert,setAlert } = alertStore();
  useEffect(() => {
    if (alert.message) {
      setTimeout(() => {
        setAlert({ message: "", type: "" });
      }, 4000);
    }
  }, [alert, setAlert]);
  return (
    alert.message && (
      <div className="fixed  top-0 right-0 p-2 m-5 text-white rounded-lg">
        <div role="alert" className={`alert alert-${alert.type}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-white">{alert.message}</span>
        </div>
      </div>
    )
  );
};