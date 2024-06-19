import React from 'react'
import MarketCarousel from './MarketCarousel'
import { getData } from '@/lib/getData'

export default async function MarketList() {
  const markets = await getData("markets")
  return (
    <div className=' text-white py-16'>
        <div className="p-4   bg-white dark:bg-gray-600 border border-gray-300 dark:border-slate-700 rounded-md  ">
        <h2 className='pb-4 text-center text-3xl text-slate-900 dark:text-slate-50'>Shop By Market</h2>
        <MarketCarousel markets={markets}/>
        </div>
    </div>  
  )
}
