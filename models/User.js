const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true,
    },
    encrypted_password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
  },
  { timestamps: true }
);

// Virtual Fields
userSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = bcrypt.genSaltSync(10);
    this.encrypted_password = bcrypt.hashSync(password, this.salt);
    console.log('salt', this.salt);
    console.log('password', this.encrypted_password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.encrypted_password);
  },
};

module.exports = mongoose.model('User', userSchema, 'users');
