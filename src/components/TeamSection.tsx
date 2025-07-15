'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const teamMembers = [
  {
    name: "Roddy Lindsay",
    role: "Founder and CEO",
    credentials: "Stanford University, Meta",
    image: "https://ext.same-assets.com/3529801980/1862052449.jpeg",
    color: "text-zabit-primary"
  },
  {
    name: "Dr. Mark Gold",
    role: "Advisor",
    credentials: "Former Chairman of Psychiatry, University of Florida College of Medicine",
    image: "https://ext.same-assets.com/3529801980/907421943.png",
    color: "text-zabit-primary"
  }
]

export default function TeamSection() {
  return (
    <section className="  ml-6 mr-6">
      <div className=" bg-white container mx-auto px-4 sm:px-6 lg:px-8 py-20 rounded-b-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-zabit-dark mb-6">
            Built by Experts, Backed by Science
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Founded by leading AI and patient engagement experts, in partnership with leading behavior change scientists.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="text-center group"
            >
              {/* Profile Image */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative mb-6"
              >
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden shadow-2xl group-hover:shadow-3xl transition-shadow duration-300">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={192}
                    height={192}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Decorative ring */}
                <div className="absolute inset-0 w-48 h-48 mx-auto rounded-full border-4 border-zabit-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300 scale-110"></div>
              </motion.div>

              {/* Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-zabit-dark mb-2">
                    {member.name}
                  </h3>
                  <p className={`text-lg font-semibold ${member.color} mb-2`}>
                    {member.role}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {member.credentials}
                  </p>
                </div>

                {/* Social Links (placeholder) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="flex justify-center gap-4 pt-4"
                >
                  <a
                    href="#"
                    className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-zabit-primary hover:shadow-lg transition-all duration-300 hover:scale-110"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-zabit-primary hover:shadow-lg transition-all duration-300 hover:scale-110"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

       
      
      </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center m-16 "
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-zabit-dark mb-6">
            Interested in learning more?
          </h3>
          <button className="bg-zabit-dark text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-opacity-90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
            Book a demo
          </button>
        </motion.div>
    </section>
  )
}
