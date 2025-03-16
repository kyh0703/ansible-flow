import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <main className='flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 p-4'>
      <Outlet />
    </main>
  );
}
