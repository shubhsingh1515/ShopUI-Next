'use client'

import { motion } from 'framer-motion'
import { CheckIcon } from '@heroicons/react/24/outline'

const features = [
  "Healthcare Providers",
  "Health Plans & Payors",
  "Value-Based Care",
  "Health Coaching",
  "EHRs",
  "Healthcare Tech Companies",
  "Virtual Care",
  "Public Health",
  "Wellness and PT Clinics"
]

export default function OutcomesSection() {
  return (
    <section className="bg-gray-200 py-20 rounded-xl ml-10 mr-10 mt-[-80px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-zabit-dark leading-tight">
                Improve outcomes.{' '}
                <span className="block">Save staff time.</span>
              </h2>

              <p className="text-xl text-gray-700 leading-relaxed">
                Averti Systems behavioral science technology, AI agents and family care partners do the heavy lifting of{' '}
                <span className="font-semibold border-b-2 border-zabit-primary">maximizing everyday adherence</span>.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="space-y-4">
              {[
                "Reduces staff workload by 60%",
                "Increases patient engagement by 3x",
                "Improves care plan adherence",
                "24/7 automated monitoring"
              ].map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-zabit-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Works For */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-zabit-dark mb-6">Works for:</h3>

              <div className="flex flex-wrap gap-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="flex items-center gap-3 p-2 rounded-xl border  border-zabit-primary hover:bg-zabit-light transition-all duration-300 cursor-pointer">
                      {/* <div className="w-2 h-2 bg-zabit-primary rounded-full group-hover:scale-125 transition-transform duration-300"></div> */}
                      <span className="text-gray-700 font-medium group-hover:text-zabit-dark">{feature}</span>
                      
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-check-big w-4 h-4 text-teal-500"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>
                     
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-6"
            >
              <button className="w-full bg-zabit-primary text-white py-4 px-8 rounded-xl font-semibold hover:bg-opacity-90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                Learn More About Our Platform
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
