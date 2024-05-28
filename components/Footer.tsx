import Image from "next/image";
import { Button } from "./ui/button";

export function Footer() {
    return (
        <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
            <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full gap-x-6">
                <Button className="w-full px-6" variant="ghost">
                    <Image 
                        src="/bg.svg" 
                        height={32} 
                        width={40} 
                        alt="hr" 
                        className="mr-2 rounded-md"
                    />
                    Bulgarian
                </Button>
                <Button className="w-full" variant="ghost">
                    <Image 
                        src="/cz.svg" 
                        height={32} 
                        width={40} 
                        alt="hr" 
                        className="mr-4 rounded-md"
                    />
                    Czech
                </Button>
                <Button className="w-full" variant="ghost">
                    <Image 
                        src="/ger.svg" 
                        height={32} 
                        width={40} 
                        alt="hr" 
                        className="mr-4 rounded-md"
                    />
                    German
                </Button>
                <Button className="w-full" variant="ghost">
                    <Image 
                        src="/esp.svg" 
                        height={32} 
                        width={40} 
                        alt="hr" 
                        className="mr-4 rounded-md"
                    />
                    Spanish
                </Button>
                <Button className="w-full" variant="ghost">
                    <Image 
                        src="/fr.svg" 
                        height={32} 
                        width={40} 
                        alt="hr" 
                        className="mr-4 rounded-md"
                    />
                    French
                </Button>
                <Button className="w-full" variant="ghost">
                    <Image 
                        src="/it.svg" 
                        height={32} 
                        width={40} 
                        alt="hr" 
                        className="mr-4 rounded-md"
                    />
                    Italian
                </Button>
            </div>
        </footer>
    )
};
