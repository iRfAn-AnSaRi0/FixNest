import bcrypt from "bcrypt";
import { User } from "../../models/user.model.js";

const createAdmin = async () => {

    const hashedPassword = await bcrypt.hash("SuperSecure@123", 10);

    await User.create({
        name: "Super Admin",
        phone: "8392092388",
        password: hashedPassword,
        role: "admin",
        isVerified: true
    });

    console.log("Admin created");
};

export { createAdmin }