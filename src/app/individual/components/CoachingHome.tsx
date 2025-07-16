import React from 'react';
import Image from 'next/image';

const ZabitLandingPage = () => {
  return (
    <div className=" bg-gradient-to-br from-orange-400 via-orange-600 to-red-800 relative overflow-hidden rounded-[2rem] mt-6 ">
      {/* Background geometric shape */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-orange-300 to-transparent opacity-30 transform rotate-12 origin-top-right"></div>
      
      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            {/* <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
            </div> */}
            
            <div className="text-white font-bold text-xl">
              <Image
                                            src="https://client.avertisystems.com/assets/img/averti21.png"
                                            alt="Averti Systems Logo"
                                            width={100}
                                            height={100}
                                            className="w-[80%]"
                                          />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Left Content */}
          <div className="space-y-8">
           <div className="space-y-6">
  <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
    A personal coach
  </h1>
  <div className="relative">
    <span className="text-5xl lg:text-6xl font-bold text-white">for </span>
    <span
      className="text-4xl lg:text-5xl font-bold text-white px-4 py-2 rounded-full inline-block
                 bg-gradient-to-r from-purple-600 to-purple-600 bg-[length:0%_100%] bg-no-repeat
                 animate-bg-fill transition-all"
    >
      everyday habits.
    </span>
  </div>
</div>


            {/* Habit badges */}
            <div className="flex flex-wrap gap-3">
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 flex items-center space-x-2">
                <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-purple-600 font-medium">Exercise more often.</span>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 flex items-center space-x-2">
                <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-purple-600 font-medium">Cut down on screen time.</span>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 flex items-center space-x-2">
                <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-purple-600 font-medium">Go to sleep earlier.</span>
              </div>
            </div>

            {/* Sign up form */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="tel"
                  placeholder="(555) 555-5555"
                  className="flex-1 px-6 py-4 rounded-full border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-gray-700"
                />
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center space-x-2 transition-colors">
                  <span>Sign Up</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              <p className="text-white text-sm max-w-md">
                By pressing "Sign Up", I understand that I may receive text messages from Averti Systems. Message and data rates may apply. 
                <span className="underline cursor-pointer">Terms of Use</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
              </p>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative">
            {/* Coach image */}
            <div className="relative z-10">
              <img
                src="https://www.zabit.com/_next/image?url=%2Fimages%2Ftop_coach.png&w=828&q=75"
                alt="Personal Coach"
                className="w-full max-w-md mr-[15rem] ml-[-10rem]"
              />
            </div>

            {/* Floating message */}
            <div className="absolute top-12 right-10 bg-orange-500 rounded-2xl p-6 shadow-lg max-w-xs z-20">
                <div
                  className={`absolute top-10 -left-4 w-10 h-6 bg-orange-500 transform rotate-45`}
                ></div>
              <div className="space-y-2">
                <h3 className="font-bold text-white text-lg">Hi!</h3>
                <p className="text-white text-md leading-relaxed">
                  I am an <span className="font-semibold">actual, real, human</span> coach to help you stay on track and hold you accountable to your habit goals.
                </p>
              </div>
            </div>

            {/* Dark theme toggle */}
            {/* <div className="absolute bottom-4 left-4 z-20">
              <button className="w-12 h-12 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/30 transition-colors">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZabitLandingPage;