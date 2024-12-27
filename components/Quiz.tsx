"use client"

import { challengeOptions, challenges } from "@/db/schema";
import { useState, useTransition } from "react";
import LessonHeader from "./LessonHeader";
import QuestionBubble from "./QuestionBubble";
import Challenge from "./Challenge";
import LessonFooter from "./LessonFooter";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { toast } from "sonner";
import { reduceHearts } from "@/actions/user-progress";
import { useAudio, useWindowSize, useMount } from "react-use";
import Image from "next/image";
import ResultCard from "./ResultCard";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { usePracticeModal } from "@/store/use-practice-modal";

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
    const router = useRouter();
    const { width, height } = useWindowSize();
    const { open: openHeartsModal } = useHeartsModal();
    const { open: openPracticeModal } = usePracticeModal();
    const [finishAudio] = useAudio({ src: "/finish.wav", autoPlay: true });
    const [correctAudio, _c, correctControls] = useAudio({ src: "/correct.wav"});
    const [incorrectAudio, _i, incorrectControls] = useAudio({ src: "/incorrect.wav"});
    const [pending, startTransition] = useTransition();
    const [hearts, setHearts] = useState(initialHearts);
    const [lessonId, setLessonId] = useState(initialLessonId);
    const MAX_HEARTS = 5;
    const MIN_HEARTS = 0;
    const [percentage, setPercentage] = useState(() => {
        return initialPercentage === 100 ? 0 : initialPercentage
    });
    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });

    const [selectedOption, setSelectedOption] = useState<number>();
    const [status, setStatus] = useState<"none" | "correct" | "wrong">("none");

    useMount(() => {
        if (initialPercentage === 100) {
            openPracticeModal();
        };
    })

    const onNext = () => {
        setActiveIndex((current) => current + 1);
    };

    const onSelect = (id: number) => {
        if (status !== "none") return;

        setSelectedOption(id);
    };

    const onContinue = () => {
        if (!selectedOption) return;

        if (status === "wrong") {
            setStatus("none");
            setSelectedOption(undefined);
            return;
        } else if (status === "correct") {
            onNext();
            setStatus("none");
            setSelectedOption(undefined);
            return;
        };

        const correctOption = options.find((option) => option.correct);

        if (!correctOption) return;

        if (correctOption && correctOption.id === selectedOption) {
            startTransition(() => {
                upsertChallengeProgress(challenge.id)
                    .then((response) => {
                        if (response?.error === "hearts") {
                            openHeartsModal();
                            return;
                        };

                        correctControls.play();
                        setStatus("correct");
                        setPercentage((prev) => prev + 100 / challenges.length);

                        if (initialPercentage === 100) {
                            setHearts((prev) => Math.min(prev + 1, MAX_HEARTS))
                        };
                    }).catch(() => toast.error("Something went wrong. Please try again."))
            });
        } else {
            startTransition(() => {
                reduceHearts(challenge.id)
                    .then((response) => {
                        if (response?.error === "hearts") {
                            openHeartsModal();
                            return;
                        };

                        incorrectControls.play();
                        setStatus("wrong");
                        
                        if (!response?.error) {
                            setHearts((prev) => Math.max(prev - 1, MIN_HEARTS))
                        };
                    })
                    .catch(() => toast.error("Something went wrong. Please try again."))
            });
        };
    };
    
    const challenge = challenges[activeIndex];
    const options = challenge?.challengeOptions ?? [];

    if (!challenge) {
        return (
            <>
                {finishAudio}
                <Confetti
                    width={width}
                    height={height}
                    recycle={false}
                    numberOfPieces={500}
                    tweenDuration={10000}
                />
                <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
                    <Image 
                        src="/finish.svg"
                        alt="finish"
                        className="hidden lg:block"
                        height={250}
                        width={250}
                        priority
                    />
                    <Image 
                        src="/finish.svg"
                        alt="finish"
                        className="block lg:hidden"
                        height={150}
                        width={150}
                        priority
                    />
                    <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
                        Great job! <br/> You&apos;ve completed the lesson
                    </h1>
                    <div className="flex items-center gap-x-4 w-full">
                        <ResultCard 
                            variant="points"
                            value={challenges.length * 10} 
                        />
                        <ResultCard 
                            variant="hearts"
                            value={hearts} 
                        />
                    </div>
                </div>
                <LessonFooter
                    lessonId={lessonId}
                    status="completed"
                    onCheck={() => {router.push('/learn')}} 
                />
            </>
        )
    };

    const title = challenge.type === "ASSIST" ? "Select the correct meaning" : challenge.question;

    return (
        <>
            {correctAudio}
            {incorrectAudio}
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
                            {challenge.type === "ASSIST" && (
                                <QuestionBubble question={challenge.question} />
                            )}
                            <Challenge
                                options={options}
                                onSelect={onSelect}
                                status={status}
                                selectedOption={selectedOption}
                                disabled={pending}
                                type={challenge.type}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <LessonFooter 
                disabled={pending || !selectedOption}
                status={status}
                onCheck={onContinue}
            />
        </>
    )
}

export default Quiz;
