"use client";

import WidgetFooter from "../components/widget-footer";
import WidgetHeader from "../components/widget-header";
import { WidgetAuthScreen } from "../screens/widget-auth-screen";

interface Props {
    organizationId: string;
}

export const WidgetView = ({ organizationId }: Props) => {
    return (
        // TODO: Confirm wether min-h-screen/min-w-screen is needed
        <main className="flex min-h-screen min-w-screen h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">

            <WidgetAuthScreen />
            {/* <WidgetFooter /> */}
        </main>
    );
};
