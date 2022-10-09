import { createError } from "../middlewares/error.js";
import User from "../models/User.js";
import bcrypt from 'bcryptjs';

export const updateUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const { password, ...others } = req.body
            const salt = bcrypt.genSaltSync(10);
            const hashedpassword = bcrypt.hashSync(req.body.password, salt);
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: { password: hashedpassword, ...others }
            }, { new: true });
            res.status(200).json({
                success: true,
                message: "Account updated successfully",
                user: updatedUser
            });
        } catch (error) {
            next(error);
        }
    } else {
        return next(createError(403, "You can update only your account"));
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({
                success: true,
                message: "Account deleted successfully",
            });
        } catch (error) {
            next(error);
        }
    } else {
        return next(createError(403, "You can delete only your account"));
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const { password, ...others } = user._doc;
        res.status(200).json({
            success: true,
            message: "Account fetched successfully",
            json: others
        });
    } catch (error) {
        next(error);
    }
}