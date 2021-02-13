const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Mixed = mongoose.Schema.Types.Mixed;

let userSchema = Schema({

	username: {
		type: Mixed,
		required: true,
		minlength: 1,
		unique : [true, "Username is already taken. Try again."]
	},
	password: {
		type: Mixed,
		required: true,
		minlength: 1
	},
	privacy: {
		type: Boolean,
		default: false
	}
});


module.exports = mongoose.model("User", userSchema);
