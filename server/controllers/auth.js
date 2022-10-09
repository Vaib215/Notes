import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { createError } from '../middlewares/error.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password });
        await newUser.save();
        res.status(200).send("New account has been created");
    } catch (err) {
        next(err);
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return next(createError(404, "User not found!"));
        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isCorrect) return next(createError(400,"Wrong Credentials!"));
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
        const {password, ...others} = user._doc;
        res.status(200).json({...others,"token":token});
    } catch (err) {
        next(err);
    }
}