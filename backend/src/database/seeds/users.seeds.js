import User from "../models/user.js";
import { hashPassword } from "../../helpers/auth.Helpers.js";

const seedUsers = async () => {
    const users = [
    
        {
            firstname: "Ndahimana",
            lastname: "Bonheur",
            username: "ndahimana154",
            email: "ndahimana154@gmail.com",
            password: await hashPassword("password123"),
            role: "admin",
        },
        {
            firstname: "Demo",
            lastname: "User1",
            username: "demouser",
            email: "demouser1@gmail.com",
            password: await hashPassword("password123"),
            role: "host",
        },
        {
            firstname: "Demo",
            lastname: "User2",
            username: "demouser2",
            email: "demouser2@gmail.com",
            password: await hashPassword("password123"),
            role: "host",
        },

    ];

    await User.deleteMany({});
    await User.insertMany(users);
    console.log("Users seeded successfully.");
};

export async function unseedUsers() {
    await User.deleteMany({});
    console.log("Users removed successfully.");
}

export default seedUsers;
