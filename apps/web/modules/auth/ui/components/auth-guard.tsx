"use client";

import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { AuthLayout } from "./layouts/auth.layout";
import { SignInView } from "./views/sign-in-view";
import { Loader2 } from "lucide-react";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthLoading>
        <AuthLayout>
          <p className="text-lg">Loading...</p>
        </AuthLayout>
      </AuthLoading>
      <Authenticated>{children}</Authenticated>

      <Unauthenticated>
        <AuthLayout>
          <SignInView />
        </AuthLayout>
      </Unauthenticated>
    </>
  );
};
