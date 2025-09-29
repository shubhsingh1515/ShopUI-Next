// components/HelplineAssistant.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useVapi } from "../hooks/useVapi";
import { CallModal } from "./AgentCallModal";

interface Assistant {
  id: string;
  title: string;
  description: string;
  phone: string;
  icon: string;
  color: string;
  assistantId: string;
}

type CallStatus = "idle" | "connecting" | "connected" | "ended" | "error";

const assistants: Assistant[] = [
  {
    id: "health",
    title: "Health Assistant",
    description:
      "Get medical guidance and health support from our trained professionals",
    phone: "+19254387340",
    icon: "🏥",
    color: "from-green-500 to-emerald-600",
    assistantId: "4c87aacd-a82f-4b55-8547-ce12d5a35375",
  },
  {
    id: "finance",
    title: "Finance Assistant",
    description: "Financial counseling and support for your monetary concerns",
    phone: "+19253324637",
    icon: "💰",
    color: "from-blue-500 to-cyan-600",
    assistantId: "e7b493a9-d314-42eb-88c1-e68a26eae040",
  },
  {
    id: "suicide",
    title: "Suicide Support",
    description:
      "Immediate support for mental health emergencies and suicide situations",
    phone: "+17542037377",
    icon: "🆘",
    color: "from-red-500 to-pink-600",
    assistantId: "3a59dfa1-7e9f-44e3-a4f1-62dc00e6dfef",
  },
  {
    id: "danger",
    title: "Danger Assistance",
    description:
      "Emergency help and immediate response in case of danger or hazardous situations",
    phone: "+18001234567",
    icon: "🚨",
    color: "from-orange-300 to-red-600",
    assistantId: "060c1569-8dd6-4f33-92a4-5aae61e887a4",
  },
];

export default function HelplineAssistant(): JSX.Element {
  const [selectedAssistant, setSelectedAssistant] = useState<Assistant | null>(
    null
  );
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [callStatus, setCallStatus] = useState<CallStatus>("idle");
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [callDuration, setCallDuration] = useState<number>(0);
  const [assistantSpeaking, setAssistantSpeaking] = useState<boolean>(false);
  const [userSpeaking, setUserSpeaking] = useState<boolean>(false);
  const [callError, setCallError] = useState<string>("");
  const [volumeLevel, setVolumeLevel] = useState<number>(0);

  const callTimer = useRef<NodeJS.Timeout | null>(null);
  const assistantSpeechTimeout = useRef<NodeJS.Timeout | null>(null);

  // Use the VAPI hook
  const {
    deviceStatus,
    isVapiLoaded,
    permissionError,
    isInitializing,
    startCall,
    stopCall,
    toggleMute,
    retryInitialization,
    sendMessage,
  } = useVapi();

  const openPopup = (assistant: Assistant): void => {
    setSelectedAssistant(assistant);
    setIsPopupOpen(true);
    setCallStatus("idle");
    setCallDuration(0);
    setIsMuted(false);
    setAssistantSpeaking(false);
    setUserSpeaking(false);
    setCallError("");
    setVolumeLevel(0);
  };

  const closePopup = (): void => {
    if (callStatus === "connected" || callStatus === "connecting") {
      handleEndCall();
    }
    setIsPopupOpen(false);
    setSelectedAssistant(null);
    setCallStatus("idle");
    setCallDuration(0);
    setIsMuted(false);
    setAssistantSpeaking(false);
    setUserSpeaking(false);
    setCallError("");
    setVolumeLevel(0);
    stopCallTimer();
  };

  const startCallTimer = (): void => {
    stopCallTimer();
    callTimer.current = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
  };

  const stopCallTimer = (): void => {
    if (callTimer.current) {
      clearInterval(callTimer.current);
      callTimer.current = null;
    }
  };

  const handleWebCall = async (assistant: Assistant): Promise<void> => {
    console.log("Starting web call with VAPI...");
    setCallStatus("connecting");
    setCallError("");

    const success = await startCall(assistant.assistantId, {
      onCallStart: () => {
        console.log("Web call connected successfully");
        setCallStatus("connected");
        startCallTimer();
      },
      onCallEnd: () => {
        console.log("Web call ended");
        setCallStatus("ended");
        setAssistantSpeaking(false);
        setUserSpeaking(false);
        stopCallTimer();
      },
      onSpeechStart: () => {
        console.log("User started speaking");
        setUserSpeaking(true);
      },
      onSpeechEnd: () => {
        console.log("User stopped speaking");
        setUserSpeaking(false);
      },
      onMessage: (message: any) => {
        console.log("Message received:", message);

        // Handle transcript messages for assistant speech
        if (message.type === "transcript") {
          if (message.role === "assistant") {
            if (message.transcriptType === "partial") {
              // Assistant is speaking
              setAssistantSpeaking(true);

              // Clear any existing timeout
              if (assistantSpeechTimeout.current) {
                clearTimeout(assistantSpeechTimeout.current);
              }
            } else if (message.transcriptType === "final") {
              // Assistant finished speaking - wait a bit before clearing
              if (assistantSpeechTimeout.current) {
                clearTimeout(assistantSpeechTimeout.current);
              }
              assistantSpeechTimeout.current = setTimeout(() => {
                setAssistantSpeaking(false);
              }, 500);
            }
          }
        }

        // Handle function calls or other message types as needed
        if (message.type === "function-call") {
          console.log("Function call:", message);
        }
      },
      onVolumeLevel: (volume: number) => {
        setVolumeLevel(volume);

        // Use volume level as backup indicator for assistant speech
        if (volume > 0.1) {
          setAssistantSpeaking(true);

          if (assistantSpeechTimeout.current) {
            clearTimeout(assistantSpeechTimeout.current);
          }
          assistantSpeechTimeout.current = setTimeout(() => {
            setAssistantSpeaking(false);
          }, 1000);
        }
      },
      onError: (error: any) => {
        console.error("Web call error:", error);
        setCallStatus("error");
        setAssistantSpeaking(false);
        setUserSpeaking(false);
        stopCallTimer();

        let errorMessage = "Web call failed. ";
        if (error?.message) {
          errorMessage += error.message;
        } else if (error?.error?.message) {
          errorMessage += error.error.message;
        } else {
          errorMessage += "Please try the phone number instead.";
        }

        setCallError(errorMessage);
      },
    });

    if (!success) {
      setCallStatus("error");
      setCallError("Failed to start web call. Please try the phone number.");
    }
  };

  const handlePhoneCall = (assistant: Assistant): void => {
    console.log("Falling back to phone call");
    const phoneUrl = `tel:${assistant.phone}`;

    // Show confirmation before redirecting
    const userConfirmed = window.confirm(
      `This will call ${assistant.phone} to connect you with the ${assistant.title}.\n\nClick OK to continue.`
    );

    if (userConfirmed) {
      try {
        window.location.href = phoneUrl;
        setCallStatus("connecting");

        // Reset status after a delay
        setTimeout(() => {
          setCallStatus("idle");
        }, 3000);
      } catch (error) {
        console.error("Phone call initiation failed:", error);
        alert(
          `Please call ${assistant.phone} directly to speak with the ${assistant.title}.`
        );
      }
    }
  };

  const handleCall = async (assistant: Assistant): Promise<void> => {
    // Always try web call first if VAPI is available
    if (isVapiLoaded && deviceStatus === "ready") {
      await handleWebCall(assistant);
    } else {
      handlePhoneCall(assistant);
    }
  };

  const handleEndCall = async (): Promise<void> => {
    try {
      await stopCall();
    } catch (error) {
      console.error("Error ending call:", error);
    } finally {
      setCallStatus("ended");
      setAssistantSpeaking(false);
      setUserSpeaking(false);
      stopCallTimer();

      // Clear speech timeout
      if (assistantSpeechTimeout.current) {
        clearTimeout(assistantSpeechTimeout.current);
        assistantSpeechTimeout.current = null;
      }

      // Auto-close after 2 seconds
      setTimeout(() => {
        if (callStatus === "ended") {
          closePopup();
        }
      }, 2000);
    }
  };

  const handleToggleMute = (): void => {
    const newMutedState = !isMuted;
    toggleMute(newMutedState);
    setIsMuted(newMutedState);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCallTimer();
      if (assistantSpeechTimeout.current) {
        clearTimeout(assistantSpeechTimeout.current);
      }
    };
  }, []);

  return (
    <section className="bg-gray-200 py-20 rounded-xl ml-4 mr-4 mt-40 md:ml-10 md:mr-10 md:mt-[-80px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                Get help now.{" "}
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  We're here for you.
                </span>
              </h2>

              <p className="text-xl text-gray-700 leading-relaxed">
                Our AI-powered helpline assistants provide{" "}
                <span className="font-semibold border-b-2 border-blue-500">
                  24/7 immediate support.
                </span>{" "}
                You don’t have to go through this alone. If you are struggling
                today, need support with your mental health, or have experienced
                a traumatic event, consider contacting a helpline. It’s free,
                anonymous and confidential.
              </p>
            </div>

            {/* Device Status */}
            <div
              className={`p-4 rounded-xl ${
                deviceStatus === "ready"
                  ? "bg-green-50 border border-green-200"
                  : deviceStatus === "error"
                  ? "bg-red-50 border border-red-200"
                  : "bg-yellow-50 border border-yellow-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    deviceStatus === "ready"
                      ? "bg-green-500"
                      : deviceStatus === "error"
                      ? "bg-red-500"
                      : "bg-yellow-500 animate-pulse"
                  }`}
                ></div>
                <div className="flex-1">
                  <span
                    className={`font-medium block ${
                      deviceStatus === "ready"
                        ? "text-green-800"
                        : deviceStatus === "error"
                        ? "text-red-800"
                        : "text-yellow-800"
                    }`}
                  >
                    {isInitializing
                      ? "🔄 Initializing voice system..."
                      : deviceStatus === "ready"
                      ? isVapiLoaded
                        ? "🎤 Web Calls Ready - Click to start voice chat"
                        : "📞 Phone Calls Ready - Click to call directly"
                      : deviceStatus === "error"
                      ? "❌ Microphone access required"
                      : "⏳ Checking system..."}
                  </span>

                  {deviceStatus === "error" && (
                    <div className="mt-2 space-y-2">
                      <button
                        onClick={retryInitialization}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                      >
                        🔄 Retry Microphone Access
                      </button>
                      {permissionError && (
                        <p className="text-xs text-red-600 mt-1">
                          {permissionError}
                        </p>
                      )}
                    </div>
                  )}

                  {deviceStatus === "ready" && !isVapiLoaded && (
                    <p className="text-xs text-green-600 mt-1">
                      Voice chat not available, but you can call directly.
                      Clicking "START CALL" will open your phone app.
                    </p>
                  )}

                  {deviceStatus === "ready" && isVapiLoaded && (
                    <p className="text-xs text-green-600 mt-1">
                      ✅ Voice chat enabled! You can talk directly through your
                      browser.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="space-y-4">
              {[
                "Available 24/7 for immediate assistance",
                "Trained AI assistants for specialized support",
                "Confidential and secure conversations",
                "Instant connection with just one click",
              ].map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Assistant Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Talk with Assistant:
              </h3>

              <div className="space-y-4">
                {assistants.map((assistant, index) => (
                  <motion.div
                    key={assistant.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => openPopup(assistant)}
                      disabled={deviceStatus === "error" || isInitializing}
                      className={`w-full p-6 rounded-2xl bg-gradient-to-r ${
                        assistant.color
                      } text-white hover:shadow-2xl transition-all duration-300 hover:scale-105 transform group relative overflow-hidden ${
                        deviceStatus === "error" || isInitializing
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {/* Pulsing background effect */}
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

                      <div className="flex items-center gap-4 relative z-10">
                        <div className="text-4xl">{assistant.icon}</div>
                        <div className="text-left flex-1">
                          <h4 className="text-xl font-bold mb-1">
                            {assistant.title}
                          </h4>
                          <p className="text-sm opacity-90">
                            {assistant.description}
                          </p>
                        </div>

                        {/* Blinking Call Now Button */}
                        <div className="relative">
                          <div className="absolute inset-0 bg-white rounded-full opacity-60 animate-ping"></div>
                          <div className="relative bg-white text-gray-900 font-bold px-3 py-2 rounded-full shadow-lg flex items-center gap-2 group-hover:scale-110 transition-transform duration-300">
                            <span className="text-sm whitespace-nowrap">
                              📞 CALL NOW
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Call Modal */}
      <AnimatePresence>
        {isPopupOpen && selectedAssistant && (
          <CallModal
            isOpen={isPopupOpen}
            onClose={closePopup}
            selectedAssistant={selectedAssistant}
            callStatus={callStatus}
            isCallActive={callStatus === "connected"}
            isConnecting={callStatus === "connecting"}
            isMuted={isMuted}
            callDuration={callDuration}
            assistantSpeaking={assistantSpeaking}
            userSpeaking={userSpeaking}
            isVapiLoaded={isVapiLoaded}
            deviceStatus={deviceStatus}
            callError={callError}
            onCall={handleCall}
            onEndCall={handleEndCall}
            onToggleMute={handleToggleMute}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
