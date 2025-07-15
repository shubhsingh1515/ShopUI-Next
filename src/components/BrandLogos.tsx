'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const logos = [
  {
    name: 'Axios',
    src: 'https://ext.same-assets.com/3529801980/305987075.svg',
    width: 120,
    height: 40
  },
  {
    name: 'Fitt Insider',
    src: 'https://ext.same-assets.com/3529801980/1423747649.svg',
    width: 140,
    height: 40
  },
  {
    name: 'Gazetteer',
    src: 'https://ext.same-assets.com/3529801980/513164276.png',
    width: 130,
    height: 40
  },
  {
    name: 'The Information',
    src: 'https://ext.same-assets.com/3529801980/3669873909.svg',
    width: 160,
    height: 40
  },
  {
    name: 'Yahoo Finance',
    src: 'https://ext.same-assets.com/3529801980/2298930835.svg',
    width: 140,
    height: 40
  },
  {
    name: 'Global Wellness',
    src: 'https://ext.same-assets.com/3529801980/674710816.png',
    width: 120,
    height: 40
  }
]

export default function BrandLogos() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-gray-600 text-lg font-medium">As featured in</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-8 lg:gap-16"
        >
          {logos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
