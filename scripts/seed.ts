import "dotenv/config";
import * as schema from "../db/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Seeding database");

        await db.delete(schema.courses);
        await db.delete(schema.userProgress);

        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "Spanish",
                imageSrc: "/esp.svg"  
            },
            {
                id: 2,
                title: "Bulgarian",
                imageSrc: "/bg.svg"  
            },
            {
                id: 3,
                title: "Czech",
                imageSrc: "/cz.svg"  
            },
            {
                id: 4,
                title: "French",
                imageSrc: "/fr.svg"  
            },
            {
                id: 5,
                title: "German",
                imageSrc: "/ger.svg"  
            },
            {
                id: 6,
                title: "Italian",
                imageSrc: "/it.svg"  
            },
        ]);
            

        console.log("Seeding finished");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed the database");
    };
};

main();