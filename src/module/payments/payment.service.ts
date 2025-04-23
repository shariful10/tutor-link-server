import Payment from "./payment.model";

export const getRequestsPayment = async (userEmail: string) => {
    try {
      const requests = await Payment.find({ userEmail }).exec();
      // console.log(requests, "email");
      return requests;
    } catch (error) {
      console.error("Error fetching requests:", error);
      throw new Error("Failed to fetch requests for the student.");
    }
  };
