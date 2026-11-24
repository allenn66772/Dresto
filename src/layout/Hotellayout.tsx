
import Header from '../hotelcomponents/Header'
import Footer from '../hotelcomponents/Footer'
import type { ReactNode } from 'react'

function Hotellayout({ children }: { children: ReactNode }) {
  return (
    <>
    <div className='flex min-h-screen flex-col'>
        <Header/>
         <main className='flex-1'>{children}</main>
        <Footer/>

    </div>
    </>
  )
}

export default Hotellayout