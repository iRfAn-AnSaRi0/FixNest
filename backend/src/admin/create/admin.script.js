import bcrypt from "bcrypt";
import { User } from "../../models/user.model.js";

const createAdmin = async () => {

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    await User.create({
        name: "Super Admin",
        phone: process.env.ADMIN_PHONE,
        password: hashedPassword,
        role: "admin",
        isVerified: true
    });

    console.log("Admin created");
};

export { createAdmin }