import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import InfoCard from '@/components/ui/InfoCard';

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email ?? '',
        },
    });

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Profil Mahasiswa</h1>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Informasi Akun</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Detail personal dan informasi akun Anda.
                    </p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <InfoCard label="Nama Lengkap" value={user?.name} />
                        <InfoCard label="Alamat Email" value={user?.email} />
                        <InfoCard
                            label="Terdaftar Sejak"
                            value={user?.createdAt.toLocaleDateString('id-ID', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        />
                    </dl>
                </div>
            </div>
        </div>
    );
}
