/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from 'express';
import crypto from 'crypto';
import SSLCommerzPayment from 'sslcommerz-lts';
import Payment from './payment.model';
import { getRequestsPayment } from './payment.service';

export const initiatePayment = async (req: Request, res: Response) => {
  const tran_id = crypto.randomUUID();
  const { userEmail, tutorData } = req.body; // Destructure tutor data and user email
  //   console.log("Received Payment Data:", userEmail);
  // console.log("Received Payment Datdda:", tutorData);

  try {
    // Validate the received data
    if (!userEmail || !tutorData || !tutorData.tutorId || !tutorData.name || !tutorData.salary || !tutorData.subject) {
      res.status(400).json({ error: 'Incomplete payment data received.' });
    }

    // Prepare the payment data
    const data = {
      total_amount: tutorData.salary, // Assuming salary as the total price for payment
      currency: 'BDT',
      tran_id: tran_id,
      success_url:`https://tutors-x-new.vercel.app/success/${tran_id}`,
      fail_url: `http://localhost:5000/fail/${tran_id}`,
      cancel_url: 'http://localhost:3030/cancel',
      ipn_url: 'http://localhost:3030/ipn',
      shipping_method: 'Courier',
      product_name: tutorData.name, // Tutor name as the product
      product_category: tutorData.subject, // Subject as the product category
      product_profile: 'general',
      cus_name: 'Customer Name', // Use customer name if available
      cus_email: userEmail, // User email
      cus_add1: 'Dhaka',
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01711111111', // Use customer phone if available
      cus_fax: '01711111111', // Or remove if not needed
      ship_name: 'Customer Name', // Or use actual shipping name
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
    };
    // console.log(data ,"my data")

    const sslcz = new SSLCommerzPayment(
      "hr6799e6efb7586",
      "hr6799e6efb7586@ssl",
      false
    ); // Use environment variables for these keys!

    const apiResponse = await sslcz.init(data);

    if (!apiResponse || !apiResponse.GatewayPageURL) {
      res.status(400).json({ error: 'Failed to initialize payment', details: apiResponse });
    }

    // Save the order data to the database
    const finalOrder = {
      items: tutorData,
      paidStatus: false,
      transaction: tran_id,
      tutorId: tutorData.tutorId,
      tutorName: tutorData.name,
      totalAmount: tutorData.salary,
      userEmail: userEmail,
    };

    const createdOrder = await Payment.create(finalOrder);
    console.log('Order Saved:', createdOrder);

    // Return the payment URL for redirection
    res.json({ url: apiResponse.GatewayPageURL });
  } catch (error: any) {
    // console.error("Payment Error:", error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};


export const getPaymentEmail = async (req: Request, res: Response) => {
  try {
    const { userEmail } = req.params;
    // console.log(userEmail)
    const requests = await getRequestsPayment(userEmail);
    res.json({
      status: true,
      message: "Requests fetched successfully",
      data: requests,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
};
