'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const avatars = [
  {
    id: 'ai-agent',
    label: 'AI Agent',
    icon: 'https://ext.same-assets.com/3529801980/1182156735.svg',
    message: 'Needs a nudge',
    bgColor: 'bg-purple-400'
  },
  {
    id: 'family',
    label: 'Family',
    image: 'https://www.zabit.com/_next/image?url=%2Fbusiness-images%2Ff1.png&w=256&q=75',
    message: 'Sent a reminder',
    bgColor: 'bg-blue-500'
  },
  {
    id: 'practitioner',
    label: 'Practitioner',
    image: 'https://ext.same-assets.com/3529801980/2499113889.png',
    message: 'Checked in with patient',
    bgColor: 'bg-green-300'
  }
]

const radius = 200
const avatarAngles = [30, 150, 270]

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % avatars.length)
    }, 3000) // pauses for 3 seconds on each avatar

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-gray-200 h-[600px] flex items-center justify-between overflow-hidden rounded-[2rem] px-12">
      <div className="max-w-2xl p-5">
        <h1 className="text-5xl lg:text-6xl font-bold text-zabit-dark leading-tight mb-6">
          Make behavior change a{' '}
          <span className="text-zabit-primary">team sport</span>.
        </h1>
        <p className="text-xl text-gray-700 leading-relaxed mb-12">
          Averti's platform brings together individuals, AI agents, staff and family to achieve{' '}
          <span className="font-semibold border-b-2 border-zabit-primary">enduring lifestyle changes</span>{' '}
          and{' '}
          <span className="font-semibold border-b-2 border-zabit-primary">care plan adherence</span>.
        </p>
      </div>

      <div className="relative w-[400px] h-[400px]">
        <div className="absolute inset-0 border-2 border-dashed border-gray-300 rounded-full" />

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Image
            src="https://ext.same-assets.com/3529801980/1248168638.png"
            alt="Center Icon"
            width={120}
            height={140}
            className="rounded-full border-4 shadow-lg bg-pink-500"
          />
          <p className="mt-2 text-sm font-medium text-zabit-dark text-center">Patient</p>
        </div>

        {avatars.map((avatar, index) => {
          const angle = avatarAngles[index]
          const x = radius * Math.cos((angle * Math.PI) / 180)
          const y = radius * Math.sin((angle * Math.PI) / 180)

          return (
            <div
              key={avatar.id}
              className="absolute"
              style={{
                top: `calc(50% + ${y}px)`,
                left: `calc(50% + ${x}px)`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="text-center">
                <div className={`w-24 h-24 ${avatar.bgColor} rounded-full shadow-md flex items-center justify-center overflow-hidden`}>
                  {avatar.image ? (
                    <Image
                      src={avatar.image}
                      alt={avatar.label}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <Image
                      src={avatar.icon || ''}
                      alt={avatar.label}
                      width={40}
                      height={40}
                      className="w-10 h-10"
                    />
                  )}
                </div>
                <p className="mt-2 text-sm font-medium text-zabit-dark">{avatar.label}</p>
              </div>
            </div>
          )
        })}

        {/* Moving message with pause on each avatar */}
        {(() => {
          const angleForMessage = avatarAngles[currentIndex]
          const xMessage = radius * Math.cos((angleForMessage * Math.PI) / 180)
          const yMessage = radius * Math.sin((angleForMessage * Math.PI) / 180)

          return (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute px-4 py-2 rounded-full text-white text-sm font-medium shadow-md"
              style={{
                backgroundColor: '#a855f7',
                top: `calc(50% + ${yMessage}px)`,
                left: `calc(50% + ${xMessage}px)`,
                transform: 'translate(-50%, -120%)'
              }}
            >
              {avatars[currentIndex]?.message}
            </motion.div>
          )
        })()}
      </div>
    </section>
  )
}
