import AllProducts from '@/components/all-products/AllProducts';
import React from 'react'

const page = ({params}:{params:{categorie:string}}) => {
    const decodedCategorie = decodeURIComponent(params.categorie);
  return (
    <div>
      <AllProducts categorie={decodedCategorie} />
    </div>
  )
}

export default page