// req and res manage
import { Request, Response } from 'express'
import { userService } from './user.service'


const createUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body
    const result = await userService.createUser(payload)

    res.json({
      status: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    })
  }
}


const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUser()

    res.send({
      status: true,
      message: 'Users getting successfully',
      result,
    })
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    })
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  try {
    // console.log(req.params)
    const userId = req.params.userId
    const result = await userService.getSingleUser(userId)
    res.send({
      status: true,
      message: 'User getting successfully',
      result,
    })
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    })
  }
}

const updateUser = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const body = req.body;
    const result = await userService.updateUser(email, body);
    if (!result) {
      res.status(404).json({
        status: false,
        message: 'User not found',
      });
    }

    res.send({
      status: true,
      message: 'User updated successfully',
      result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
};

export const userController = {
  createUser,
  getUser,
  getSingleUser,
  updateUser
}
