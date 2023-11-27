const { Schema, model, SchemaType } = require("mongoose")

//pasar a utils?
const validateAge = function (value) {
  const currentDate = new Date()
  const birthdate = new Date(value)
  const age = currentDate.getFullYear() - birthdate.getFullYear()
  if (age < 18) {
    throw new Error('Age must be at least 18 years old.')
  }
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true

    },
    // name: {
    //   type: String,
    //   trim: true,
    //   required: true
    // },
    birthDate: {
      type: Date,
      required: true,
      validate: [validateAge, 'Invalid birthdate. User must be at least 18 years old.']
    },
    avatar: {
      type: String,
      default: ""

    },
    about: {
      type: String,
      default: 'Soy la descrpción',
      minLength: [10, 'You have to write at least 10 chars']

    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER'
    },
    // contest: {

    // },
    stories: [{
      type: Schema.Types.ObjectId,
      ref: 'Story'

    }],
    following: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    password: {
      type: String,
      required: [true, 'Password is required.']
    }
  },
  {

    timestamps: true
  }
)

const User = model("User", userSchema)

module.exports = User
