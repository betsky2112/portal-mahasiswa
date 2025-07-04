import prisma from '@/lib/prisma';
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default async function RegistrasiPage() {
    const courses = await prisma.course.findMany();

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
                                <Button size="sm">Daftar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
