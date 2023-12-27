import { Router } from "express";
import { Item } from "../utilities/models.js";

const router = Router();

// ---------------------------------------------|
// ---------------User Routes-------------------|
// ---------------------------------------------|

// 1. Item List
router.get("/items", async (req, res) => {
	try {
		res.send(await Item.find({}, { __v: 0 }));
	} catch (err) {
		res.status(500).send("Something went wrong.");
	}
});

// ---------------------------------------------|
// ---------------Admin Routes------------------|
// ---------------------------------------------|

router.use((req, res, next) => {
	if (req.session.role !== "admin") {
		return res.status(401).send("You are not an admin.");
	}
	next();
});

// 1. Add Items
router.post("/admin/add", async (req, res) => {
	const { name, stocks, price } = req.body;
	if (!name || !price) {
		return res.status(400).send("Name and Price required.");
	}

	try {
		await Item.create({
			name,
			stocks,
			price,
		});
		res.send("Created.");
	} catch (err) {
		res.status(500).send("Something went wrong.");
	}
});

// 2. Remove Items
router.delete("/admin/delete/:id", async (req, res) => {
	const { id } = req.params;
	try {
		await Item.findByIdAndDelete(id);
		res.send("Deleted.");
	} catch (err) {
		res.status(500).send("Something went wrong.");
	}
});

export default router;
