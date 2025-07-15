"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/outline";

const steps = [
  {
    number: 1,
    title: "Define a Support Circle",
    description:
      "Define the team who will be supporting each client on their journey, such as care team members, family members, and AI agents.",
    features: [
      "Staff provide trusted expertise and counsel",
      "Family members provide support and accountability",
      "AI agents provide 24/7 monitoring and assistance",
    ],
    image: "https://ext.same-assets.com/3529801980/1660918473.svg",
    avatars: [
      {
        src: "https://ext.same-assets.com/3529801980/2499113889.png",
        color: "bg-zabit-primary",
      },
      {
        src: "https://www.zabit.com/_next/image?url=%2Fbusiness-images%2Ff1.png&w=256&q=75",
        color: "bg-zabit-primary",
      },
      {
        src: "data:image/png;base64,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",
        color: "bg-blue-500",
      },
      {
        src: "data:image/png;base64,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",
        color: "bg-purple-500",
      },
      { icon: "AI", color: "bg-purple-500" },
    ],
  },
  {
    number: 2,
    title: "Create a Plan",
    description:
      "Zabit imports a habit goal or home care plan using AI and breaks it down into a smart schedule for reminders and support.",
    features: [
      "AI parses clinical care plans automatically",
      "Schedules are customized for each patient",
      "Intelligent reminders adapt to client habits",
    ],
    schedule: {
      title: "My Daily Schedule",
      items: [
        { time: "9am", task: "Walk for 30 minutes", color: "bg-green-500" },
        { time: "12pm", task: "Take medication", color: "bg-zabit-primary" },
      ],
    },
    note: "Home Care plan\ndaily walk\n200mg qd",
  },
  {
    number: 3,
    title: "Coordinate Everyday Adherence",
    description:
      "Zabit uses ongoing multi-channel communication to help each client adhere to their care plan, leveraging the Support Circle to provide nudges, praise, and accountability.",
    features: [
      "Coordinates communications among all team members",
      "Builds accountability through social reinforcement",
    ],
    messages: [
      {
        from: "AI Agent",
        message: "Robert hasn't reported his meds today, give him a nudge!",
        color: "bg-purple-500",
      },
      {
        from: "Family",
        message: "Dad, reminder to take your meds today! ❤️",
        color: "bg-blue-500",
      },
      { from: "Dad", message: "I took my meds 💊", color: "bg-gray-500" },
    ],
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gradient-to-b from-green-100 to-gray-200 py-20 ml-6 mr-6 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-zabit-dark mb-6">
            How Averti Systems Works
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Averti Systems is the first platform for{" "}
            <span className="font-semibold border-b-2 border-zabit-primary">
              collaborative
            </span>{" "}
            care plan adherence, empowering patients with a support system that
            works together.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative"
            >
              <div
                className={`grid lg:grid-cols-2 gap-16 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Content */}
                <div
                  className={`space-y-8 ${
                    index % 2 === 1 ? "lg:col-start-2" : ""
                  }`}
                >
                 <div className="space-y-6">
  <div className="flex items-center gap-4">
    {/* SVG container wrapping number */}
    <div className="relative w-12 h-12 flex items-center justify-center">
      {/* The SVG behind the number */}
      <svg
        className="absolute inset-0 w-full h-full overflow-visible text-teal-500"
        viewBox="0 0 48 48"
        preserveAspectRatio="none"
        style={{ transform: "rotate(-15deg)", opacity: 1 }}
      >
        <path
          d="M24,5 C35,5 43,13 43,24 C43,35 35,43 24,43 C13,43 5,35 5,24 C5,13 13,5 21,3 C27,2 30,1 32,3"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength="1"
          strokeDashoffset="0px"
          strokeDasharray="1px 1px"
        ></path>
      </svg>

      {/* The number displayed above the SVG */}
      <span className="relative z-10 text-xl font-bold text-zabit-dark">
        {step.number}
      </span>
    </div>

    {/* Step title */}
    <h3 className="text-3xl lg:text-4xl font-bold text-zabit-dark">
      {step.title}
    </h3>
  </div>

  {/* Step description */}
  <p className="text-lg text-gray-700 leading-relaxed">
    {step.description}
  </p>
</div>


                  <div className="space-y-4">
                    {step.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.6,
                          delay: 0.3 + featureIndex * 0.1,
                        }}
                        className="flex items-center gap-3"
                      >
                        <CheckIcon className="w-5 h-5 text-zabit-primary flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Visual */}
                <div className={`${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                  {step.number === 1 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="relative"
                    >
                      <div className="w-64 h-64 mx-auto relative">
                        {/* Dashed Circle */}
                        <div className="absolute inset-0 border-2 border-dashed border-teal-400 rounded-full z-0"></div>

                        {/* Rotating Orbit */}
                        <div className="absolute inset-0 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                          <div className="relative w-full h-full">
                            {step.avatars?.slice(0, 3).map((avatar, index) => {
                              const angle = (index * 360) / 3; // 0, 120, 240 degrees
                              const radius = 130;
                              const x =
                                radius * Math.cos((angle * Math.PI) / 180);
                              const y =
                                radius * Math.sin((angle * Math.PI) / 180);

                              return (
                                <div
                                  key={index}
                                  className="absolute"
                                  style={{
                                    left: `calc(50% + ${x}px - 28px)`, // 28px = half of avatar size
                                    top: `calc(50% + ${y}px - 28px)`,
                                  }}
                                >
                                  <div
                                    className={`w-14 h-14 ${avatar.color} rounded-full p-[2px] shadow-xl`}
                                  >
                                    {avatar.src ? (
                                      <Image
                                        src={avatar.src}
                                        alt="Avatar"
                                        width={56}
                                        height={56}
                                        className="w-full h-full rounded-full object-cover"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center text-white font-bold text-sm">
                                        {avatar.icon}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Center Avatar */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                          <div className="w-20 h-20 bg-pink-500 rounded-full overflow-hidden shadow-lg">
                            <Image
                              src="https://www.zabit.com/_next/image?url=%2Fbusiness-images%2Fm1_t.png&w=640&q=75"
                              alt="Center Avatar"
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step.number === 2 && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Schedule Card */}
                      <div className="bg-white border-2 border-zabit-primary rounded-xl p-6 shadow-lg max-w-sm">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 bg-zabit-primary rounded-lg"></div>
                          <h4 className="font-bold text-zabit-dark">
                            {step.schedule?.title}
                          </h4>
                        </div>
                        <div className="space-y-3">
                          {step.schedule?.items.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="flex items-center gap-3"
                            >
                              <div
                                className={`w-3 h-3 ${item.color} rounded-full`}
                              ></div>
                              <span className="text-sm text-gray-700">
                                {item.task}
                              </span>
                              <span className="ml-auto text-sm font-medium text-zabit-primary">
                                {item.time}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Sticky Note */}
                      <motion.div
                        initial={{ opacity: 0, rotate: -5 }}
                        whileInView={{ opacity: 1, rotate: -5 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="bg-yellow-200 p-4 rounded-lg shadow-lg transform -rotate-3 w-40"
                      >
                        <p className="text-sm text-gray-800 whitespace-pre-line font-handwriting">
                          {step.note}
                        </p>
                      </motion.div>
                    </motion.div>
                  )}

                  {step.number === 3 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="space-y-4 max-w-md"
                    >
                      {step.messages?.map((message, messageIndex) => (
                        <motion.div
                          key={messageIndex}
                          initial={{
                            opacity: 0,
                            x: messageIndex % 2 === 0 ? -20 : 20,
                          }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.6,
                            delay: 0.5 + messageIndex * 0.2,
                          }}
                          className={`flex items-start gap-2 ${
                            messageIndex % 2 === 0 ? "" : "flex-row-reverse"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 ${message.color} rounded-full flex items-center justify-center flex-shrink-0`}
                          >
                            <span className="text-white text-xs font-bold">
                              {message.from === "AI Agent"
                                ? "AI"
                                : message.from === "Family"
                                ? "F"
                                : "D"}
                            </span>
                          </div>
                          <div
                            className={`bg-gray-100 rounded-lg p-3 max-w-xs ${
                              messageIndex % 2 === 0
                                ? "rounded-tl-none"
                                : "rounded-tr-none"
                            }`}
                          >
                            <p className="text-xs text-gray-600 mb-1">
                              {message.from}
                            </p>
                            <p className="text-sm text-gray-800">
                              {message.message}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Step connector */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2 w-px h-24 bg-gradient-to-b from-zabit-primary to-transparent"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
