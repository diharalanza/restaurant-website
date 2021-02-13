const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Mixed = mongoose.Schema.Types.Mixed;

let userSchema = Schema({

	username: {
		type: Mixed,
		required: true,
		minlength: 1,
		unique: true
	},
	password: {
		type: Mixed,
		required: true,
		minlength: 1
	},
	friends: [{ type: Mixed, required: false}],
	cards: [Schema.Types.ObjectId],
	friendRequests: [{ type: Mixed, required: false}]
});


module.exports = mongoose.model("User", userSchema);
