import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import noteRoutes from "./routes/notes.js"
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();

const connect = async () => {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("MongoDB connected");
    }).catch((error) => {
        throw error;
    })
};


app.use(cookieParser());
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/notes', noteRoutes);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message
    })
})

app.listen(process.env.PORT, () => {
    connect();
    console.log("Server is running on port", process.env.PORT);
})