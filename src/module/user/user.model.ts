import { model, Schema } from 'mongoose'
import { IUser } from './user.interface'
import config from '../../config';
import bcrypt from 'bcrypt'

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    select: false
  },
  role: {
    type: String,
    enum: ['student', 'tutor'],
    required: true,
  },
  userStatus: {
    type: String,
    default: 'active',
  },
  bio: {
    type: String,
  },
  photo: {
    type: String,
  },
  phone: {
    type: String,
  },
  salary: {
    type: String,
  },
  tuition: {
    type: String,
    default: "Available"
  },
  PreferredTeach: {
    type: String,
  },
  tuitionStyle: {
    type: String,
    default: "online"
  },
  location: {
    type: String,
  },
  experience: {
    type: String,
  },
  subject: {
    type: String,
  },
  availableDays: {
    type: String,
  },
  class: {
    type: String
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },

});


userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  )
  next()
})
// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

const User = model<IUser>('User', userSchema)
export default User
