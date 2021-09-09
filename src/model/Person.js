const Mongoose = require("mongoose");
const Schema = Mongoose.Schema(
    {
        firstname: String,
        lastname: String,
    },
    { timestamps: true }

);


const PersonModel = Mongoose.model("person", Schema);

module.exports = PersonModel;