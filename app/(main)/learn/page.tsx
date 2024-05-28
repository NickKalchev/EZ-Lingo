import FeedWrapper from "@/components/FeedWrapper";
import Header from "@/components/Header";
import StickyWrapper from "@/components/StickyWrapper";
import LearnHeader from "./LearnHeader";
import UserProgress from "@/components/UserProgress";

function LearnPage() {
    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress 
                    activeCourse={{title: "Spanish", imageSrc: "/esp.svg"}} 
                    hearts={5} 
                    points={100}
                    hasActiveSubscription={false} 
                />
            </StickyWrapper>
            <FeedWrapper>
                <LearnHeader title="Spanish" />
            </FeedWrapper>
        </div>
    )
}

export default LearnPage;
