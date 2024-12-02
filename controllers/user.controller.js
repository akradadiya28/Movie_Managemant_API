import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import env from "dotenv"
import crypto from "crypto"
env.config()

export const addUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const emailRegx = /^[\w-\.]+@([\w-]+\.)+com$/;
        if (!emailRegx.test(email)) {
            return res.status(400).json({ message: "Email end with .com" })
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(403).json({ message: "User alredy exits" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword, role });
        console.log("Add user", user);

        return res.status(200).json({ message: "User created succesfully" })

    } catch (error) {
        console.log("add-movie", error);
        return res.status(401).json({ message: "Error creating user", error })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        const isValidPassword = bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid passord" });
        }

        const tokenId = crypto.randomBytes(16).toString("hex");
        user.tokenId = tokenId;
        console.log(tokenId);
        await user.save();

        const token = jwt.sign({ userId: user._id, tokenId, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("token", token);

        res.status(201).json({ message: "Login Succesfull", token: token })

    } catch (error) {
        console.log("login-error", error);
        return res.status(401).json({ message: "Login error", error })
    }
}

export const logotUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // req.user.tokenId = null;
        // await req.user.save();

        return res.status(201).json({ message: "Logout succesfully" })

    } catch (error) {
        console.log("logout-error", error);
        return res.status(401).json({ message: "Logout error", error })
    }
}