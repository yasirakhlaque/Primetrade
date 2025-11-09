import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            email: email
        })
        if (!user) return res.status(404).json({ message: "User not found" });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const userResponse = {
            _id: user._id,
            username: user.username,
            email: user.email,
            bio: user.bio,
            avatarUrl: user.avatarUrl
        };
        res.status(200).json({ token, user: userResponse });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });
        if (existingUser) return res.status(400).json({ message: "User already exists" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        return res.status(200).json({ message: "User Created Successfully" });
    } catch (error) {
        console.error("Error in register:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getProfile = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        const userResponse = {
            _id: user._id,
            username: user.username,
            email: user.email,
            bio: user.bio,
            avatarUrl: user.avatarUrl
        };
        res.status(200).json({ user: userResponse });
    } catch (error) {
        console.error("Error in getProfile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const UpdateProfile = async (req, res) => {
    const userId = req.user.id;
    const { username, bio, avatarUrl } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { username, bio, avatarUrl },
            { new: true }
        );
        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        const userResponse = {
            _id: updatedUser._id,
            username: updatedUser.username,
            bio: updatedUser.bio,
            avatarUrl: updatedUser.avatarUrl
        };
        res.status(200).json({ user: userResponse });
    } catch (error) {
        console.error("Error in updateProfile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}