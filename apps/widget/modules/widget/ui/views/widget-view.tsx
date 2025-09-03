"use client";

import { error } from "console";
import { screenAtom } from "../../atoms/widget-atoms";
import { WidgetAuthScreen } from "../screens/widget-auth-screen";
import { useAtomValue } from "jotai";
import { WidgetErrorScreen } from "../screens/widget-error-screen";

interface Props {
    organizationId: string;
}

export const WidgetView = ({ organizationId }: Props) => {
    const screen = useAtomValue(screenAtom);
    const screenComponents = {
        error: <WidgetErrorScreen />,
        loading: <p>TODO: loading</p>,
        auth: <WidgetAuthScreen />,
        voice: <p>TODO: voice</p>,
        inbox: <p>TODO: inbox</p>,
        selection: <p>TODO: selection</p>,
        chat: <p>TODO: chat</p>,
        contact: <p>TODO: contact</p>
    }

    return (
        // TODO: Confirm wether min-h-screen/min-w-screen is needed
        <main className="flex min-h-screen min-w-screen h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">

            {screenComponents[screen]}
            {/* <WidgetFooter /> */}
        </main>
    );
};
