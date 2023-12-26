import { Router } from "express";
import { Item } from "../utilities/models.js";

const router = Router();

router.use((req, res, next) => {
	if (req.session.role !== "admin") {
		return res.send("You are not an admin.");
	}
});

router.post("admin/add", async (req, res) => {
	const { name, stocks, price } = req.body;
	if (!name || !price) {
		return res.sendStatus(400);
	}

	try {
		await Item.create({
			name,
			stocks,
			price,
		});
		res.send("Created.");
	} catch (err) {
		res.send("Something went wrong.");
	}
});

export default router;
