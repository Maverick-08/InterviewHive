export interface UserRegistrationDetails {
  email: string;
  username: string;
  password?: string|null;
  yearOfPassingOut?: number|null;
  courseId?: string;
  avatar?:string;
  otp?:string;
}

export interface UserDetails extends UserRegistrationDetails{
  id: string;
  createdAt: Date;
  xHandle?: string | null ;
  linkedIn?: string | null;
}

