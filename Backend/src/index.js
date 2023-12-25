import express, { json } from "express";
import router from "./routes/auth.js";

const app = express();
app.use(json());

app.use("/auth", router);

const PORT = 3000;

// -------------------------
async function start() {
	app.listen(PORT, () => {
		console.log(`App listening on port ${PORT}`);
	});
}
start();
