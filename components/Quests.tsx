'use client'

import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { quests } from "@/constants";
import { Progress } from "./ui/progress";

type Props = {
    points: number;
};

function Quests({ points }: Props) {
    return (
        <div className="border-2 rounded-xl p-4 space-y-4 mb-2">
            <div className="flex items-center justify-between w-full space-y-2 px-2">
                <h3 className="font-bold text-lg">
                    Quests
                </h3>
                <Link href="/quests">
                    <Button
                        variant="primaryOutline"
                        size="sm"
                    >
                        View all
                    </Button>
                </Link>
            </div>
            <ul className="w-full space-y-1">
                {quests.map((quest) => {
                    const progress = (points / quest.value) * 100;
                    return (
                        <div 
                            className="flex items-center w-full p-4 gap-x-4 border-b-2 rounded-2xl border-green-600/30 hover:bg-blue-500/20"
                            key={quest.title}
                        >
                            <Image 
                                src="/points.svg"
                                alt="points"
                                height={35}
                                width={35}
                            />
                            <div className="flex flex-col gap-y-1 w-full">
                                <p className="text-neutral-700 font-bold">
                                    {quest.title}
                                </p>
                                <Progress value={progress} className="h-2" />
                            </div>
                        </div>
                )})}
            </ul>
        </div>
    )
};

export default Quests;
