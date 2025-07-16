import React from "react";
import Image from "next/image";

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: "Brandon",
      location: "Los Angeles",
      avatar:
        "https://www.zabit.com/_next/image?url=%2Fimages%2Ftestimonials%2Fbrandon.jpg&w=384&q=75",
      text: "As someone who has struggled with spending too much time on social media, Zabit has been a game-changer for me. I've noticed an improvement in my mental well-being. I can't recommend it enough for anyone looking to create healthier boundaries with social media!",
      bgColor: "bg-purple-500",
      textColor: "text-white",
    },
    {
      id: 2,
      name: "Janet",
      location: "Minnesota",
      avatar:
        "https://www.zabit.com/_next/image?url=%2Fimages%2Ftestimonials%2Fjanet.jpg&w=384&q=75",
      text: "Coach Rosario has been amazing in helping me cut down on screen time before bed. Her kind and friendly approach really made impact. With her support, I've curbed late-night mindless scrolling, leading to better sleep and a greater sense of accomplishment each day.",
      bgColor: "bg-orange-600",
      textColor: "text-white",
    },
    {
      id: 3,
      name: "James",
      location: "Los Angeles",
      avatar:
        "https://www.zabit.com/_next/image?url=%2Fimages%2Ftestimonials%2Fjames.jpg&w=384&q=75",
      text: "I love how my coach Camila reminds me that good habits are a constant process, even when setbacks happen. And being able to customize automatic nudges helps to keep me on track! I am much consistent and aware of my bedtime patterns because of Averti.",
      bgColor: "bg-purple-500",
      textColor: "text-white",
    },
  ];

  return (
    <>
      <div className="mb-4 relative py-10">
        <h1 className="text-5xl lg:text-6xl font-bold text-gray-500 mb-4">
          User <span className="text-purple-800">testimonials</span>
        </h1>

        {/* Decorative arrow */}
        <div className="absolute top-14 right-25 md:right-[45rem]   transform translate-x-4 -translate-y-4">
          <svg
            width="130"
            height="98"
            viewBox="0 0 130 98"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="-mb-12 inline w-16 xl:w-auto -translate-y-[30%] xl:translate-y-[0]"
          >
            <path
              d="M118.088 71.2104C122.667 66.8232 121.46 59.1022 129.222 56.963C129.144 58.7068 129.2 59.8584 128.898 60.7248C125.437 71.3635 121.931 82.1995 118.268 92.7942C117.665 94.5271 116.28 96.9181 114.817 97.324C112.014 98.059 111.02 95.4598 110.26 93.2225C107.747 86.1487 105.033 79.0311 102.441 71.8366C107.098 71.2989 107.098 71.2989 113.119 82.4523C117.774 59.5411 101.568 39.3294 78.2146 39.5174C78.3264 41.8206 78.5611 44.0469 78.673 46.3501C78.8522 53.0182 77.1885 58.9736 72.6322 64.1944C69.3601 67.9345 65.3174 69.9528 60.2133 68.7358C55.0311 67.3981 52.853 63.5049 51.948 58.6464C49.87 48.2494 54.7053 39.4642 64.7676 35.5482C66.0296 35.0984 67.1352 34.4074 68.8104 33.5299C62.399 21.7733 53.4637 12.7806 40.9548 8.39456C21.6331 1.48644 8.92442 13.8366 3.91079 27.1404C3.22963 28.7526 3.02873 30.5732 2.20248 33.2932C0.14722 29.3231 0.861765 26.1645 1.65449 23.1265C4.65793 11.2486 16.3393 1.57454 28.8031 0.564679C36.7326 0.0157611 44.1708 1.63842 50.9503 5.70685C60.8794 11.7053 68.91 19.5684 74.0593 29.9103C74.5619 30.9521 75.1874 31.9172 75.8465 33.2004C86.5793 33.7809 96.9995 35.7433 105.521 43.2993C113.641 50.7675 115.317 61.0767 118.088 71.2104ZM71.3796 39.8908C60.4012 41.3283 54.4602 48.9401 56.9737 57.8783C57.5323 60.0717 59.4199 62.4515 61.4191 63.4056C64.1778 64.7324 66.7241 62.802 68.4326 60.3781C73.0894 54.247 73.558 47.513 71.3796 39.8908Z"
              fill="#522675"
            ></path>
          </svg>
        </div>
      </div>
      <div className="bg-gray-200 py-20 px-6 rounded-[3rem]">
        <div className="max-w-7xl mx-auto ">
          {/* Header */}

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="relative">
                {/* Background shape */}
                <div className="absolute inset-0 bg-gray-300 rounded-3xl transform rotate-3"></div>

                {/* User info */}
                <div className="relative z-10 flex items-center gap-4 mb-6 pl-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <Image
                      src={testimonial.avatar}
                      alt={`${testimonial.name} avatar`}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-600">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {testimonial.location}
                    </p>
                  </div>
                </div>

                {/* Testimonial card */}
                <div
                  className={`relative z-10 ${testimonial.bgColor} rounded-3xl p-6 shadow-lg`}
                >
                  {/* Speech bubble tail */}
                  <div
                    className={`absolute -top-3 left-8 w-6 h-6 ${testimonial.bgColor} transform rotate-45`}
                  ></div>

                  <blockquote
                    className={`${testimonial.textColor} text-base leading-relaxed`}
                  >
                    "{testimonial.text}"
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
