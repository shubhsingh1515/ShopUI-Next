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

  // Circular motion path with radius and angle from scroll progress
  const angle = useTransform(scrollYProgress, [0, 1], [0, 2 * Math.PI]);

  const radius1 = 80;
  const radius2 = 80;
  const radius3 = 80;

  const x1 = useTransform(angle, (a) => radius1 * Math.cos(a));
  const y1 = useTransform(angle, (a) => radius1 * Math.sin(a));

  const x2 = useTransform(angle, (a) => radius2 * Math.cos(a + Math.PI / 2));
  const y2 = useTransform(angle, (a) => radius2 * Math.sin(a + Math.PI / 2));

  const x3 = useTransform(angle, (a) => radius3 * Math.cos(a + Math.PI));
  const y3 = useTransform(angle, (a) => radius3 * Math.sin(a + Math.PI));

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
        ></motion.div>

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
          {/* Left Image with circular motion elements */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative "
          >
            <div className="relative ">
              {/* Main image */}
              <Image
                src="https://www.zabit.com/_next/image?url=%2Fbusiness-images%2Fwoman.png&w=3840&q=75"
                alt="Main Woman Image"
                width={600}
                height={600}
                className="w-full h-auto rounded-2xl z-99999"
              />

              {/* Small image 1 */}
              <motion.div
                style={{ x: x1, y: y1 }}
                className="absolute top-1/2 left-1/2 w-32 h-32 rounded-lg shadow-lg overflow-hidden opacity-40 -translate-x-1/2 -translate-y-1/2 ml-[-16rem] mt-[-5rem]"
              >
                <Image
                  src="https://www.zabit.com/_next/image?url=%2Fbusiness-images%2Fcouple.png&w=1080&q=75"
                  alt="Small image 1"
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Small image 2 */}
              <motion.div
                style={{ x: x2, y: y2 }}
                className="absolute top-1/2 left-1/2 w-28 h-28 rounded-lg shadow-lg overflow-hidden opacity-40 -translate-x-1/2 -translate-y-1/2 ml-[-12rem] mt-[-5rem]"
              >
                <Image
                  src="https://www.zabit.com/_next/image?url=%2Fbusiness-images%2Fdoctor.png&w=1080&q=75"
                  alt="Small image 2"
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Small image 3 */}
              <motion.div
                style={{ x: x3, y: y3 }}
                className="absolute top-1/2 left-1/2 w-24 h-24 rounded-lg shadow-lg overflow-hidden opacity-40 -translate-x-1/2 -translate-y-1/2 ml-[-14rem] mt-[-5rem] "
              >
                <Image
                  src="https://www.zabit.com/_next/image?url=%2Fbusiness-images%2Fog2.png&w=1080&q=75"
                  alt="Small image 3"
                  width={124}
                  height={124}
                  className="w-full h-full object-cover"
                />
              </motion.div>
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
                Support when you need it most
              </h2>

              <p className="text-xl text-gray-700 leading-relaxed">
                Our platform combines{" "}
                <span className="font-bold text-zabit-primary">
                  AI assistance
                </span>{" "}
                and{" "}
                <span className="font-bold text-zabit-primary">human care</span>{" "}
                to provide trusted guidance in{" "}
                <span className="font-semibold border-b-2 border-zabit-primary">
                  health
                </span>
                ,{" "}
                <span className="font-semibold border-b-2 border-zabit-primary">
                  finance
                </span>
                ,{" "}
                <span className="font-semibold border-b-2 border-zabit-primary">
                  suicide prevention
                </span>
                , and{" "}
                <span className="font-semibold border-b-2 border-zabit-primary">
                  danger situations
                </span>
                . Get reliable support and immediate help, anytime you need it.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center gap-2 text-zabit-primary font-medium hover:gap-4 transition-all duration-300 cursor-pointer"
            >
              <span>Get started now</span>
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
          </motion.div>
        </div>
      </div>
      <div className="mt-[-15rem] text-center idden md:block">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 20 1440 320">
          <path
            fill="#e5e7eb"
            fillOpacity="1"
            d="M0,192L1440,288L1440,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
