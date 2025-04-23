export interface IUser {
  name: string
  email: string
  password: string
  role: 'student' | 'tutor'
  userStatus: string
  // update
  photo: string;
  bio: string;
  phone: string;
  salary: string;
  availableDays: string;
  tuitionStyle?: string;
  experience: string;
  subject: string;
  rating: number;
  class: string;
  location: string;
  PreferredTeach: string;
  tuition:string

}