import FeedWrapper from "@/components/FeedWrapper";
import StickyWrapper from "@/components/StickyWrapper";
import LearnHeader from "./LearnHeader";
import UserProgress from "@/components/UserProgress";
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import Unit from "@/components/Unit";
import { lessons, units as unitsSchema } from "@/db/schema";
import Promo from "@/components/Promo";
import Quests from "@/components/Quests";

async function LearnPage() {
    const userProgressData = getUserProgress();
    const courseProgressData = getCourseProgress();
    const lessonPercentageData = getLessonPercentage();
    const userSubscriptionData = getUserSubscription();
    const unitsData = getUnits();

    const [userProgress, units, courseProgress, lessonPercentage, userSubscription] = await Promise.all([userProgressData, unitsData, courseProgressData, lessonPercentageData, userSubscriptionData]);

    const isPro = !!userSubscription?.isActive;

    if(!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
    };

    if (!courseProgress) {
        redirect("/courses");
    };

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
                <Quests points={userProgress.points} />
            </StickyWrapper>
            <FeedWrapper>
                <LearnHeader title={userProgress.activeCourse.title} />
                {units.map((unit) => (
                    <div key={unit.id} className="mb-10">
                        <Unit
                            id={unit.id}
                            order={unit.order}
                            description={unit.description}
                            title={unit.title}
                            lessons={unit.lessons}
                            activeLesson={courseProgress.activeLesson as typeof lessons.$inferSelect & {
                                unit: typeof unitsSchema.$inferSelect;
                            } | undefined}
                            activeLessonPercentage={lessonPercentage}
                        />
                    </div>
                ))}
            </FeedWrapper>
        </div>
    )
}

export default LearnPage;
