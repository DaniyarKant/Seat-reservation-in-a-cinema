import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const userId = userInfo.id;
        const q = "SELECT id, username, email FROM users WHERE users.id = ?";

        db.query(q, [userId], (err, data) => {
            if (err) return res.status(500).json(err);

            res.status(200).json(data);
        });
    });
};
