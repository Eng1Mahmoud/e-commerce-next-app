import { CartContainer } from "@/components/cart/CartContainer";
import Link from "next/link";
import React from "react";

const page = async () => {
return (
    <div className="container">
        <div className="text-sm breadcrumbs my-6">
            <ul>
                <li>
                    <Link href="/" className="text-[20px] no-underline hover:text-primary">
                        الرئيسية
                    </Link>
                </li>
                <li>سلة التسوق</li>
            </ul>
        </div>
        <CartContainer />
    </div>
);
};

export default page;
