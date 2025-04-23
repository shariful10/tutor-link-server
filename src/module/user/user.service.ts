import { IUser } from './user.interface'
import User from './user.model'


const createUser = async (payload: IUser): Promise<IUser> => {
  const result = await User.create(payload)

  return result
}

const getUser = async () => {
  const result = await User.find({role:"tutor"})
  return result
}

const getSingleUser = async (id: string) => {
  const result = await User.findById(id)
  return result
}


const updateUser = async (email: string, data: IUser) => {
  console.log(data)
  const result = await User.findOneAndUpdate(
    { email },
    { $set: data},
    { new: true,runValidators:true }
  );
  return result;
};




export const userService = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
}
