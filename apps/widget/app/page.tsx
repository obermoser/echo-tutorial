"use client";
import { Button } from "@workspace/ui/components/button"
import { useMutation, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { User2 } from "lucide-react";

export default function Page() {
  const users = useQuery(api.users.getMany);
  const addUser = useMutation(api.users.add);
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello apps/widget</h1>
        <Button onClick={() => addUser()} size={"lg"}>
          <User2 />Add User
        </Button>
        <pre>
          {JSON.stringify(users, null, 2)}
        </pre>
      </div>
    </div>
  )
}
