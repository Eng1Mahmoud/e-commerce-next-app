"use client";
import React from 'react'
import { ProductSlider } from './ProductSlider'
import ProductDetails from './ProductDetails';

const ProductById = ({product}:{product:any}) => {

    console.log("product",product)
  return (
    <section>
        <div className="container">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
               <ProductSlider images={product.product?.images} />
            </div>
            <div>
                 <ProductDetails product={product.product} />
                </div>
            </div>
          
        </div>

    </section>
  )
}

export default ProductById