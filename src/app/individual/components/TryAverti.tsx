import React from 'react';
import { ChevronRight } from 'lucide-react';

const Index = () => {
  return (
    <div className=" bg-gradient-to-br from-purple-300 via-gray-500 to-purple-400  rounded-[2rem] mt-6 mb-6 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with Apple logo */}
       

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
  {/* Left */}
  <div className="space-y-4 text-center lg:text-left px-4 sm:px-8">
    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-800 ">
      Try Averti Systems
    </h1>
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-800 mb-5 ">
      for free today
    </h2>
     <div className=" top-4 right-20 md:right-[35rem] transform translate-x-4 -translate-y-4 ">
            <svg
              width="130"
              height="60"
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
    {/* Input and Button */}
    <div className="flex flex-col sm:flex-row gap-4">
      <input
        type="tel"
        placeholder="(555) 555-5555"
        className="bg-white/90 border text-gray-800 placeholder:text-gray-500 rounded-full px-4 py-3 sm:px-6 sm:py-4 text-base sm:text-lg"
      />
      <button className="bg-purple-700 hover:bg-purple-800 text-white rounded-full px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg flex items-center justify-center gap-2 font-semibold">
        Sign Up
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
    <p className="text-white text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
      By pressing “Sign Up”, I understand that I may receive text messages from Zabit. Message and data rates may apply. Terms of Use and Privacy Policy.

    </p>
  </div>

  {/* Right */}
  <div className="flex justify-center px-4">
    <img 
      src="https://www.zabit.com/_next/image?url=%2Fimages%2Fphones.png&w=1080&q=75"
      alt="Zabit mobile app screens"
      className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl h-auto"
    />
  </div>
</div>

      </div>
    </div>
  );
};

export default Index;