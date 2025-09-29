// hooks/useVapi.ts
import { useState, useEffect, useRef, useCallback } from "react";
import Vapi from "@vapi-ai/web";

interface VapiInstance {
  start: (assistantIdOrConfig: string | object, assistantOverrides?: any) => Promise<void>;
  stop: () => void;
  setMuted: (muted: boolean) => void;
  isMuted: () => boolean;
  say: (message: string, endCallAfterSpoken?: boolean) => void;
  send: (message: any) => void;
  on: (event: string, callback: (data?: any) => void) => void;
  off: (event: string, callback?: (data?: any) => void) => void;
}

type DeviceStatus = "checking" | "ready" | "error";
type CallStatus = "idle" | "connecting" | "connected" | "ended";

const VAPI_PUBLIC_KEY = "ef995cfe-0f6b-41a2-bb15-8ff165065b49";

export const useVapi = () => {
  const [vapiInstance, setVapiInstance] = useState<VapiInstance | null>(null);
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus>("checking");
  const [callStatus, setCallStatus] = useState<CallStatus>("idle");
  const [isVapiLoaded, setIsVapiLoaded] = useState<boolean>(false);
  const [permissionError, setPermissionError] = useState<string>("");
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  
  const eventListeners = useRef<Map<string, (data?: any) => void>>(new Map());
  const initializationAttempted = useRef<boolean>(false);

  // Request microphone permission
  const requestMicrophonePermission = useCallback(async (): Promise<boolean> => {
    try {
      console.log("Requesting microphone permission...");
      setDeviceStatus("checking");
      setPermissionError("");

      // Check for secure context
      if (typeof window !== 'undefined' && !window.isSecureContext) {
        throw new Error("Microphone access requires HTTPS");
      }

      // Check for getUserMedia support
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Your browser doesn't support microphone access");
      }

      // Request permission
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      // Clean up the stream
      stream.getTracks().forEach((track) => track.stop());
      
      console.log("Microphone permission granted");
      return true;
      
    } catch (error: any) {
      console.error("Microphone permission failed:", error);
      
      let errorMessage = "Microphone access failed: ";
      
      switch (error.name) {
        case "NotAllowedError":
          errorMessage += "Please allow microphone access in your browser settings.";
          break;
        case "NotFoundError":
          errorMessage += "No microphone found. Please connect a microphone.";
          break;
        case "NotReadableError":
          errorMessage += "Microphone is being used by another application.";
          break;
        case "NotSupportedError":
          errorMessage += "Your browser doesn't support microphone access.";
          break;
        default:
          errorMessage += error.message || "Unknown error occurred.";
      }

      setPermissionError(errorMessage);
      setDeviceStatus("error");
      return false;
    }
  }, []);

  // Initialize VAPI instance
  const initializeVapiInstance = useCallback(async (): Promise<boolean> => {
    try {
      console.log("Initializing VAPI instance...");
      
      // Create VAPI instance using the imported Vapi class
      const vapi = new Vapi(VAPI_PUBLIC_KEY);
      
      console.log("VAPI instance created successfully");
      setVapiInstance(vapi as unknown as VapiInstance);
      setIsVapiLoaded(true);
      setDeviceStatus("ready");
      
      return true;
      
    } catch (error) {
      console.error("Failed to initialize VAPI instance:", error);
      setPermissionError("Failed to initialize voice system: " + (error as Error).message);
      setDeviceStatus("error");
      return false;
    }
  }, []);

  // Setup event listeners
  const setupEventListeners = useCallback((
    vapi: VapiInstance,
    callbacks: {
      onCallStart?: () => void;
      onCallEnd?: () => void;
      onSpeechStart?: () => void;
      onSpeechEnd?: () => void;
      onMessage?: (message: any) => void;
      onError?: (error: any) => void;
      onVolumeLevel?: (volume: number) => void;
    }
  ): void => {
    // Clean up existing listeners
    eventListeners.current.forEach((callback, event) => {
      vapi.off(event, callback);
    });
    eventListeners.current.clear();

    // Define event handlers as per Vapi SDK documentation
    const callStartHandler = () => {
      console.log("Call started");
      setCallStatus("connected");
      callbacks.onCallStart?.();
    };

    const callEndHandler = () => {
      console.log("Call ended");
      setCallStatus("ended");
      setTimeout(() => setCallStatus("idle"), 1000);
      callbacks.onCallEnd?.();
    };

    const speechStartHandler = () => {
      console.log("User speech started");
      callbacks.onSpeechStart?.();
    };

    const speechEndHandler = () => {
      console.log("User speech ended");
      callbacks.onSpeechEnd?.();
    };

    const messageHandler = (message: any) => {
      console.log("Message received:", message);
      callbacks.onMessage?.(message);
      
      // Handle different message types
      if (message.type === "transcript") {
        console.log(`Transcript (${message.transcriptType}):`, message.transcript);
        
        // You can use transcript messages to detect when assistant is speaking
        if (message.role === "assistant" && message.transcriptType === "final") {
          console.log("Assistant finished speaking");
        }
      } else if (message.type === "function-call") {
        console.log("Function call:", message.functionCall);
      } else if (message.type === "conversation-update") {
        console.log("Conversation update:", message);
      }
    };

    const volumeLevelHandler = (volume: number) => {
      callbacks.onVolumeLevel?.(volume);
    };

    const errorHandler = (error: any) => {
      console.error("VAPI error:", error);
      setCallStatus("idle");
      callbacks.onError?.(error);
    };

    // Register all event listeners
    const eventHandlers = {
      "call-start": callStartHandler,
      "call-end": callEndHandler,
      "speech-start": speechStartHandler,
      "speech-end": speechEndHandler,
      "message": messageHandler,
      "volume-level": volumeLevelHandler,
      "error": errorHandler,
    };

    // Add new listeners
    Object.entries(eventHandlers).forEach(([event, handler]) => {
      vapi.on(event, handler);
      eventListeners.current.set(event, handler);
    });

    console.log("Event listeners registered:", Object.keys(eventHandlers));
  }, []);

  // Complete initialization process
  const initializeVapi = useCallback(async (): Promise<void> => {
    if (initializationAttempted.current) return;
    initializationAttempted.current = true;

    try {
      setIsInitializing(true);
      console.log("Starting VAPI initialization process...");

      // Step 1: Request microphone permission
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        throw new Error("Microphone permission denied");
      }

      // Step 2: Initialize VAPI instance
      const instanceInitialized = await initializeVapiInstance();
      if (!instanceInitialized) {
        throw new Error("Failed to initialize VAPI instance");
      }

      console.log("VAPI initialization completed successfully");
      
    } catch (error) {
      console.error("VAPI initialization failed:", error);
      setDeviceStatus("error");
      setIsVapiLoaded(false);
      
      if (!permissionError) {
        setPermissionError("Failed to initialize voice system. Please try again.");
      }
    } finally {
      setIsInitializing(false);
    }
  }, [requestMicrophonePermission, initializeVapiInstance, permissionError]);

  // Start a call
  const startCall = useCallback(async (
    assistantId: string,
    callbacks?: {
      onCallStart?: () => void;
      onCallEnd?: () => void;
      onSpeechStart?: () => void;
      onSpeechEnd?: () => void;
      onMessage?: (message: any) => void;
      onError?: (error: any) => void;
      onVolumeLevel?: (volume: number) => void;
    },
    assistantOverrides?: any
  ): Promise<boolean> => {
    if (!vapiInstance) {
      console.error("VAPI instance not available");
      callbacks?.onError?.({ message: "VAPI instance not initialized" });
      return false;
    }

    if (callStatus !== "idle") {
      console.warn("Call already in progress");
      return false;
    }

    try {
      console.log("Starting call with assistant ID:", assistantId);
      setCallStatus("connecting");
      
      // Setup event listeners before starting the call
      if (callbacks) {
        setupEventListeners(vapiInstance, callbacks);
      }

      // Start the call with assistant ID and optional overrides
      if (assistantOverrides) {
        console.log("Starting call with overrides:", assistantOverrides);
        await vapiInstance.start(assistantId, assistantOverrides);
      } else {
        await vapiInstance.start(assistantId);
      }
      
      console.log("Call start command sent successfully");
      return true;
      
    } catch (error: any) {
      console.error("Failed to start call:", error);
      setCallStatus("idle");
      
      // Provide detailed error information
      const errorMessage = error?.message || error?.toString() || "Unknown error";
      callbacks?.onError?.({ 
        message: errorMessage,
        error: error 
      });
      
      return false;
    }
  }, [vapiInstance, callStatus, setupEventListeners]);

  // Stop the current call
  const stopCall = useCallback(async (): Promise<void> => {
    if (!vapiInstance || callStatus === "idle") return;
    
    try {
      vapiInstance.stop();
      console.log("Call stopped");
    } catch (error) {
      console.error("Error stopping call:", error);
    }
  }, [vapiInstance, callStatus]);

  // Toggle mute
  const toggleMute = useCallback((muted?: boolean): void => {
    if (!vapiInstance) return;
    
    const newMutedState = muted !== undefined ? muted : !isMuted;
    vapiInstance.setMuted(newMutedState);
    setIsMuted(newMutedState);
    console.log(`Microphone ${newMutedState ? 'muted' : 'unmuted'}`);
  }, [vapiInstance, isMuted]);

  // Say something (useful for ending calls gracefully)
  const say = useCallback((message: string, endCallAfterSpoken?: boolean): void => {
    if (!vapiInstance) return;
    
    try {
      vapiInstance.say(message, endCallAfterSpoken);
      console.log("Say command sent:", message);
    } catch (error) {
      console.error("Error sending say command:", error);
    }
  }, [vapiInstance]);

  // Send a message
  const sendMessage = useCallback((message: { role: string; content: string }): void => {
    if (!vapiInstance) return;
    
    try {
      vapiInstance.send({
        type: 'add-message',
        message,
      });
      console.log("Message sent:", message);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }, [vapiInstance]);

  // Retry initialization
  const retryInitialization = useCallback(async (): Promise<void> => {
    initializationAttempted.current = false;
    setDeviceStatus("checking");
    setPermissionError("");
    setIsVapiLoaded(false);
    setVapiInstance(null);
    await initializeVapi();
  }, [initializeVapi]);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (vapiInstance) {
      // Clean up event listeners
      eventListeners.current.forEach((callback, event) => {
        vapiInstance.off(event, callback);
      });
      eventListeners.current.clear();
      
      // Stop any active call
      if (callStatus !== "idle") {
        vapiInstance.stop();
      }
    }
  }, [vapiInstance, callStatus]);

  // Initialize on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      initializeVapi();
    }
    
    // Cleanup on unmount
    return cleanup;
  }, []);

  return {
    // State
    vapiInstance,
    deviceStatus,
    callStatus,
    isVapiLoaded,
    permissionError,
    isInitializing,
    isMuted,
    
    // Methods
    startCall,
    stopCall,
    toggleMute,
    say,
    sendMessage,
    retryInitialization,
    cleanup,
    
    // Computed properties
    isReady: deviceStatus === "ready" && isVapiLoaded && !isInitializing,
    isCallActive: callStatus === "connected" || callStatus === "connecting",
    hasError: deviceStatus === "error" || !!permissionError,
  };
};