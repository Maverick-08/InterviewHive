import { PrismaClient } from "@prisma/client";
import { CourseSpecs } from "../interface/interface.course";

export class Course {
  public courseId: string;
  public courseName: string;
  public branchName: string;
  private static prisma: PrismaClient;

  constructor({ courseId, courseName, branchName }: CourseSpecs) {
    this.courseId = courseId;
    this.courseName = courseName;
    this.branchName = branchName;
  }

  static getPrismaClient() {
    if (!this.prisma) {
      this.prisma = new PrismaClient();
    }

    return this.prisma;
  }

  static async getCourseDetails({ courseId }: { courseId: string }) {
    const prisma = this.getPrismaClient();

    const courseDetails = await prisma.course.findFirst({
      where: {
        courseId,
      },
    });

    return courseDetails ? new Course({ ...courseDetails }) : null;
  }

}
