'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function MobileInterface() {
  return (
    <section className="bg-zabit-dark py-4 text-white rounded-[3rem]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Content - Mobile Interface */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative "
          >
            {/* Phone mockup */}
            <div className="relative mx-auto w-80 h-[700px] bg-white rounded-[3rem] p-4 shadow-2xl mt-[-10%] mb-[-10%]">
              {/* Phone header */}
              <div className="flex justify-between items-center  text-black border-b border-gray-100 mt-4">
                <span className="text-sm font-medium">2:30</span>
                <div className="flex gap-1 ">
                  <div className="w-4 h-4">
                    <Image
                      src="https://ext.same-assets.com/3529801980/3243790944.svg"
                      alt="Signal"
                      width={16}
                      height={16}
                    />
                  </div>
                  <div className="w-4 h-4">
                    <Image
                      src="https://ext.same-assets.com/3529801980/2393549059.svg"
                      alt="Battery"
                      width={16}
                      height={16}
                    />
                  </div>
                </div>
              </div>

              {/* Chat header */}
              <div className="flex items-center gap-2 p-4 border-b border-gray-100 text-black">
                <button className="p-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="w-8 h-8 bg-zabit-primary rounded-full flex items-center justify-center">
                  <svg width="15" height="15" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.9998 6.18311L14.5658 4.70911C11.1998 1.24911 5.02779 2.44311 2.79979 6.79311C1.75379 8.83911 1.51779 11.7931 3.42779 15.5631C5.26779 19.1931 9.09579 23.5411 15.9998 28.2771C22.9038 23.5411 26.7298 19.1931 28.5718 15.5631C30.4818 11.7911 30.2478 8.83911 29.1998 6.79311C26.9718 2.44311 20.7998 1.24711 17.4338 4.70711L15.9998 6.18311ZM15.9998 30.6871C-14.6662 10.4231 6.55779 -5.39289 15.6478 2.97311C15.7678 3.08378 15.8851 3.19778 15.9998 3.31511C16.1125 3.19704 16.2299 3.08361 16.3518 2.97511C25.4398 -5.39689 46.6658 10.4211 15.9998 30.6871Z" fill="white" className="fill-green"></path></svg>
                </div>
                <span className="font-lg">My Support Circle</span>
                <button className="ml-auto p-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>

              {/* Chat messages */}
              <div className="flex-1 p-4 space-y-4 text-black">
                {/* AI message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    AI
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-2xl rounded-tl-md p-4 max-w-xs">
                      <p className="text-sm">Hi Robert! It's time for your afternoon medication. Have you taken your meds yet?</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">2:30 PM</p>
                  </div>
                </motion.div>

                {/* Response buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex gap-2 pl-11"
                >
                  <button className="bg-zabit-primary text-white px-4 py-2 rounded-full text-sm font-medium">
                    Yes ✓
                  </button>
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                    No ✗
                  </button>
                </motion.div>

                {/* User response */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="flex justify-end"
                >
                  <div className="bg-zabit-primary text-white rounded-2xl rounded-tr-md p-4 max-w-xs">
                    <p className="text-sm">Just took them! 💊</p>
                  </div>
                </motion.div>

                {/* Celebration message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    AI
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-2xl rounded-tl-md p-4 max-w-xs">
                      <p className="text-sm">That's a three day streak! 🎉</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">2:31 PM</p>
                  </div>
                </motion.div>

                {/* Family message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-full overflow-hidden">
                    <Image
                      src="https://ext.same-assets.com/3529801980/2499113889.png"
                      alt="Family member"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-2xl rounded-tl-md p-4 max-w-xs">
                      <p className="text-sm">Way to go Dad! ❤️</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">2:31 PM</p>
                  </div>
                </motion.div>
              </div>

              {/* Input area */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                  <input
                    type="text"
                    placeholder="RCS Message..."
                    className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-500 outline-none"
                    readOnly
                  />
                  <button className="w-8 h-8 bg-zabit-primary rounded-full flex items-center justify-center rotate-90">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h2 className="text-2xl lg:text-3xl  leading-tight">
                Rich, interactive client engagement.
              </h2>

              <h3 className="text-xl lg:text-3xl  text-zabit-primary">
                No app download needed.
              </h3>

              <p className="text-md text-gray-300 leading-relaxed">
                70% of potential users do not use one-off health apps. Averti Systems works using RCS — the next generation mobile messaging technology which is already integrated into messaging apps and does{' '}
                <span className="font-semibold text-white">not require a separate download</span>.
              </p>

              <p className="text-md text-gray-300 leading-relaxed">
                Also coordinating SMS, email, voice calls, and calendars, Averti Systems allows customers to reach nearly 100% of their population without needing them to install an app.
              </p>
            </div>

            {/* Features */}
            {/* <div className="space-y-4">
              {[
                "Native messaging integration",
                "Cross-platform compatibility",
                "Real-time notifications",
                "Multimedia support"
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-zabit-primary rounded-full"></div>
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div> */}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
