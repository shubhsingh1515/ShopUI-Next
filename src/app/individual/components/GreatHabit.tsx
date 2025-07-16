"use client";
import React from 'react';
import Image from 'next/image';

const GreatHabit = () => {
  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className=" mb-16 relative">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-600 mb-4">
            Choose a{' '}
            <span className="text-purple-600">great habit</span>
          </h1>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-600">
            or bring your own
          </h2>
          
          {/* Decorative arrow */}
          <div className="absolute top-4 right-20 md:right-[35rem] transform translate-x-4 -translate-y-4">
            <svg
              width="130"
              height="98"
              viewBox="0 0 130 98"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="-mb-12 inline w-16 xl:w-auto -translate-y-[20%] xl:translate-y-[0]"
            >
              <path
                d="M118.088 71.2104C122.667 66.8232 121.46 59.1022 129.222 56.963C129.144 58.7068 129.2 59.8584 128.898 60.7248C125.437 71.3635 121.931 82.1995 118.268 92.7942C117.665 94.5271 116.28 96.9181 114.817 97.324C112.014 98.059 111.02 95.4598 110.26 93.2225C107.747 86.1487 105.033 79.0311 102.441 71.8366C107.098 71.2989 107.098 71.2989 113.119 82.4523C117.774 59.5411 101.568 39.3294 78.2146 39.5174C78.3264 41.8206 78.5611 44.0469 78.673 46.3501C78.8522 53.0182 77.1885 58.9736 72.6322 64.1944C69.3601 67.9345 65.3174 69.9528 60.2133 68.7358C55.0311 67.3981 52.853 63.5049 51.948 58.6464C49.87 48.2494 54.7053 39.4642 64.7676 35.5482C66.0296 35.0984 67.1352 34.4074 68.8104 33.5299C62.399 21.7733 53.4637 12.7806 40.9548 8.39456C21.6331 1.48644 8.92442 13.8366 3.91079 27.1404C3.22963 28.7526 3.02873 30.5732 2.20248 33.2932C0.14722 29.3231 0.861765 26.1645 1.65449 23.1265C4.65793 11.2486 16.3393 1.57454 28.8031 0.564679C36.7326 0.0157611 44.1708 1.63842 50.9503 5.70685C60.8794 11.7053 68.91 19.5684 74.0593 29.9103C74.5619 30.9521 75.1874 31.9172 75.8465 33.2004C86.5793 33.7809 96.9995 35.7433 105.521 43.2993C113.641 50.7675 115.317 61.0767 118.088 71.2104ZM71.3796 39.8908C60.4012 41.3283 54.4602 48.9401 56.9737 57.8783C57.5323 60.0717 59.4199 62.4515 61.4191 63.4056C64.1778 64.7324 66.7241 62.802 68.4326 60.3781C73.0894 54.247 73.558 47.513 71.3796 39.8908Z"
                fill="#522675"
              ></path>
            </svg>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Fitness */}
          <div className="relative group cursor-pointer">
            <div className="relative h-64 rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="https://www.zabit.com/_next/image?url=%2Fimages%2Fcategories%2Ffitness.jpg&w=1080&q=75"
                alt="Fitness category"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <h3 className="text-2xl font-bold text-white">Fitness</h3>
                <div className="space-y-2">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-purple-600 inline-block">
                    Work out more often
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-purple-600 inline-block">
                    Walk 10,000 steps every day
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lifestyle */}
          <div className="relative group cursor-pointer">
            <div className="relative h-64 rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="https://www.zabit.com/_next/image?url=%2Fimages%2Fcategories%2Flifestyle.jpg&w=1080&q=75"
                alt="Lifestyle category"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <h3 className="text-2xl font-bold text-white">Lifestyle</h3>
                <div className="space-y-2">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-purple-600 inline-block">
                    Read more books
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-purple-600 inline-block">
                    Meditate every day
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Screen Time */}
          <div className="relative group cursor-pointer">
            <div className="relative h-64 rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="https://www.zabit.com/_next/image?url=%2Fimages%2Fcategories%2Fscreentime.png&w=1080&q=75"
                alt="Screen Time category"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <h3 className="text-2xl font-bold text-white">Screen Time</h3>
                <div className="space-y-2">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-purple-600 inline-block">
                    Use less social media
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-purple-600 inline-block">
                    Stop using your phone before bed
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Health */}
          <div className="relative group cursor-pointer">
            <div className="relative h-64 rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="https://www.zabit.com/_next/image?url=%2Fimages%2Fcategories%2Fhealth.jpg&w=1080&q=75"
                alt="Health category"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <h3 className="text-2xl font-bold text-white">Health</h3>
                <div className="space-y-2">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-purple-600 inline-block">
                    Get to bed earlier
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-purple-600 inline-block">
                    Cut down on snacking
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Parenting */}
          <div className="relative group cursor-pointer">
            <div className="relative h-64 rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="https://www.zabit.com/_next/image?url=%2Fimages%2Fcategories%2Fparenting.png&w=1080&q=75"
                alt="Parenting category"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <h3 className="text-2xl font-bold text-white">Parenting</h3>
                <div className="space-y-2">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-purple-600 inline-block">
                    Work on a hobby together every week
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-purple-600 inline-block">
                    More screen-free time with the kids
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Substances */}
          <div className="relative group cursor-pointer">
            <div className="relative h-64 rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="https://www.zabit.com/_next/image?url=%2Fimages%2Fcategories%2Fsubstances.png&w=1080&q=75"
                alt="Substances category"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <h3 className="text-2xl font-bold text-white">Substances</h3>
                <div className="space-y-2">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-purple-600 inline-block">
                    Drink alcohol fewer times per week
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-purple-600 inline-block">
                    Stop vaping
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-full transition-colors duration-200 flex items-center gap-3 shadow-lg">
            Start your free Averti trial
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GreatHabit;