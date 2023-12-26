import express, { json } from "express";
import session from "express-session";
import mongoose from "mongoose";
import cors from "cors";

import authRoute from "./routes/auth.js";
import shopRoute from "./routes/shop.js";

const app = express();
app.use(json());
app.use(cors());
app.use(
	session({
		secret: "ASDASDASDASDASD",
		resave: false,
		saveUninitialized: false,
	})
);

// Auth route
app.use("/auth", authRoute);

// Block if not logged-in
app.use((req, res, next) => {
	if (!req.session.user) {
		return res.send("You are not logged in.");
	} else {
		next();
	}
});

// Shop route
app.use("/shop", shopRoute);

// -------------------------
async function start(PORT = 3000) {
	try {
		await mongoose.connect("mongodb://127.0.0.1:27017/shop");
		console.log(`Connected to the database.`);
	} catch (err) {
		console.log(`Can't connnect to the database.`);
	}
	app.listen(PORT, () => {
		console.log(`App listening on port ${PORT}.`);
	});
}
start();
