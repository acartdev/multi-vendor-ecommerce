import Link from 'next/link'
import React from 'react'

export default function EmptyCart() {
  return (
    <div className='flex items-center justify-center h-96'>
        <p className='py-2 mb-6 font-bold text-2xl'>Your Cart is empty <Link href="/" className=' text-orange-500 '> Start Shopping</Link></p>
    </div>
  )
}
