import React from 'react';
import Image from 'next/image';

const CoachesSection: React.FC = () => {
  const coaches = [
    {
      name: "Mica",
      description: "Nutritionist and wellness expert with 5 years of experience helping clients with lifestyle changes.",
      specialties: ["NUTRITION", "FITNESS", "SCREEN TIME"],
      image: "https://www.zabit.com/_next/image?url=%2Fimages%2Fcoaches%2Fmica.png&w=828&q=75",
      
    },
    {
      name: "Clara",
      description: "Fourth year clinical psychology student, invested in helping clients build healthy habits.",
      specialties: ["HEALTH", "ORGANIZATION", "NUTRITION"],
      image: "https://www.zabit.com/_next/image?url=%2Fimages%2Fcoaches%2Fclara.png&w=828&q=75",
    },
    {
      name: "Rosario",
      description: "Fourth year clinical psychology student, loves helping others achieve their goals!",
      specialties: ["SLEEP", "LIFESTYLE", "SUBSTANCES"],
      image:"https://www.zabit.com/_next/image?url=%2Fimages%2Fcoaches%2Frosario.png&w=828&q=75",
    }
  ];

  return (
    <div className="bg-gray-50 py-20 px-6">
      <div className="max-w-8xl mx-auto">
        {/* Header Section */}
        <div className="mb-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            {/* Title */}
            <div className="lg:w-1/3">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-600 leading-tight">
                Meet our
              </h1>
              <h1 className="text-5xl lg:text-6xl font-bold text-purple-700 leading-tight">
                Coaches
              </h1>
            </div>
            
            {/* Description */}
            <div className="lg:w-2/3">
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
                Averti Systems coaches are{' '}
                <span className="font-semibold text-purple-600">psychologists</span>,{' '}
                <span className="font-semibold text-purple-600">wellness professionals</span>, and{' '}
                <span className="font-semibold text-purple-600">advanced clinical psychology students</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coaches.map((coach, index) => (
            <div key={coach.name} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              {/* Coach Image */}
              <div className="relative aspect-[4/3] bg-gray-200">
                <Image
                  src={coach.image}
                  alt={`${coach.name} - Averti Coach`}
                  fill
                  className="h-full w-full"

                />
                
                {/* Zabit Logo (only on middle card) */}
                {/* {index === 1 && (
                  <div className="absolute top-4 left-4">
                    <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center">
                      <div className="w-5 h-5 bg-white rounded-md"></div>
                    </div>
                  </div>
                )} */}
              </div>

              {/* Coach Info */}
              <div className="p-6">
                {/* Name Badge */}
                <div className="mb-4">
                  <span className="inline-block bg-purple-200 text-purple-800 font-semibold px-4 py-2 rounded-full text-sm">
                    {coach.name}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {coach.description}
                </p>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2">
                  {coach.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="bg-orange-500 text-white font-medium px-3 py-1 rounded-full text-xs uppercase tracking-wide"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoachesSection;