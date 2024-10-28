"use client"

import { challengeOptions, challenges } from "@/db/schema";
import { useState } from "react";
import LessonHeader from "./LessonHeader";

type Props = {
    initialPercentage: number;
    initialLessonId: number;
    initialHearts: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
    userSubscription: any;
};

function Quiz({ initialPercentage, initialLessonId, initialHearts, initialLessonChallenges, userSubscription }: Props) {
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(initialPercentage);
    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    })
    
    const challenge = challenges[activeIndex];
    const title = challenge.type === "ASSIST" ? "Select thye correct meaning" : challenge.question;

    return (
        <>
            <LessonHeader
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscription={!!userSubscription?.isActive}
            />
            <div className="flex-1">
                <div className="h-full flex items-center justify-center">
                    <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                        <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                            {title}
                        </h1>
                        <div className="">
                            {/* TODO Challenge component */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Quiz;
