import { model, Schema } from "mongoose";
import { IRequest } from "./request.interface";


const requestSchema = new Schema<IRequest>({
    tutorId: {
        type: String,
        required: [true, 'Please provide your id'],
    },
    userEmail: {
        type: String,
        required: [true, 'Please provide your email'],
    },

    status: {
        type: String,
        default: "panding"
    }

});


const RequestTutor = model<IRequest>('request', requestSchema)
export default RequestTutor
