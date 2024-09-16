"use client";
import axiosInstance from "@/lib/axiosInstance";
import { alertStore } from "@/store/alert";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function VerifyEmailContent() {
  const [success, setSuccess] = useState("");
  const { setAlert } = alertStore();
  let router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      axiosInstance
        .post("/auth/verify-email", { token })
        .then((res) => {
          setSuccess("verifyed");
          setAlert({ message: res.data.message, type: "success" });
          router.push("/login");
        })
        .catch((error) => {
          setSuccess("failed");
          setAlert({ message: error.response.data.message, type: "error" });
        });
    }
  }, [router, setAlert, token]);

  return (
    <div>
      {success === "failed" && (
        <button
          className="btn btn-primary mt-2"
          onClick={() => router.push("/register")}
        >
          انشاء حساب
        </button>
      )}
    </div>
  );
}

export default function VerifyEmail() {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <Suspense fallback={<p>Loading...</p>}>
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}
