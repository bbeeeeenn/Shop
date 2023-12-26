import { Router } from "express";
import { hash, compare } from "../utilities/hash.js";
import mongoose from "mongoose";
import User from "../utilities/models/userModel.js";

const router = Router();

// Fetch accounts.
router.get("/accounts", async (req, res) => {
	res.send(await User.find());
});

// Register
router.post("/register", async (req, res) => {
	const { username, password } = req.body;

	// Return if either username or password are undefined.
	if (!username || !password) {
		return res.status(400).send("Please provide both username and password.");
	}

	// Return if mininum username&password length not reached.
	else if (username.length < 5 || password.length < 8) {
		return res
			.status(400)
			.send("Your username/password must be at least 5/8 characters long.");
	}

	// Return if username&password input is the same.
	else if (username === password) {
		return res
			.status(400)
			.send("Username and Password must not be the same.");
	}

	try {
		// Return if username already exists.
		if (await User.findOne({ username: username })) {
			return res.status(403).send("Username already exists.");
		}

		// Register the account
		const createdAccount = await new User({
			username: username,
			password: hash(password),
		}).save();
		res.send("Account Registered.");
	} catch (err) {
		res.send("Something went wrong.");
	}
});

router.post("/login", async (req, res) => {
	const { username, password } = req.body;

	// Return if either username and password are undefined.
	if (!username || !password) {
		return res.send("Username and password required.");
	}

	// Find the account and store in variable.
	const foundAccount = await User.findOne({ username: username });

	// Return if username doesn't exists.
	if (!foundAccount) {
		return res.send("Username doesn't exists.");
	}

	// Return if invalid password.
	if (!compare(password, foundAccount.password)) {
		return res.send("Incorrect password.");
	}

	// Authorize
	res.send("Logged in");
});

export default router;
