import { model, Schema } from 'mongoose';

// Order Schema (Updated)
const OrderSchema = new Schema(
  {
    userEmail: {
      type: String,
    },

      tutorId: {
        type: String,
      },
      tutorName: {
        type: String,
      },
      salary: {
        type: Number,
      },
      subject: {
        type: String,
    },
    totalAmount: {
      type: String,

    },
    transaction: {
      type: String,
    },
    paidStatus: {
      type: String,
      default: "paid",
    },
  },
  {
    timestamps: true,
  }
);

const Payment = model('order', OrderSchema);
export default Payment;
