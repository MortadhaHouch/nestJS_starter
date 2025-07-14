import BentoGrid from '@/components/main/BentoGrid'
import Testimonials from '@/components/main/Feedbacks'
import { HeroParallax } from '@/components/main/HeroParallax'
import Sparkles from '@/components/main/Sparkles'
import { TypewriterEffectSmooth } from '@/components/main/TypewriterEffectSmooth'

export default function Home() {
  return (
    <main className='flex overflow-x-hidden flex-col justify-center items-center w-full min-h-screen'>
      <section className='flex justify-center items-center w-full max-w-7xl min-h-screen'>
        <HeroParallax/>
      </section>
      <section className='flex justify-center items-center w-full max-w-7xl min-h-screen'>
        <BentoGrid/>
      </section>
      <section className='flex justify-center items-center w-full max-w-7xl min-h-screen'>
        <Testimonials/>
      </section>
      <section className='flex justify-center items-center w-full max-w-7xl min-h-screen'>
        <Sparkles/>
      </section>
      <section className='flex justify-center items-center w-full max-w-7xl min-h-screen'>
        <TypewriterEffectSmooth/>
      </section>
    </main>
  )
}
