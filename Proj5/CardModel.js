const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Mixed = mongoose.Schema.Types.Mixed;

let cardSchema = Schema({

	artist: {
		type: String
	},
	attack: {
		type: Number
	},
	cardClass: {
		type: String
	},
	health: {
		type: Number
	},
	name: {
		type: String
	},
	rarity: {
		type: String
	}
});

module.exports = mongoose.model("Card", cardSchema);
