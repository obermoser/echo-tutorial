"use client";

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@workspace/ui/components/sidebar";
import { cn } from "@workspace/ui/lib/utils";
import {
    CreditCardIcon,
    InboxIcon,
    LayoutDashboardIcon,
    LibraryBigIcon,
    Mic,
    PaletteIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const customerSupportItems = [
    {
        title: "Conversations",
        url: "/conversations",
        icon: InboxIcon,
    },
    {
        title: "Knowledge Base",
        url: "/files",
        icon: LibraryBigIcon,
    },
];

const configurationItems = [
    {
        title: "Widget Customization",
        url: "/customization",
        icon: PaletteIcon,
    },
    {
        title: "Integrations",
        url: "/integrations",
        icon: LayoutDashboardIcon,
    },

    {
        title: "Voice Assistant",
        url: "/plugins/vapi",
        icon: Mic,
    },
];

const accountItems = [
    {
        title: "Plans & Billing",
        url: "/billing",
        icon: CreditCardIcon,
    },
];

export const DashboardSidebar = () => {
    const pathName = usePathname();
    const isActive = (url: string) => {
        if (url === "/") {
            return pathName === "/";
        }
        return pathName.startsWith(url);
    };
    return (
        <Sidebar className="group" collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild size={"lg"}>
                            <OrganizationSwitcher
                                hidePersonal
                                skipInvitationScreen
                                appearance={{
                                    elements: {
                                        rootBox: "w-full! h-8!",
                                        avatarBox: "size-4! rounded-sm!",
                                        organizationSwitcherTrigger:
                                            "w-full! justify-start! group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!",
                                        organizationPreview: "group-data-[collapsible=icon]:justify-center! gap-2!"
                                    },
                                }}
                            />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {/* Customer Support */}
                <SidebarGroup>
                    <SidebarGroupLabel>Customer Support</SidebarGroupLabel>
                    <SidebarGroupContent>
                        {customerSupportItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    tooltip={item.title}
                                    isActive={isActive(item.url)}
                                >
                                    <Link href={item.url}>
                                        <item.icon className="size-4" />
                                        <span> {item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Configuration */}
                <SidebarGroup>
                    <SidebarGroupLabel>Configuration</SidebarGroupLabel>
                    <SidebarGroupContent>
                        {configurationItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    tooltip={item.title}
                                    isActive={isActive(item.url)}
                                >
                                    <Link href={item.url}>
                                        <item.icon className="size-4" />
                                        <span> {item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Account */}
                <SidebarGroup>
                    <SidebarGroupLabel>Account</SidebarGroupLabel>
                    <SidebarGroupContent>
                        {accountItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    tooltip={item.title}
                                    isActive={isActive(item.url)}
                                >
                                    <Link href={item.url}>
                                        <item.icon className="size-4" />
                                        <span> {item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarRail />
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <UserButton showName />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
};
