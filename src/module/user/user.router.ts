import { Router } from 'express'
import { userController } from './user.controller'


const userRouter = Router()

userRouter.post('/create-user', userController.createUser)
userRouter.get('/get/:userId', userController.getSingleUser)
userRouter.put("/:email", userController.updateUser);
userRouter.get('/', userController.getUser)



export default userRouter