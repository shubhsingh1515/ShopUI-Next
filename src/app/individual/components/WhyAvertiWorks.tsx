import React from 'react';

const WhyAvertiWorks = () => {
  return (
    <>
    <h1 className="text-6xl font-bold text-gray-600 mb-10">
            Why <span className="text-purple-700"> Averti works</span>
            <span className="inline-block ml-4 text-purple-500 dark:text-purple-300">
          
            <svg
              width="130"
              height="98"
              viewBox="0 0 130 98"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="-mb-8 inline w-16 xl:w-auto -translate-y-[20%] xl:translate-y-[0]"
            >
              <path
                d="M118.088 71.2104C122.667 66.8232 121.46 59.1022 129.222 56.963C129.144 58.7068 129.2 59.8584 128.898 60.7248C125.437 71.3635 121.931 82.1995 118.268 92.7942C117.665 94.5271 116.28 96.9181 114.817 97.324C112.014 98.059 111.02 95.4598 110.26 93.2225C107.747 86.1487 105.033 79.0311 102.441 71.8366C107.098 71.2989 107.098 71.2989 113.119 82.4523C117.774 59.5411 101.568 39.3294 78.2146 39.5174C78.3264 41.8206 78.5611 44.0469 78.673 46.3501C78.8522 53.0182 77.1885 58.9736 72.6322 64.1944C69.3601 67.9345 65.3174 69.9528 60.2133 68.7358C55.0311 67.3981 52.853 63.5049 51.948 58.6464C49.87 48.2494 54.7053 39.4642 64.7676 35.5482C66.0296 35.0984 67.1352 34.4074 68.8104 33.5299C62.399 21.7733 53.4637 12.7806 40.9548 8.39456C21.6331 1.48644 8.92442 13.8366 3.91079 27.1404C3.22963 28.7526 3.02873 30.5732 2.20248 33.2932C0.14722 29.3231 0.861765 26.1645 1.65449 23.1265C4.65793 11.2486 16.3393 1.57454 28.8031 0.564679C36.7326 0.0157611 44.1708 1.63842 50.9503 5.70685C60.8794 11.7053 68.91 19.5684 74.0593 29.9103C74.5619 30.9521 75.1874 31.9172 75.8465 33.2004C86.5793 33.7809 96.9995 35.7433 105.521 43.2993C113.641 50.7675 115.317 61.0767 118.088 71.2104ZM71.3796 39.8908C60.4012 41.3283 54.4602 48.9401 56.9737 57.8783C57.5323 60.0717 59.4199 62.4515 61.4191 63.4056C64.1778 64.7324 66.7241 62.802 68.4326 60.3781C73.0894 54.247 73.558 47.513 71.3796 39.8908Z"
                fill="#522675"
              ></path>
            </svg>
         
            </span>
          </h1>
    <div className="relative inset-0 overflow-hidden bg-gradient-to-br from-purple-100 to-gray-300 dark:from-purple-900 dark:to-indigo-900 p-8 mb-10 rounded-3xl">
          <div className="h-[140%] aspect-square bg-purple-300 rounded-3xl absolute top-0 left-0 rotate-[45deg] -translate-x-1/2"></div>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Profile */}
          <div className="relative">
            {/* Background Circle */}
            <div className="absolute inset-0 bg-gray-300 dark:bg-purple-800 rounded-full opacity-30 w-96 h-96 -left-8 -top-8"></div>
            
            {/* Profile Image */}
            <div className="relative z-10 mb-8">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
                <img 
                  src="	https://www.zabit.com/_next/image?url=%2Fimages%2Fmark.png&w=640&q=75" 
                  alt="Mark S. Gold, M.D." 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-300 mb-2">
                Mark S. Gold, M.D.
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Pioneering addiction scientist and former Chairman of Psychiatry, University of Florida College of Medicine
              </p>
            </div>
          </div>

          {/* Right Side - Quote */}
          <div className="relative">
            <div className="bg-purple-500 text-white p-8 rounded-2xl shadow-xl relative">
              {/* Quote Content */}
              <blockquote className="text-lg leading-relaxed">
                "From my 50 years of experience as a psychiatrist, I know that{' '}
                <span className="font-semibold">accountability to another person</span>, whether it's through coaching or a 12-step program, is{' '}
                <span className="font-semibold">essential for supporting difficult behavior change</span>. Avarti's affordable habit coaching service makes that possible for everyday habits in our lives."
              </blockquote>
              
              {/* Quote Mark */}
              <div className="absolute -top-4 -left-4 text-6xl text-purple-300 dark:text-purple-500 font-serif">
                "
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default WhyAvertiWorks;