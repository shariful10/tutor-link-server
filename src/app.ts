import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import authRoute from './module/auth/auth.route'
import paymentRouter from './module/payments/paymentRouter'
import reviewRouter from './module/review/review.router'
import requestRouter from './module/sendRequestTuror/request.router'
import userRouter from './module/user/user.router'

const app = express()
// middleware
app.use(express.json())
app.use(
  cors({ origin: 'https://tutor-link-client0.vercel.app', credentials: true })
)
// router
app.use('/api/user', userRouter)
app.use('/api/auth', authRoute)
app.use('/api/requests', requestRouter)
app.use('/api', paymentRouter)
app.use('/api', reviewRouter)

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live ⚡',
  })
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  // console.log('error from app.ts', err)
  res
    .status(httpStatus.INTERNAL_SERVER_ERROR)
    .json({ success: false, message: err.message, error: err })
})

app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    message: 'Route not found',
  })
})

export default app
