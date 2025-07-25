import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

function Promo() {
    return (
        <div className="border-2 rounded-xl p-4 space-y-4">
            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-x-2">
                    <Image 
                        src="/unlimited.svg"
                        alt="pro"
                        height={26}
                        width={26}
                    />
                    <h3 className="font-bold text-lg">
                        Upgrade to PRO
                    </h3>
                </div>
                <p className="text-muted-foreground mx-8 pt-1">
                    Get unlimited hearts and more!
                </p>
            </div>
            <Link href="/shop">
                <Button
                    variant="super"
                    className="w-full"
                    size="lg"
                >
                    Upgrade now

                </Button>
            </Link>
        </div>
    )
};

export default Promo;
