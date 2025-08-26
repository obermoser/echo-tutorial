"use client";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { SignInButton, UserButton } from "@clerk/nextjs";
export default function Page() {
  const users = useQuery(api.users.getMany);
  return (
    <>
      <Authenticated>
        <div className="flex items-center justify-center min-h-svh" >
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold">Hello apps/web</h1>
            <UserButton />
            <pre>
              {users ? JSON.stringify(users, null, 2) : "Loading..."}
            </pre>
          </div>
        </div>
      </Authenticated>
      <Unauthenticated>
        <p>Must be Signed in!</p>
        <SignInButton />
      </Unauthenticated>
    </>
  )
}
