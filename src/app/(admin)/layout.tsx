import Header from '@/components/admin/Header'
import React from 'react'
import ".././globals.css";
const layout = ({children}:{
    children: React.ReactNode
}) => {
  return (
    <html lang="en">
    
      <body  >
         <Header/>
        {children}
        </body>
    </html>
  )
}

export default layout