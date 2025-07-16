"use client";

import React, { useState, useEffect, useRef } from 'react';


const ZabitStepsPage = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);
  const isScrollingRef = useRef(false);
  const lastScrollTimeRef = useRef(0);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      if (!containerRef.current || !mainRef.current) return;
      
      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if component is in viewport
      const isInViewport = containerRect.top < windowHeight && containerRect.bottom > 0;
      
      if (isInViewport) {
        // Calculate how much of the component is visible
        const visibleTop = Math.max(0, -containerRect.top);
        const visibleBottom = Math.min(containerRect.height, windowHeight - containerRect.top);
        const visibleHeight = visibleBottom - visibleTop;
        const visibilityRatio = visibleHeight / windowHeight;
        
        // Enable scroll lock when component is significantly visible and at top
        if (visibilityRatio > 0.8 && containerRect.top <= 50) {
          if (!isScrollLocked) {
            setIsScrollLocked(true);
            scrollPositionRef.current = window.scrollY;
          }
          
          // Calculate progress through the steps (0 to 1)
          const maxScroll = containerRect.height - windowHeight;
          const currentScroll = Math.max(0, -containerRect.top);
          const progress = Math.min(1, currentScroll / maxScroll);
          
          setScrollProgress(progress);
          
          // Determine active step based on progress
          if (progress < 0.25) {
            setActiveStep(1);
          } else if (progress < 0.65) {
            setActiveStep(2);
          } else {
            setActiveStep(3);
          }
        } else {
          setIsScrollLocked(false);
        }
      } else {
        setIsScrollLocked(false);
      }
    };
    

   const handleWheel = (e: WheelEvent) => {
  if (!isScrollLocked || isScrollingRef.current || !containerRef.current) return;
  
  const now = Date.now();
  if (now - lastScrollTimeRef.current < 16) return; // Throttle to ~60fps
  lastScrollTimeRef.current = now;
  
  e.preventDefault();
  
  isScrollingRef.current = true;
  
  const delta = e.deltaY;
  const container = containerRef.current;
  const containerRect = container.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const currentScroll = window.scrollY;
  
  // Calculate scroll bounds
  const containerTop = scrollPositionRef.current;
  const containerBottom = containerTop + containerRect.height - windowHeight;
  
  // Calculate new scroll position with consistent sensitivity
  const scrollSensitivity = 1.5; // Increased slightly for better feel
  const scrollAmount = delta * scrollSensitivity;
  let newScrollY = currentScroll + scrollAmount;
  
  // Apply momentum to reverse scrolling to match forward scrolling
  const momentumFactor = delta < 0 ? 1.2 : 1; // Boost reverse scrolling
  newScrollY = currentScroll + (delta * scrollSensitivity * momentumFactor);
  
  // Check bounds and handle transitions
  if (newScrollY < containerTop) {
    if (delta < 0) {
      setIsScrollLocked(false);
      window.scrollTo({
        top: containerTop - 100,
        behavior: 'smooth'
      });
    } else {
      newScrollY = containerTop;
    }
  } else if (newScrollY > containerBottom) {
    if (delta > 0) {
      setIsScrollLocked(false);
      window.scrollTo({
        top: containerBottom + 100,
        behavior: 'smooth'
      });
    } else {
      newScrollY = containerBottom;
    }
  }
  
  // Apply the scroll
  window.scrollTo({
    top: newScrollY,
    behavior: 'auto'
  });
  
  setTimeout(() => {
    isScrollingRef.current = false;
  }, 50);
};

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isScrollLocked || !containerRef.current) return;
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        const container = containerRef.current;
        const containerRect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const currentScroll = window.scrollY;
        const containerBottom = scrollPositionRef.current + containerRect.height - windowHeight;
        
        const newScrollY = Math.min(containerBottom, currentScroll + windowHeight * 0.3);
        window.scrollTo({
          top: newScrollY,
          behavior: 'smooth'
        });
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const currentScroll = window.scrollY;
        const containerTop = scrollPositionRef.current;
        
        const newScrollY = Math.max(containerTop, currentScroll - window.innerHeight * 0.3);
        window.scrollTo({
          top: newScrollY,
          behavior: 'smooth'
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleWheel as EventListener, { passive: false });
    window.addEventListener('keydown', handleKeyDown as EventListener);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel as EventListener);
      window.removeEventListener('keydown', handleKeyDown as EventListener);
    };
  }, [isScrollLocked]);

  const stepContents = {
    1: {
      bgColor: 'bg-gradient-to-br from-purple-300 via-purple-50 to-pink-500',
      content: (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-32 h-32 bg-purple-800 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 right-16 w-40 h-40 bg-pink-200 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-400 rounded-full blur-lg"></div>
          </div>
          
          <div className="relative z-10 flex items-center justify-center">
            <div className="relative">
              <img
                src="https://www.zabit.com/_next/image?url=%2Fimages%2Fcoach.png&w=1920&q=75"
                alt="Professional Coach"
                className="object-cover"
              />
              
              <div className="absolute -top-4 right-2 bg-white rounded-2xl px-4 py-3 shadow-lg transform rotate-12 animate-bounce">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-semibold text-gray-700">Available Now</span>
                </div>
              </div>
              
              <div className="absolute -bottom-6 left-0 bg-white rounded-2xl px-4 py-3 shadow-lg transform -rotate-6 animate-pulse">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🎯</span>
                  <span className="text-sm font-semibold text-gray-700">Expert Guidance</span>
                </div>
              </div>
              
              <div className="absolute top-1/2 left-2 bg-white rounded-2xl px-4 py-3 shadow-lg transform -rotate-3">
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
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-orange-300 to-transparent transform rotate-12 origin-top-right"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-gradient-to-tr from-red-400 to-transparent transform -rotate-12 origin-bottom-left"></div>
          </div>
          
          <div className="relative z-10 flex items-center justify-center">
            <div className="relative transform hover:scale-105 transition-transform duration-300">
              <img
                src="https://www.zabit.com/_next/image?url=%2Fimages%2Fphone.png&w=3840&q=75"
                alt="Mobile App Interface"
                className="w-80 h-auto drop-shadow-2xl"
              />
              
              <div className="absolute -top-2 -right-8 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg animate-bounce">
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
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-400 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-gradient-to-tl from-indigo-400 to-transparent"></div>
          </div>
          
          <div className="relative z-10 w-full max-w-md mx-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 space-y-6">
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
              
              <div className="space-y-4">
                <div className="flex justify-end">
                  <div className="bg-orange-500 text-white px-4 py-3 rounded-2xl rounded-br-md max-w-xs">
                    <div className="text-sm">I just went for a run.</div>
                  </div>
                </div>
                
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl rounded-bl-md max-w-xs">
                    <div className="text-sm">
                      <span className="font-semibold text-purple-600">Great job!</span> That's three days in a row! What's your plan for tomorrow?
                    </div>
                  </div>
                </div>
                
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

  const currentStep = stepContents[activeStep as keyof typeof stepContents] || stepContents[1];

  return (
    <div>
      <div 
        ref={containerRef}
        className="min-h-[350vh] relative mt-10"
      >
        <div 
          ref={mainRef}
          className="sticky top-0 h-screen overflow-hidden"
        >
          <div className="container mx-auto px-6 py-16 h-full flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
              {/* Left Side - Steps */}
              <div className="space-y-8">
                <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-gray-600">
                    The <span className="text-purple-600">best version of</span>{' '}
                  </h1>
                  <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-gray-600 mt-4">
                    you in <span className="relative inline-block">
                      <span className="bg-white px-4 rounded-full text-purple-600 border-4 border-purple-200">3 easy steps</span>
                    </span>
                  </h1>
                </div>

                {/* Step 1 */}
                <div className={`transform transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  <div className={`rounded-3xl p-4 transition-all duration-500 transform hover:scale-105 ${
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
                <div className={`transform transition-all duration-700 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  <div className={`rounded-3xl p-4 transition-all duration-500 transform hover:scale-105 ${
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
                <div className={`transform transition-all duration-700 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  <div className={`rounded-3xl p-4 transition-all duration-500 transform hover:scale-105 ${
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
                  <div className="w-full h-full p-0">
                    <div key={activeStep} className="animate-fade-in h-full">
                      {currentStep.content}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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