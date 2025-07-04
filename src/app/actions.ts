'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';

export async function enrollCourse(courseId: string) {
    if (!courseId || typeof courseId !== 'string') {
        return { error: 'ID mata kuliah tidak valid.' };
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return { error: 'Anda harus login untuk mendaftar.' };
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return { error: 'User tidak ditemukan.' };
        }

        const course = await prisma.course.findUnique({
            where: { id: courseId },
        });

        if (!course) {
            return { error: 'Mata kuliah tidak ditemukan.' };
        }

        await prisma.enrollment.create({
            data: {
                userId: user.id,
                courseId: courseId,
            },
        });

        revalidatePath('/dashboard/registrasi');

        return { success: 'Berhasil mendaftar!' };
    } catch (error) {
        console.error('Enrollment error:', error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return { error: 'Anda sudah terdaftar di mata kuliah ini.' };
            }
        }

        return { error: 'Gagal mendaftar mata kuliah. Silakan coba lagi.' };
    }
}
