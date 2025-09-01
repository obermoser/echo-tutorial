import Vapi from '@vapi-ai/web';
import { useEffect, useState } from 'react';

interface TranscriptMessage {
    role: "user" | "assistant";
    text: string;
};

export const useVapi = () => {
    const [vapi, setVapi] = useState<Vapi | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);

    useEffect(() => {
        // Only for testing the vapi api, otherwise customer will provide its own key.
        const vapiInstance = new Vapi("");
        setVapi(vapiInstance);

        vapiInstance.on("call-start", () => {
            setIsConnected(true);
            setIsConnecting(false);
            setTranscript([]);
        });

        vapiInstance.on("call-end", () => {
            setIsConnected(false);
            setIsConnecting(false);
            setIsSpeaking(false);
        });

        vapiInstance.on("speech-start", () => {
            setIsSpeaking(true)
            setIsConnected(true);
        });

        vapiInstance.on("speech-end", () => {
            setIsSpeaking(false);
        });

        vapiInstance.on("error", (error) => {
            console.error("VAPI error:", error);
            setIsConnected(false);
        });

        vapiInstance.on("message", (message) => {
            if (message.type === "transcript" && message.transcriptType === "final") {
                setTranscript((prev) => [...prev, {
                    role: message.role === "user" ? "user" : "assistant",
                    text: message.transcript,
                }]);
            }
        });

        return () => {
            vapiInstance?.stop();
        }



    }, [])

    const startCall = () => {
        setIsConnecting(true);
        if (vapi) {
            // Only for testing the vapi api, otherwise customer will provide its own assistant ids.
            vapi.start("");
        }
    }

    const endCall = () => {
        if (vapi) {
            vapi.stop();
        }
    };
    return {
        startCall,
        endCall,
        isConnected,
        isConnecting,
        isSpeaking,
        transcript
    }
}