"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

type Props = {
    label: string;
    iconSrc: string;
    href: string;
};

function SidebarItem({ label, iconSrc, href }: Props) {
    const pathName = usePathname();
    const active = pathName === href;

    return (
        <Button 
            variant={active ? "sidebarOutline" : "sidebar"}
            className="justify-start h-[52px]"
            asChild
        >
            <Link href={href}>
                <Image src={iconSrc} alt={label} className="mr-5" height={28} width={28} />
                {label}
            </Link>
        </Button>
    )
}

export default SidebarItem;
