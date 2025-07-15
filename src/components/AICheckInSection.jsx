"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AICheckInSection() {
  const logos = [
    {
      name: "Axios",
      src: "https://ext.same-assets.com/3529801980/305987075.svg",
      width: 120,
      height: 40,
    },
    {
      name: "Fitt Insider",
      src: "https://ext.same-assets.com/3529801980/1423747649.svg",
      width: 140,
      height: 40,
    },
    {
      name: "Gazetteer",
      src: "https://www.zabit.com/_next/image?url=%2Fbusiness-images%2Flogos%2Fgazetteer.png&w=384&q=75",
      width: 130,
      height: 40,
    },
    {
      name: "The Information",
      src: "https://ext.same-assets.com/3529801980/3669873909.svg",
      width: 160,
      height: 40,
    },
    {
      name: "Yahoo Finance",
      src: "https://ext.same-assets.com/3529801980/2298930835.svg",
      width: 140,
      height: 40,
    },
  ];

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Animation values for the small images
  const x1 = useTransform(scrollYProgress, [0, 1], [-20, -100]);
  const y1 = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const x2 = useTransform(scrollYProgress, [0, 1], [100, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-400, -450]);
  const x3 = useTransform(scrollYProgress, [0, 1], [-200, -500]);
  const y3 = useTransform(scrollYProgress, [0, 1], [-150, -300]);

  return (
    <section
      className="bg-white pt-5 rounded-2xl m-10 mt-[-50px]"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* <p className="text-gray-600 text-lg font-medium">As featured in</p> */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-6 lg:gap-10 mb-5"
        >
          {logos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <hr />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Image with floating elements */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Main large image */}
              <Image
                src="https://www.zabit.com/_next/image?url=%2Fbusiness-images%2Fwoman.png&w=3840&q=75"
                alt="Woman using laptop for health coaching"
                width={600}
                height={600}
                className="w-full h-auto rounded-2xl"
              />

              {/* Small image 1 */}
              <motion.div
                style={{ x: x1, y: y1 }}
                className="absolute top-0 left-0 w-32 h-32 rounded-lg shadow-lg overflow-hidden"
              >
                <Image
                  src="https://www.zabit.com/_next/image?url=%2Fbusiness-images%2Fcouple.png&w=1080&q=75" // Replace with your small image URL
                  alt="Small image 1"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Small image 2 */}
              <motion.div
                style={{ x: x2, y: y2 }}
                className="absolute bottom-0 left-0 w-28 h-28 rounded-lg shadow-lg overflow-hidden"
              >
                <Image
                  src="https://www.zabit.com/_next/image?url=%2Fbusiness-images%2Fdoctor.png&w=1080&q=75" // Replace with your small image URL
                  alt="Small image 2"
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Small image 3 */}
              <motion.div
                style={{ x: x3, y: y3 }}
                className="absolute top-1/2 right-0 w-24 h-24 rounded-lg shadow-lg overflow-hidden"
              >
                <Image
                  src="https://www.zabit.com/_next/image?url=%2Fbusiness-images%2Fog2.png&w=1080&q=75" // Replace with your small image URL
                  alt="Small image 3"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Floating elements */}
              {/* <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">
                    Online now
                  </span>
                </div>
              </motion.div> */}

              {/* <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-zabit-primary text-white p-4 rounded-xl shadow-lg"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold">49%</div>
                  <div className="text-sm opacity-90">Improvement</div>
                </div>
              </motion.div> */}
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
              <h2 className="text-4xl lg:text-5xl font-bold text-zabit-dark leading-tight">
                AI check-ins, human accountability
              </h2>

              <p className="text-xl text-gray-700 leading-relaxed">
                By supplementing human teams with AI agents for daily adherence
                checkins and support, Averti Systems increases adherence by{" "}
                <span className="font-bold text-zabit-primary">
                  49 percentage points
                </span>{" "}
                across a variety of behaviors, including fitness, diet,
                substance cessation, and home care plans.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center gap-2 text-zabit-primary font-medium hover:gap-4 transition-all duration-300 cursor-pointer"
            >
              <span>Try it out as a user</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 pt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-zabit-primary mb-2">
                  24/7
                </div>
                <div className="text-sm text-gray-600">AI Monitoring</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-zabit-primary mb-2">
                  100%
                </div>
                <div className="text-sm text-gray-600">Population Reach</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
