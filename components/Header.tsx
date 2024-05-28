import { ClerkLoaded, ClerkLoading, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

function Header() {
    return (
        <header className="h-20 w-full border-b-2 border-slate-200 px-4">
            <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    <Image src="/logo.svg" height={120} width={120} alt="Logo" className="rounded-lg -mx-10" />
                    <h1 className="text-2xl font-extrabold text-green-600/80 tracking-wide">
                        EZ Lingo
                    </h1>
                </div>
                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedIn>
                        <UserButton
                            afterSignOutUrl="/"
                        />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton 
                            mode="modal" 
                            forceRedirectUrl="/learn"
                            signUpForceRedirectUrl="/learn"
                        >
                            <Button size="lg" variant="ghost">
                                Login
                            </Button>
                        </SignInButton>
                    </SignedOut>
                </ClerkLoaded>
            </div>
        </header>
    )
}

export default Header;
