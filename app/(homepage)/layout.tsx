import Header from "@/components/Header";
import { Footer } from "@/components/Footer";

type Props = {
    children: React.ReactNode;
};

function HomeLayout({ children }: Props) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex flex-1 flex-col items-center justify-center">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default HomeLayout;
