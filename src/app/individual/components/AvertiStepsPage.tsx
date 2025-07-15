"use client";

import React, { useState, useEffect, useRef } from 'react';

const ZabitStepsPage = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const step1Ref = useRef(null);
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Fix: Add proper type checking and fallback
            const stepAttr = entry.target.getAttribute('data-step');
            const stepNumber = stepAttr ? parseInt(stepAttr) : 1;
            
            // Ensure stepNumber is valid (1, 2, or 3)
            if (stepNumber >= 1 && stepNumber <= 3) {
              setActiveStep(stepNumber);
            }
          }
        });
      },
      {
        threshold: 0.6,
        rootMargin: '-100px 0px -100px 0px'
      }
    );

    if (step1Ref.current) observer.observe(step1Ref.current);
    if (step2Ref.current) observer.observe(step2Ref.current);
    if (step3Ref.current) observer.observe(step3Ref.current);

    return () => observer.disconnect();
  }, []);

  const stepContents = {
    1: {
      bgColor: 'bg-gradient-to-br from-purple-300 via-purple-50 to-pink-500',
      content: (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-32 h-32 bg-purple-800  blur-xl"></div>
            <div className="absolute bottom-20 right-16 w-40 h-40 bg-pink-200  blur-xl"></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-400  blur-lg"></div>
          </div>
          
          {/* Coach image */}
          <div className="relative z-10 flex items-center justify-center">
            <div className="relative">
              <img
                src="https://www.zabit.com/_next/image?url=%2Fimages%2Fcoach.png&w=1920&q=75"
                alt="Professional Coach"
                className="w-100 h-100 object-cover shadow-2xl"
              />
              
              {/* Floating badges */}
              <div className="absolute -top-4 -right-0 bg-white rounded-2xl px-4 py-3 shadow-lg transform rotate-12 animate-bounce">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-semibold text-gray-700">Available Now</span>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-0 bg-white rounded-2xl px-4 py-3 shadow-lg transform -rotate-6 animate-pulse">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🎯</span>
                  <span className="text-sm font-semibold text-gray-700">Expert Guidance</span>
                </div>
              </div>
              
              <div className="absolute top-1/2 -left-0 bg-white rounded-2xl px-4 py-3 shadow-lg transform -rotate-3">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">💪</span>
                  <span className="text-sm font-semibold text-gray-700">Build Habits</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    2: {
      bgColor: 'bg-gradient-to-br from-orange-400 via-orange-500 to-red-500',
      content: (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {/* Geometric background shapes */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-orange-300 to-transparent transform rotate-12 origin-top-right"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-gradient-to-tr from-red-400 to-transparent transform -rotate-12 origin-bottom-left"></div>
          </div>
          
          {/* Phone mockup */}
          <div className="relative z-10 flex items-center justify-center">
            <div className="relative transform hover:scale-105 transition-transform duration-300">
              <img
                src="https://www.zabit.com/_next/image?url=%2Fimages%2Fphone.png&w=3840&q=75"
                alt="Mobile App Interface"
                className="w-80 h-auto drop-shadow-2xl"
              />
              
              {/* Floating UI elements */}
              <div className="absolute -top-8 -right-8 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg animate-bounce">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-700">Goal Set!</span>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg transform rotate-3">
                <div className="text-center">
                  <div className="text-2xl mb-1">📱</div>
                  <div className="text-xs font-semibold text-gray-700">Easy Setup</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    3: {
      bgColor: 'bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800',
      content: (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-400 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-gradient-to-tl from-indigo-400 to-transparent"></div>
          </div>
          
          {/* Chat interface */}
          <div className="relative z-10 w-full max-w-md mx-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
                <div className="relative">
                  <img
                    src="https://www.zabit.com/_next/image?url=%2Fimages%2Fcoach.png&w=1920&q=75"
                    alt="Coach Avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Sarah</div>
                  <div className="text-sm text-gray-500">Your Coach</div>
                </div>
              </div>
              
              {/* Messages */}
              <div className="space-y-4">
                {/* User message */}
                <div className="flex justify-end">
                  <div className="bg-orange-500 text-white px-4 py-3 rounded-2xl rounded-br-md max-w-xs">
                    <div className="text-sm">I just went for a run.</div>
                  </div>
                </div>
                
                {/* Coach response */}
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl rounded-bl-md max-w-xs">
                    <div className="text-sm">
                      <span className="font-semibold text-purple-600">Great job!</span> That's three days in a row! What's your plan for tomorrow?
                    </div>
                  </div>
                </div>
                
                {/* Typing indicator */}
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Input area */}
              <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Floating stats */}
            <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg animate-pulse">
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">3</div>
                <div className="text-xs text-gray-600">Day Streak</div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-gray-700">Active Support</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  };

  // Fix: Add type safety for accessing stepContents
  const currentStep = stepContents[activeStep as keyof typeof stepContents] || stepContents[1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50" ref={containerRef}>
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Steps */}
          <div className="space-y-8">
            {/* Header */}
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-600 ">
                The <span className="text-purple-600">best version of</span>{' '}
              </h1>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-600 mt-4"> you in  <span className="relative inline-block">
                  <span className="bg-white px-4  rounded-full text-purple-600 border-4 border-purple-200">3 easy steps</span>
                </span></h1>{' '}
            </div>

            {/* Step 1 */}
            <div 
              ref={step1Ref}
              data-step="1"
              className={`transform transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              <div className={`rounded-3xl p-8 transition-all duration-500 transform hover:scale-105 ${
                activeStep === 1 
                  ? 'bg-purple-600 text-white shadow-2xl' 
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white/90 shadow-lg'
              }`}>
                <div className="flex items-center space-x-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold ${
                    activeStep === 1 ? 'bg-white text-purple-600' : 'bg-purple-100 text-purple-600'
                  }`}>
                    1.
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Meet your coach</h3>
                    <p className={`text-lg ${activeStep === 1 ? 'text-purple-100' : 'text-gray-600'}`}>
                      Get expert guidance and support to build lasting habits.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div 
              ref={step2Ref}
              data-step="2"
              className={`transform transition-all duration-700 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              <div className={`rounded-3xl p-8 transition-all duration-500 transform hover:scale-105 ${
                activeStep === 2 
                  ? 'bg-purple-600 text-white shadow-2xl' 
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white/90 shadow-lg'
              }`}>
                <div className="flex items-center space-x-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold ${
                    activeStep === 2 ? 'bg-white text-purple-600' : 'bg-purple-100 text-purple-600'
                  }`}>
                    2.
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Set your goal</h3>
                    <p className={`text-lg ${activeStep === 2 ? 'text-purple-100' : 'text-gray-600'}`}>
                      Like exercising daily or using your phone less. Choose any habit!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div 
              ref={step3Ref}
              data-step="3"
              className={`transform transition-all duration-700 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              <div className={`rounded-3xl p-8 transition-all duration-500 transform hover:scale-105 ${
                activeStep === 3 
                  ? 'bg-purple-600 text-white shadow-2xl' 
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white/90 shadow-lg'
              }`}>
                <div className="flex items-center space-x-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold ${
                    activeStep === 3 ? 'bg-white text-purple-600' : 'bg-purple-100 text-purple-600'
                  }`}>
                    3.
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Track with accountability</h3>
                    <p className={`text-lg ${activeStep === 3 ? 'text-purple-100' : 'text-gray-600'}`}>
                      Get accountability and support to build successful long-term habits.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Dynamic Content */}
          <div className="lg:sticky lg:top-24">
            <div className={`w-full h-[500px] lg:h-[600px] rounded-3xl transition-all duration-700 transform shadow-2xl ${
              currentStep.bgColor
            } ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="w-full h-full p-8">
                <div key={activeStep} className="animate-fade-in h-full">
                  {currentStep.content}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center space-x-3 mx-auto transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <span>Start your free Zabit trial</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ZabitStepsPage;