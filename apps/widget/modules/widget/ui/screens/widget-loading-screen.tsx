"use client";

import { useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import {
  errorMessageAtom,
  loadingMessageAtom,
  screenAtom,
} from "../../atoms/widget-atoms";
import WidgetHeader from "../components/widget-header";
import { LoaderIcon } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@workspace/backend/_generated/api";

type initStep = "org" | "session" | "settings" | "vapi" | "done";

export const WidgetLoadingScreen = ({
  organizationId,
}: {
  organizationId: string | null;
}) => {
  const [step, setStep] = useState<initStep>("org");
  const [sessionValid, setSessionValid] = useState(false);

  const setErrorMessage = useSetAtom(errorMessageAtom);
  const loadingMessage = useAtomValue(loadingMessageAtom);
  const setScreen = useSetAtom(screenAtom);
  const setLoadingMessage = useSetAtom(loadingMessageAtom);

  const validateOrganization = useMutation(api.public.organizations.validate);

  useEffect(() => {
    if (step != "org") return;
    setLoadingMessage("Loading organization ID");

    if (!organizationId) {
      setErrorMessage("Organization ID is required");
      setScreen("error");
    }

    setLoadingMessage("Verifying organization...");

    validateOrganization({ organizationId }).then((result) => {
      if (result.valid) {
        //TODO: Finish this
      }
    });
  }, [step, organizationId, setErrorMessage, setScreen]);

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6">
          <p className="font-semibold text-3xl">Hi there! 👋</p>
          <p className="font-semibold text-xl">Let's get you started</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4 text-muted-foreground">
        <LoaderIcon className="animate-spin" />
        <p className="text-sm">{loadingMessage || "Loading..."}</p>
      </div>
    </>
  );
};
