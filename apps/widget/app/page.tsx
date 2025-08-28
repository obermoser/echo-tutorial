"use client";
import { useVapi } from "@/modules/widget/hooks/use-vapi";
import { Button } from "@workspace/ui/components/button"
export default function Page() {
  const { startCall, endCall, isConnected, isConnecting, isSpeaking, transcript } = useVapi();
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello apps/widget</h1>
        <Button onClick={() => { startCall(); }}>
          Start Call
        </Button>
        <Button onClick={() => { endCall(); }} variant={"destructive"}>
          End Call
        </Button>
        <p>isConnected: {`${isConnected}`}</p>
        <p>isConnecting: {`${isConnecting}`}</p>
        <p>isSpeaking: {`${isSpeaking}`}</p>
        <p>transcript: {JSON.stringify(transcript, null, 2)}</p>

      </div>
    </div>
  )
}
