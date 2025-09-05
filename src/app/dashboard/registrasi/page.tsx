// app/dashboard/registrasi/page.tsx
import prisma from '@/lib/prisma';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import CourseRegistrationClient from './CourseRegistrationClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function RegistrasiPage() {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    const courses = await prisma.course.findMany();
    const enrollments = userEmail
        ? await prisma.enrollment.findMany({
              where: { user: { email: userEmail } },
              select: { courseId: true },
          })
        : [];

    const enrolledCourseIds = new Set(enrollments.map((e) => e.courseId));

    const coursesWithEnrollmentStatus = courses.map((course) => ({
        ...course,
        isEnrolled: enrolledCourseIds.has(course.id),
    }));

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Registrasi Mata Kuliah</h1>
            <Alert className="mb-6">
                <AlertTitle>Perhatian!</AlertTitle>
                <AlertDescription>
                    Pastikan Anda memilih mata kuliah sesuai dengan kurikulum dan SKS yang
                    diizinkan.
                </AlertDescription>
            </Alert>
            <CourseRegistrationClient courses={coursesWithEnrollmentStatus} />
        </div>
    );
}
