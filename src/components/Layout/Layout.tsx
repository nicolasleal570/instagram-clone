import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <main className='body'>
      <Outlet />
    </main>
  );
}
