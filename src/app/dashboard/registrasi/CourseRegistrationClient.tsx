'use client';

import { useTransition } from 'react';
import { Course } from '@prisma/client';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { enrollCourse } from '@/app/actions';

type CourseWithEnrollment = Course & { isEnrolled: boolean };

interface CourseTableProps {
    courses: CourseWithEnrollment[];
}

export default function CourseRegistrationClient({ courses }: CourseTableProps) {
    const [isPending, startTransition] = useTransition();

    const handleEnroll = (courseId: string) => {
        startTransition(async () => {
            const result = await enrollCourse(courseId);

            if (result?.error) {
                toast.error('Gagal mendaftar', {
                    description: result.error,
                });
            }
            if (result?.success) {
                toast.success('Berhasil mendaftar', {
                    description: result.success,
                });
            }
        });
    };

    return (
        <Table>
            <TableCaption>Daftar mata kuliah yang ditawarkan semester ini.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Kode</TableHead>
                    <TableHead>Nama Mata Kuliah</TableHead>
                    <TableHead>SKS</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {courses.map((course) => (
                    <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.code}</TableCell>
                        <TableCell>{course.name}</TableCell>
                        <TableCell>{course.credits}</TableCell>
                        <TableCell className="text-right">
                            <Button
                                size="sm"
                                onClick={() => handleEnroll(course.id)}
                                disabled={isPending || course.isEnrolled}
                            >
                                {isPending
                                    ? 'Mendaftar...'
                                    : course.isEnrolled
                                    ? 'Terdaftar'
                                    : 'Daftar'}
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
