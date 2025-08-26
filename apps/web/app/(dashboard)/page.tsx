"use client";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { OrganizationSwitcher, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@workspace/ui/components/button";
import { AuthGuard } from "@/modules/auth/ui/components/auth-guard";
export default function Page() {
  const users = useQuery(api.users.getMany);
  const addUser = useMutation(api.users.add);
  return (
    <>
      <div className="flex items-center justify-center min-h-svh">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold">Hello apps/web</h1>
          <UserButton />
          <OrganizationSwitcher hidePersonal/>
          <Button
            className="cursor-pointer"
            variant={"secondary"}
            onClick={() => {
              addUser();
            }}
          >
            Add Test User
          </Button>
          <pre>{users ? JSON.stringify(users, null, 2) : "Loading..."}</pre>
        </div>
      </div>
    </>
  );
}
