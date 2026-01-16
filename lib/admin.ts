import { auth } from "@clerk/nextjs/server";

function getIsAdmin() {
    const { userId } = auth();

    const adminIds = [
        process.env.ADMIN_ID
    ];

    if (!userId) {
        return false;
    };

    return adminIds.indexOf(userId) !== -1;
};

export default getIsAdmin;
