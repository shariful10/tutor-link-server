export interface IReview {
    tutorId:string
    name: string;
    email: string;
    review: string;
    comment: string;
    createdAt?: Date;
    updatedAt?: Date;
  }