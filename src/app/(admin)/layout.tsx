import Header from '@/components/admin/Header'
import React from 'react'
import ".././globals.css";
import { Alert } from '@/components/general/Alert';
const layout = ({children}:{
    children: React.ReactNode
}) => {
  return (
    <html lang="en">
    
      <body  >
         <Alert/>
         <Header/>
        {children}
        </body>
    </html>
  )
}

export default layout