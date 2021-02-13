const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let purchaseSchema = Schema({
	buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true},
	info: {},
});

module.exports = mongoose.model("Purchase", purchaseSchema);
