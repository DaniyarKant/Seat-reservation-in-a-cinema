import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import moviesRoutes from "./routes/movies.js";
import showtimeRoutes from "./routes/showtimes.js";
import seatsRouter from "./routes/seats.js";
import reservationsRouter from "./routes/reservations.js";
import userRouter from "./routes/user.js";

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Set the correct origin here
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", true); // Allow credentials (cookies)
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", authRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/showtimes", showtimeRoutes);
app.use("/api/seats", seatsRouter);
app.use("/api/reservations", reservationsRouter);
app.use("/api/user", userRouter);

app.listen(8800, () => {
    console.log("Backend working");
});
