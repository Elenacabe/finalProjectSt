const { Schema, model } = require("mongoose")
const validateAge = require("../utils/validateAge")

//pasar a utils?


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
    birthDate: {
      type: Date,
      required: true,
      validate: [validateAge, 'Debes tener al menos 18 años.']
    },
    avatar: {
      type: String,
      default: "https://shorturl.at/kowxI"
    },
    about: {
      type: String,
      default: 'Descripción no aportada',
      minLength: [10, 'Debes escribir al menos 10 caracteres']
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER'
    },
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    password: {
      type: String,
      required: [true, 'La contraseña es requerida']
    }
  },
  {

    timestamps: true
  }
)

const User = model("User", userSchema)

module.exports = User

