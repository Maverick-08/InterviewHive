import { PrismaClient } from "@prisma/client";
import { CourseSpecs } from "../interface/interface.course";
const prisma = new PrismaClient();

export class Course {
  public courseInitials: string;
  public degree: string;
  public branch: string|null;

  constructor({ courseInitials, degree, branch }:CourseSpecs) {
    this.courseInitials = courseInitials;
    this.degree = degree;
    this.branch = branch;
  }

  public static async getCourseInfo(courseId:string){
    const courseInfo = await prisma.course.findFirst({where:{id:courseId}});
    if(courseInfo){
      return new Course({courseInitials:courseInfo.courseInitials,degree:courseInfo.degree,branch:courseInfo.branch});
    }
    else{
      return null;
    }
  }

}
