import { Link } from 'react-router-dom';
import { FEED_URL } from '../../lib/routes';

export function NotFoundPage() {
  return (
    <div className='grid h-screen w-full place-content-center bg-slate-900'>
      <h1 className='text-6xl font-bold text-white'>NOT FOUND PAGE</h1>
      <Link
        to={FEED_URL}
        className='mx-auto mt-6 rounded-md bg-indigo-400 px-7 py-3.5 text-center text-white hover:bg-indigo-500'
      >
        Volver al inicio
      </Link>
    </div>
  );
}
