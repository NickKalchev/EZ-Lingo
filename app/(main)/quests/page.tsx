import Image from "next/image";
import { redirect } from "next/navigation";
import FeedWrapper from "@/components/FeedWrapper";
import UserProgress from "@/components/UserProgress";
import StickyWrapper from "@/components/StickyWrapper";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import { Progress } from "@/components/ui/progress";
import Promo from "@/components/Promo";
import { quests } from "@/constants";


async function QuestsPage() {
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();

    const [userProgress, userSubscription] = await Promise.all([
        userProgressData,
        userSubscriptionData,
    ]);

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
    };

    const isPro = !!userSubscription?.isActive;

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress 
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={isPro}
                />
                {!isPro && (
                    <Promo />
                )}
            </StickyWrapper>
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image 
                        src="/quests-ico.svg"
                        alt="quests"
                        height={90}
                        width={90}
                    />
                    <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                        Quests
                    </h1>
                    <p className="text-muted-foreground text-center mb-6 text-lg">
                        Complete quests by earning points
                    </p>
                    <ul className="w-full mt-6">
                        {quests.map((quest) => {
                            const progress = (userProgress.points / quest.value) * 100;
                            return (
                                <div 
                                    className="flex items-center w-full p-4 gap-x-4 border-b-2 border-green-600/40"
                                    key={quest.title}
                                >
                                    <Image 
                                        src="/points.svg"
                                        alt="points"
                                        height={60}
                                        width={60}
                                    />
                                    <div className="flex flex-col gap-y-2 w-full">
                                        <p className="text-neutral-700 text-xl font-bold">
                                            {quest.title}
                                        </p>
                                        <Progress value={progress} className="h-3" />
                                    </div>
                                </div>
                        )})}
                    </ul>
                </div>
            </FeedWrapper>
        </div>
    )
}

export default QuestsPage;
