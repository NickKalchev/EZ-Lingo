import Image from "next/image";

type Props = { 
    question: string;
}

function QuestionBubble({ question }: Props) {
    return (
        <div className="flex items-center gap-x-2 mb-6">
            <Image
                src="/logo.svg"
                alt="logo"
                height={200}
                width={200}
                className="hidden lg:block"
            />
            <Image
                src="/logo.svg"
                alt="logo"
                height={120}
                width={120}
                className="block lg:hidden"
            />
            <div className="relative py-2 -ml-8 lg:-ml-12 px-4 border-2 rounded-xl text-sm lg:text-base">
                {question}
                <div className="absolute -left-3 top-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-y-1/2 rotate-90" />
            </div>
        </div>
    )
};

export default QuestionBubble;
