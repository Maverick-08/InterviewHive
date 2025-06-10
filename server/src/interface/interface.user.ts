export interface UserRegistrationDetails {
  email: string;
  password: string;
  username: string;
  yearOfPassingOut: number;
  courseId: string;
}

export interface UserDetails {
  userId: string;
  email: string;
  username: string;
  yearOfPassingOut: number;
  courseId: string;
  createdAt: Date;
  avatar: string;
  xHandle?: string | null ;
  linkedIn?: string | null;
}

