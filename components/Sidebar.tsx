import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import SidebarItem from "./SidebarItem";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

type Props = {
    className?: string;
}

function Sidebar({ className }: Props) {
    return (
        <div className={cn(
            "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-4 flex-col border-green-600/30",
            className
        )}>
            <Link href="/learn">
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                        <Image src="/logo.svg" height={120} width={120} alt="Logo" className="rounded-lg -mx-10" />
                        <h1 className="text-2xl font-extrabold text-green-600/80 tracking-wide">
                            EZ Lingo
                        </h1>
                    </div>
            </Link>
            <div className="flex flex-col gap-y-2 flex-1">
                <SidebarItem 
                    label="Learn" 
                    href="/learn" 
                    iconSrc="/learn-ico.svg" 
                />
                <SidebarItem 
                    label="Leaderboard"  
                    href="/leaderboard"  
                    iconSrc="/leaderboard-ico.svg" 
                />
                <SidebarItem 
                    label="Quests" 
                    href="/quests" 
                    iconSrc="/quests-ico.svg" 
                />
                <SidebarItem 
                    label="Shop" 
                    href="/shop" 
                    iconSrc="/shop-ico.svg" 
                />
            </div>
            <div className="p-4">
                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
                </ClerkLoading>
                <ClerkLoaded>
                    <UserButton afterSignOutUrl="/" />
                </ClerkLoaded>
            </div>
        </div>
    )
}

export default Sidebar
