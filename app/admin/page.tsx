import dynamic from "next/dynamic";
import GetIsAdmin from "@/lib/admin";
import { redirect } from "next/navigation";


const App = dynamic(() => import("./app"), { ssr: false });

async function AdminPage() {
    const isAdmin = await GetIsAdmin();

    if (!isAdmin) {
        redirect("/");
    };

    return (
        <App />
    );
};

export default AdminPage;
