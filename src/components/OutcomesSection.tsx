"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckIcon,
  XMarkIcon,
  PhoneIcon,
  MicrophoneIcon,
  SpeakerWaveIcon,
  PhoneXMarkIcon,
} from "@heroicons/react/24/outline";

// TypeScript interfaces
interface Assistant {
  id: string;
  title: string;
  description: string;
  phone: string;
  icon: string;
  color: string;
  assistantId: string;
}

interface VapiInstance {
  start: (assistantId: string, config?: any) => Promise<void>;
  stop: () => void;
  setMuted: (muted: boolean) => void;
  on: (event: string, callback: (data?: any) => void) => void;
  off: (event: string, callback?: (data?: any) => void) => void;
}

declare global {
  interface Window {
    Vapi: new (publicKey: string) => VapiInstance;
  }
}

type CallStatus = "idle" | "connecting" | "connected" | "ended" | "error";
type DeviceStatus = "checking" | "ready" | "error";

// VAPI Configuration
const VAPI_PUBLIC_KEY = "ef995cfe-0f6b-41a2-bb15-8ff165065b49";

// Assistant configurations
const assistants: Assistant[] = [
  {
    id: "health",
    title: "Health Assistant",
    description:
      "Get medical guidance and health support from our trained professionals",
    phone: "+19254387340",
    icon: "🏥",
    color: "from-green-500 to-emerald-600",
    assistantId: "c8d5badb-c337-4cf4-a9c2-9c30f3d69688",
  },
  {
    id: "finance",
    title: "Finance Assistant",
    description: "Financial counseling and support for your monetary concerns",
    phone: "+19253324637",
    icon: "💰",
    color: "from-blue-500 to-cyan-600",
    assistantId: "2bd13461-39bc-4c86-87a5-6a8f42feff73",
  },
  {
    id: "suicide",
    title: "Suicide Support",
    description:
      "Immediate support for mental health emergencies and suicide situations",
    phone: "+17542037377",
    icon: "🆘",
    color: "from-red-500 to-pink-600",
    assistantId: "a4e6d8e5-cb4a-4933-96ad-9ef99d735ac3",
  },
];

export default function HelplineAssistant(): JSX.Element {
  const [selectedAssistant, setSelectedAssistant] = useState<Assistant | null>(
    null
  );
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isCallActive, setIsCallActive] = useState<boolean>(false);
  const [callStatus, setCallStatus] = useState<CallStatus>("idle");
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [vapiInstance, setVapiInstance] = useState<VapiInstance | null>(null);
  const [callDuration, setCallDuration] = useState<number>(0);
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus>("checking");
  const [isVapiLoaded, setIsVapiLoaded] = useState<boolean>(false);
  const [assistantSpeaking, setAssistantSpeaking] = useState<boolean>(false);
  const [userSpeaking, setUserSpeaking] = useState<boolean>(false);
  const [permissionError, setPermissionError] = useState<string>("");
  const callTimer = useRef<NodeJS.Timeout | null>(null);
  const eventListeners = useRef<Map<string, (data?: any) => void>>(new Map());

  // Request microphone permission function
  const requestMicrophonePermission = async (): Promise<boolean> => {
    try {
      setDeviceStatus("checking");
      setPermissionError("");

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      // Stop the stream immediately
      stream.getTracks().forEach((track) => track.stop());
      console.log("Microphone permission granted");
      return true;
    } catch (error: any) {
      console.error("Permission request failed:", error);
      let errorMessage = "Microphone access denied.";

      if (error.name === "NotAllowedError") {
        errorMessage =
          'Please click the microphone icon in your browser\'s address bar and select "Allow".';
      } else if (error.name === "NotFoundError") {
        errorMessage =
          "No microphone found. Please connect a microphone and try again.";
      } else if (error.name === "NotReadableError") {
        errorMessage =
          "Microphone is being used by another application. Please close other apps and try again.";
      } else if (error.name === "NotSupportedError") {
        errorMessage =
          "Your browser doesn't support microphone access. Please use Chrome, Firefox, or Safari.";
      }

      setPermissionError(errorMessage);
      setDeviceStatus("error");
      return false;
    }
  };

  // Initialize VAPI
  const initializeVapi = async (): Promise<void> => {
    try {
      console.log("Initializing VAPI...");

      if (!window.Vapi) {
        throw new Error("VAPI not loaded");
      }

      // Request microphone permissions first
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        return;
      }

      // Create VAPI instance after getting microphone permission
      const vapi = new window.Vapi(VAPI_PUBLIC_KEY);
      console.log("VAPI instance created");

      setVapiInstance(vapi);
      setIsVapiLoaded(true);
      setDeviceStatus("ready");

      console.log("VAPI initialization completed successfully");
    } catch (error) {
      console.error("Failed to initialize VAPI:", error);
      setPermissionError(
        "Failed to initialize voice system. Please refresh the page."
      );
      setDeviceStatus("error");
    }
  };

  // Initialize system - with fallback to phone calling
  useEffect(() => {
    const initializeSystem = async (): Promise<void> => {
      try {
        // Check if running in secure context (HTTPS or localhost)
        if (typeof window !== "undefined" && !window.isSecureContext) {
          console.warn("Not in secure context, enabling phone fallback mode");
          setDeviceStatus("ready"); // Enable phone calling mode
          setIsVapiLoaded(false);
          return;
        }

        // Try to get microphone permission first
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          stream.getTracks().forEach((track) => track.stop());
          console.log("Microphone permission granted");
        } catch (error) {
          console.warn(
            "Microphone not available, enabling phone fallback mode"
          );
          setDeviceStatus("ready"); // Enable phone calling mode
          setIsVapiLoaded(false);
          return;
        }

        // Try to load VAPI SDK
        console.log("Attempting to load VAPI SDK...");

        const loadScript = (src: string): Promise<void> => {
          return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = src;
            script.async = true;

            const cleanup = () => {
              if (script.parentNode) {
                script.parentNode.removeChild(script);
              }
            };

            script.onload = () => {
              console.log(`VAPI script loaded from: ${src}`);
              resolve();
            };

            script.onerror = () => {
              cleanup();
              reject(new Error(`Failed to load from ${src}`));
            };

            document.head.appendChild(script);

            // Timeout after 8 seconds
            setTimeout(() => {
              cleanup();
              reject(new Error("Script load timeout"));
            }, 8000);
          });
        };

        // Try loading VAPI from different CDNs
        const vapiUrls = [
          "https://cdn.jsdelivr.net/npm/@vapi-ai/web@latest/dist/index.js",
          "https://unpkg.com/@vapi-ai/web@latest/dist/index.js",
          "https://cdn.skypack.dev/@vapi-ai/web@latest",
        ];

        let vapiLoaded = false;

        for (const url of vapiUrls) {
          try {
            await loadScript(url);
            if (window.Vapi) {
              await initializeVapi();
              vapiLoaded = true;
              break;
            }
          } catch (error) {
            console.warn(`Failed to load VAPI from ${url}:`, error);
          }
        }

        // If VAPI didn't load, fall back to phone calling
        if (!vapiLoaded) {
          console.log("VAPI SDK not available, enabling phone fallback mode");
          setDeviceStatus("ready");
          setIsVapiLoaded(false);
          setPermissionError("");
        }
      } catch (error) {
        console.error("System initialization failed:", error);
        // Still enable phone fallback
        setDeviceStatus("ready");
        setIsVapiLoaded(false);
        setPermissionError("");
      }
    };

    // Start initialization after a short delay
    const timer = setTimeout(initializeSystem, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const openPopup = (assistant: Assistant): void => {
    setSelectedAssistant(assistant);
    setIsPopupOpen(true);
    setCallStatus("idle");
    setCallDuration(0);
    setIsMuted(false);
    setAssistantSpeaking(false);
    setUserSpeaking(false);
  };

  const closePopup = (): void => {
    if (isCallActive && vapiInstance) {
      handleEndCall();
    }
    setIsPopupOpen(false);
    setSelectedAssistant(null);
    setIsConnecting(false);
    setIsCallActive(false);
    setCallStatus("idle");
    setCallDuration(0);
    setIsMuted(false);
    setAssistantSpeaking(false);
    setUserSpeaking(false);
    if (callTimer.current) {
      clearInterval(callTimer.current);
    }
  };

  const startCallTimer = (): void => {
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

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const setupEventListeners = (vapi: VapiInstance): void => {
    // Clear existing listeners
    eventListeners.current.forEach((callback, event) => {
      vapi.off(event, callback);
    });
    eventListeners.current.clear();

    // Call start event
    const onCallStart = () => {
      console.log("Call started successfully");
      setIsConnecting(false);
      setIsCallActive(true);
      setCallStatus("connected");
      startCallTimer();
    };

    // Call end event
    const onCallEnd = () => {
      console.log("Call ended");
      setIsCallActive(false);
      setCallStatus("ended");
      setAssistantSpeaking(false);
      setUserSpeaking(false);
      stopCallTimer();
    };

    // Speech events
    const onSpeechStart = () => {
      console.log("User started speaking");
      setUserSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("User stopped speaking");
      setUserSpeaking(false);
    };

    // Error event
    const onError = (error: any) => {
      console.error("VAPI Call error:", error);
      setIsConnecting(false);
      setIsCallActive(false);
      setCallStatus("error");
      setAssistantSpeaking(false);
      setUserSpeaking(false);
      stopCallTimer();

      let errorMessage = "Call failed. Please try again.";
      if (error?.error?.message) {
        errorMessage = error.error.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }
      alert(`Error: ${errorMessage}`);
    };

    // Register event listeners
    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    // Store listeners for cleanup
    eventListeners.current.set("call-start", onCallStart);
    eventListeners.current.set("call-end", onCallEnd);
    eventListeners.current.set("speech-start", onSpeechStart);
    eventListeners.current.set("speech-end", onSpeechEnd);
    eventListeners.current.set("error", onError);
  };

  const handleCall = async (assistant: Assistant): Promise<void> => {
    // Check if VAPI is available for web calls
    if (deviceStatus === "ready" && isVapiLoaded && vapiInstance) {
      // Use VAPI for web-based calling
      setIsConnecting(true);
      setCallStatus("connecting");

      try {
        // Setup event listeners
        setupEventListeners(vapiInstance);

        // Start the call with just the assistant ID
        await vapiInstance.start(assistant.assistantId);
      } catch (error: any) {
        console.error("Failed to initiate VAPI call:", error);
        setIsConnecting(false);
        setCallStatus("error");

        let errorMessage =
          "Web call failed. Please try calling the phone number directly.";
        if (error?.message) {
          errorMessage = error.message;
        }
        alert(errorMessage);
      }
    } else {
      // Fall back to phone calling
      handlePhoneCall(assistant);
    }
  };

  const handlePhoneCall = (assistant: Assistant): void => {
    // Create a phone call link
    const phoneUrl = `tel:${assistant.phone}`;

    // Try to open the phone app
    try {
      window.location.href = phoneUrl;

      // Show a message to the user
      setCallStatus("connecting");
      setTimeout(() => {
        alert(
          `Please call ${assistant.phone} to speak with the ${assistant.title}.\n\nThe call should open in your phone app automatically.`
        );
        setCallStatus("idle");
      }, 1000);
    } catch (error) {
      console.error("Failed to initiate phone call:", error);
      alert(
        `Please call ${assistant.phone} directly to speak with the ${assistant.title}.`
      );
    }
  };

  const handleEndCall = (): void => {
    try {
      if (vapiInstance && isCallActive) {
        vapiInstance.stop();
      }
    } catch (error) {
      console.error("Error ending call:", error);
    } finally {
      setIsCallActive(false);
      setCallStatus("ended");
      setAssistantSpeaking(false);
      setUserSpeaking(false);
      stopCallTimer();
    }
  };

  const toggleMute = (): void => {
    try {
      if (vapiInstance && isCallActive) {
        vapiInstance.setMuted(!isMuted);
        setIsMuted(!isMuted);
      }
    } catch (error) {
      console.error("Error toggling mute:", error);
    }
  };

  // Manual retry function
  const retryInitialization = async (): Promise<void> => {
    setDeviceStatus("checking");
    setPermissionError("");

    // Try to initialize again
    if (window.Vapi) {
      await initializeVapi();
    } else {
      // Reload the page as last resort
      window.location.reload();
    }
  };

  // Cleanup event listeners on unmount
  useEffect(() => {
    return () => {
      if (vapiInstance) {
        eventListeners.current.forEach((callback, event) => {
          vapiInstance.off(event, callback);
        });
      }
      if (callTimer.current) {
        clearInterval(callTimer.current);
      }
    };
  }, [vapiInstance]);

  return (
    <section
      className=" to-gray-100 py-20 rounded-xl ml-10 mr-10 mt-[-80px]"
      style={{ backgroundColor: "#e5e7eb" }}
    >
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
                  24/7 immediate support
                </span>{" "}
                for health, financial, and suicide situations.
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
                    {deviceStatus === "ready"
                      ? isVapiLoaded
                        ? "🎤 Web Calls Ready - Voice chat available"
                        : "📞 Phone Calls Ready - Tap to call"
                      : deviceStatus === "error"
                      ? "❌ Setup Required"
                      : "⏳ Setting up calling system..."}
                  </span>
                  {deviceStatus === "error" && (
                    <div className="mt-2 space-y-2">
                      <button
                        onClick={retryInitialization}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
                      >
                        🔄 Try Again
                      </button>
                      <p className="text-xs text-red-600">
                        {permissionError ||
                          "Failed to initialize calling system."}
                      </p>
                    </div>
                  )}
                  {deviceStatus === "ready" && !isVapiLoaded && (
                    <p className="text-xs text-green-600 mt-1">
                      Voice chat unavailable, but phone calling is ready.
                      Clicking "START CALL" will open your phone app.
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
                Choose Your Assistant:
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
                      disabled={deviceStatus !== "ready"}
                      className={`w-full p-6 rounded-2xl bg-gradient-to-r ${
                        assistant.color
                      } text-white hover:shadow-2xl transition-all duration-300 hover:scale-105 transform group ${
                        deviceStatus !== "ready"
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{assistant.icon}</div>
                        <div className="text-left flex-1">
                          <h4 className="text-xl font-bold mb-1">
                            {assistant.title}
                          </h4>
                          <p className="text-sm opacity-90">
                            {assistant.description}
                          </p>
                        </div>
                        <div className="text-2xl group-hover:translate-x-1 transition-transform duration-300">
                          →
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

      {/* Popup Modal */}
      <AnimatePresence>
        {isPopupOpen && selectedAssistant && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={!isCallActive ? closePopup : undefined}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              {!isCallActive && (
                <button
                  onClick={closePopup}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <XMarkIcon className="w-6 h-6 text-gray-500" />
                </button>
              )}

              {/* Content */}
              <div className="text-center space-y-6">
                <div
                  className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${
                    selectedAssistant.color
                  } flex items-center justify-center text-4xl ${
                    isCallActive ? "animate-pulse" : ""
                  } ${
                    assistantSpeaking
                      ? "ring-4 ring-blue-400 ring-opacity-75"
                      : ""
                  }`}
                >
                  {selectedAssistant.icon}
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {selectedAssistant.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {selectedAssistant.description}
                  </p>
                </div>

                {/* Call Status */}
                {callStatus !== "idle" && (
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Call Status:</span>
                      <span
                        className={`text-sm font-bold ${
                          callStatus === "connecting"
                            ? "text-yellow-600"
                            : callStatus === "connected"
                            ? "text-green-600"
                            : callStatus === "ended"
                            ? "text-blue-600"
                            : "text-red-600"
                        }`}
                      >
                        {callStatus === "connecting" && "⏳ Connecting..."}
                        {callStatus === "connected" && "✅ Connected"}
                        {callStatus === "ended" && "📞 Call Ended"}
                        {callStatus === "error" && "❌ Call Failed"}
                      </span>
                    </div>
                    {isCallActive && (
                      <div className="space-y-2">
                        <div className="text-lg font-mono font-bold text-blue-600">
                          {formatDuration(callDuration)}
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span
                            className={`${
                              userSpeaking
                                ? "text-green-600 font-bold"
                                : "text-gray-400"
                            }`}
                          >
                            {userSpeaking ? "🎤 You are speaking" : "🎤 You"}
                          </span>
                          <span
                            className={`${
                              assistantSpeaking
                                ? "text-blue-600 font-bold"
                                : "text-gray-400"
                            }`}
                          >
                            {assistantSpeaking
                              ? "🤖 Assistant speaking"
                              : "🤖 Assistant"}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Service Info */}
                {!isCallActive && (
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">
                        Available 24/7
                      </span>
                      <span className="text-sm text-gray-500">
                        Free Service
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {isVapiLoaded
                        ? 'Click "START CALL" to begin talking with our AI assistant through your browser.'
                        : 'Click "START CALL" to dial the helpline number and speak with our AI assistant.'}
                    </p>
                  </div>
                )}

                {/* Status */}
                <div className="flex items-center gap-2 text-green-600">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium">
                    {isCallActive ? "Call in Progress" : "Available Now"}
                  </span>
                </div>

                {/* Contact Info */}
                {!isCallActive && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-gray-700">
                      <PhoneIcon className="w-5 h-5" />
                      <span>{selectedAssistant.phone}</span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4">
                  {!isCallActive ? (
                    <button
                      onClick={() => handleCall(selectedAssistant)}
                      disabled={isConnecting || deviceStatus !== "ready"}
                      className={`flex-1 bg-gradient-to-r ${
                        selectedAssistant.color
                      } text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                        isConnecting || deviceStatus !== "ready"
                          ? "opacity-75 cursor-not-allowed"
                          : "hover:scale-105"
                      }`}
                    >
                      <PhoneIcon className="w-5 h-5" />
                      {isConnecting
                        ? "Connecting..."
                        : isVapiLoaded
                        ? "START CALL"
                        : "CALL NOW"}
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={toggleMute}
                        className={`flex-1 ${
                          isMuted
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-gray-600 hover:bg-gray-700"
                        } text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2`}
                      >
                        <MicrophoneIcon
                          className={`w-5 h-5 ${isMuted ? "text-red-200" : ""}`}
                        />
                        {isMuted ? "UNMUTE" : "MUTE"}
                      </button>

                      <button
                        onClick={handleEndCall}
                        className="flex-1 bg-red-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <PhoneXMarkIcon className="w-5 h-5" />
                        END CALL
                      </button>
                    </>
                  )}
                </div>

                <p className="text-xs text-gray-500">
                  {isCallActive
                    ? userSpeaking
                      ? "Keep talking - the assistant is listening"
                      : assistantSpeaking
                      ? "Assistant is speaking - listen carefully"
                      : "Speak naturally - the AI assistant is ready to help"
                    : "AI assistant available • Free and confidential"}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
