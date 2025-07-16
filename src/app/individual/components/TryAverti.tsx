import React from 'react';
import { ChevronRight } from 'lucide-react';

const Index = () => {
  return (
    <div className=" bg-gradient-to-br from-purple-300 via-gray-500 to-purple-400  rounded-[2rem] mt-6 mb-6 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with Apple logo */}
       

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
  {/* Left */}
  <div className="space-y-8 text-center lg:text-left px-4 sm:px-8">
    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-800 mb-4">
      Try Averti Systems
    </h1>
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-800 mb-8">
      for free today
    </h2>
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