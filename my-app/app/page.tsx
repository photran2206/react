import Image from 'next/image';
import Users from '@/app/pages/users';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Users />
    </main>
  )
}
