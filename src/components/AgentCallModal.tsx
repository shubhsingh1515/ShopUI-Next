// components/CallModal.tsx
import React from "react";
import { motion } from "framer-motion";
import {
  XMarkIcon,
  PhoneIcon,
  MicrophoneIcon,
  PhoneXMarkIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

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

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAssistant: Assistant;
  callStatus: CallStatus;
  isCallActive: boolean;
  isConnecting: boolean;
  isMuted: boolean;
  callDuration: number;
  assistantSpeaking: boolean;
  userSpeaking: boolean;
  isVapiLoaded: boolean;
  deviceStatus: "checking" | "ready" | "error";
  callError?: string;
  onCall: (assistant: Assistant) => void;
  onEndCall: () => void;
  onToggleMute: () => void;
}

export const CallModal: React.FC<CallModalProps> = ({
  isOpen,
  onClose,
  selectedAssistant,
  callStatus,
  isCallActive,
  isConnecting,
  isMuted,
  callDuration,
  assistantSpeaking,
  userSpeaking,
  isVapiLoaded,
  deviceStatus,
  callError,
  onCall,
  onEndCall,
  onToggleMute,
}) => {
  if (!isOpen) return null;

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (!isCallActive && !isConnecting) {
      onClose();
    }
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const getCallButtonText = () => {
    if (isConnecting) return "Connecting...";
    if (isVapiLoaded) return "START VOICE CALL";
    return "CALL NOW";
  };

  const getStatusEmoji = () => {
    switch (callStatus) {
      case "connecting":
        return "⏳";
      case "connected":
        return "✅";
      case "ended":
        return "📞";
      case "error":
        return "❌";
      default:
        return "";
    }
  };

  const getStatusText = () => {
    switch (callStatus) {
      case "connecting":
        return "Connecting...";
      case "connected":
        return "Connected";
      case "ended":
        return "Call Ended";
      case "error":
        return "Call Failed";
      default:
        return "";
    }
  };

  const getStatusColor = () => {
    switch (callStatus) {
      case "connecting":
        return "text-yellow-600";
      case "connected":
        return "text-green-600";
      case "ended":
        return "text-blue-600";
      case "error":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative"
        onClick={handleContentClick}
      >
        {/* Close Button */}
        {!isCallActive && !isConnecting && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <XMarkIcon className="w-6 h-6 text-gray-500" />
          </button>
        )}

        {/* Content */}
        <div className="text-center space-y-6">
          {/* Assistant Icon */}
          <div
            className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${
              selectedAssistant.color
            } flex items-center justify-center text-4xl ${
              isCallActive ? "animate-pulse" : ""
            } ${
              assistantSpeaking ? "ring-4 ring-blue-400 ring-opacity-75" : ""
            } ${userSpeaking ? "ring-4 ring-green-400 ring-opacity-75" : ""}`}
          >
            {selectedAssistant.icon}
          </div>

          {/* Title and Description */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {selectedAssistant.title}
            </h3>
            <p className="text-gray-600 mb-4">
              {selectedAssistant.description}
            </p>
          </div>

          {/* Error Display */}
          {callError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-red-800">
                <ExclamationTriangleIcon className="w-5 h-5" />
                <span className="font-medium">Call Error</span>
              </div>
              <p className="text-sm text-red-600 mt-1">{callError}</p>
            </div>
          )}

          {/* Call Status */}
          {callStatus !== "idle" && (
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Call Status:</span>
                <span className={`text-sm font-bold ${getStatusColor()}`}>
                  {getStatusEmoji()} {getStatusText()}
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
                      {userSpeaking ? "You are speaking" : "You"}
                    </span>
                    <span
                      className={`${
                        assistantSpeaking
                          ? "text-blue-600 font-bold"
                          : "text-gray-400"
                      }`}
                    >
                      {assistantSpeaking ? "Assistant speaking" : "Assistant"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Service Info */}
          {!isCallActive && !isConnecting && callStatus !== "error" && (
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Available 24/7</span>
                <span className="text-sm text-gray-500">Free Service</span>
              </div>
              <p className="text-sm text-gray-600">
                {isVapiLoaded
                  ? 'Click "START VOICE CALL" to begin talking with our AI assistant through your browser.'
                  : 'Click "CALL NOW" to dial the helpline number and speak with our AI assistant.'}
              </p>
            </div>
          )}

          {/* Status Indicator */}
          <div className="flex items-center justify-center gap-2 text-green-600">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium">
              {isCallActive
                ? "Call in Progress"
                : isConnecting
                ? "Connecting..."
                : "Available Now"}
            </span>
          </div>

          {/* Contact Info */}
          {!isCallActive && !isConnecting && (
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <PhoneIcon className="w-5 h-5" />
                <span>{selectedAssistant.phone}</span>
              </div>
              {isVapiLoaded && (
                <p className="text-xs text-blue-600">
                  Voice chat available - no phone call needed
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            {!isCallActive && !isConnecting ? (
              <button
                onClick={() => onCall(selectedAssistant)}
                disabled={deviceStatus !== "ready"}
                className={`flex-1 bg-gradient-to-r ${
                  selectedAssistant.color
                } text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  deviceStatus !== "ready"
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-105"
                }`}
              >
                <PhoneIcon className="w-5 h-5" />
                {getCallButtonText()}
              </button>
            ) : (
              <>
                <button
                  onClick={onToggleMute}
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
                  onClick={onEndCall}
                  className="flex-1 bg-red-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <PhoneXMarkIcon className="w-5 h-5" />
                  END CALL
                </button>
              </>
            )}
          </div>

          {/* Footer Info */}
          <p className="text-xs text-gray-500">
            {isCallActive
              ? userSpeaking
                ? "Keep talking - the assistant is listening"
                : assistantSpeaking
                ? "Assistant is speaking - listen carefully"
                : "Speak naturally - the AI assistant is ready to help"
              : "AI assistant available - Free and confidential"}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};
