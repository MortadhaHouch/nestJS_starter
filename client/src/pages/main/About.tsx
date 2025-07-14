import { Spotlight } from '@/components/main/Spotlight'
import Team from '@/components/main/Team'
import React from 'react'

export default function About() {
  return (
    <main className='flex flex-col justify-center items-center w-screen min-h-screen'>
      <Spotlight/>
      <Team/>
    </main>
  )
}
