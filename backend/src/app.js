import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import dotenv from "dotenv";
import formRouter from "./routes/form.route.js";
// import paymentRouter from "./routes/payment.route.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: [process.env.CORS_ORIGIN || "http://localhost:5173"],
    credentials: true,
}));

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Backend is running!' });
});
app.get('/api/auth/signin', (req, res) => {
    res.status(200).json({ message: 'Signin is running!' });
});
app.get('/api/auth/signup', (req, res) => {
    res.status(200).json({ message: 'Signup is running!' });
});

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


app.use("/api/auth", authRouter);
// app.use("/api", paymentRouter);
app.use("/api", formRouter);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server error";
    console.error("Error:", err); 
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});

export { app };