import express from 'express';

import { getPaymentEmail, initiatePayment,  } from './payment.controller';
import catchAsync from '../../utils/catchAsync';



const paymentRouter = express.Router();


paymentRouter.get('/payment/:userEmail',getPaymentEmail);
paymentRouter.post('/payment', catchAsync(initiatePayment));



export default paymentRouter;