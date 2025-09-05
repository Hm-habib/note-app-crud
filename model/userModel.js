const { Schema, default: mongoose } = require("mongoose");
const { encryptPassword } = require('../utilities/passwordEncrypt')

const userSchema = new Schema({
  userName: { type: String,  unique: true, required: true },
  Email: {
    type: String,
    required: [true, "Please provide your Email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email address",
    ],
    unique: true,
  },
  Password: { type: String, required: true, minLength: 6, maxLength: 16 },
  phoneNumber: String,
  Address: String,
});

// before password save database is not modified then next
userSchema.pre("save", async function (next) {
  if (!this.isModified("Password")) return next();
// encrypt the Password using bcrypt on the function encryptPassword
  this.Password = await encryptPassword(this.Password)
  next();
});

const userModel = mongoose.model("noteUsers", userSchema);
module.exports = userModel;
