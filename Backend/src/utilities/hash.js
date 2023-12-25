import bcrypt from "bcrypt";

export function hash(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync());
}

export function compare(raw, hash) {
	return bcrypt.compareSync(raw, hash);
}
