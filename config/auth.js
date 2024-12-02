import jwt from "jsonwebtoken"
import env from "dotenv"
import User from "../models/user.model.js"
env.config()

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log("token", token);
        if (!token) {
            return res.status(404).json({ message: "Please provide a token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded", decoded);

        const user = await User.findById(decoded.userId)

        console.log("Database tokenId:", user.tokenId);
        console.log("Decoded tokenId:", decoded.tokenId);


        // if (!user || !user.tokenId !== decoded.tokenId) {
        //     return res.status(404).json({ message: "Session expired please login again" });
        // }

        req.user = user;

        next();

    } catch (error) {
        console.log("Unauthorized", error);
        return res.status(404).json({ message: "Unauthorized" });
    }
}

export const authorized = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(404).json({ message: "Access denied" });
    }
    next();
}