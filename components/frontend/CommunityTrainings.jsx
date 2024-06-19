import React from 'react'
import TrainingCarousel from './TrainingCarousel'
import Link from 'next/link'
import { getData } from '@/lib/getData'

export default async function CommunityTrainings() {
  const trainings = await getData("trainings")
  return (
    <div
      className=" p-4 bg-white border border-gray-300 rounded-lg
    dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
    >
        <div
          className=" py-2 px-6 mb-6 dark:bg-gray-800
        font-semibold border-b border-gray-300 dark:border-slate-700
        flex justify-between items-center"
        >
          <h2>Community</h2>
          <Link href="#" className="btn text-slate-50">
          See All
          </Link>
        </div>
          <TrainingCarousel trainings={trainings}/>
    </div>
  )
}
