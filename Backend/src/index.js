import express, { json } from "express";
import router from "./routes/auth.js";
import session from "express-session";
import mongoose from "mongoose";

const app = express();
app.use(json());
app.use(
	session({
		secret: "ASDASDASDASDASD",
		resave: false,
		saveUninitialized: false,
	})
);

app.use("/auth", router);

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
