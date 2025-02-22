import FeedWrapper from "@/components/FeedWrapper";
import Items from "@/components/Items";
import StickyWrapper from "@/components/StickyWrapper";
import UserProgress from "@/components/UserProgress";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";

async function LeaderboardPage() {
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();

    const [userProgress, userSubscription] = await Promise.all([
        userProgressData,
        userSubscriptionData
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
            </StickyWrapper>
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image 
                        src="/leaderboard-ico.svg"
                        alt="leaderboard"
                        height={90}
                        width={90}
                    />
                    <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                        Leaderboard
                    </h1>
                    <p className="text-muted-foreground text-center mb-6 text-lg">
                        See where you stand among other learners in the community
                    </p>
                    {/* TODO */}
                </div>
            </FeedWrapper>
        </div>
    )
}

export default LeaderboardPage;
