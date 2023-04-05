import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { UserContextProvider } from '../../contexts/UserContext';
import { PostContextProvider } from '../../contexts/PostContext';
import { AuthContextProvider, SetupUser } from '../../contexts/AuthContext';
import { Navbar } from '../Navbar/Navbar';

import 'react-toastify/dist/ReactToastify.css';
import { CreatePostModal } from '../CreatePostModal/CreatePostModal';
import { usePost } from '../../hooks/usePost';

export function CommonLayout() {
  return (
    <UserContextProvider>
      <AuthContextProvider>
        <PostContextProvider>
          <main className='body'>
            <Outlet />
            <SetupUser />
            <ToastContainer />
          </main>
        </PostContextProvider>
      </AuthContextProvider>
    </UserContextProvider>
  );
}

export function FeedLayout() {
  return (
    <>
      <Navbar />
      <main className='body'>
        <Outlet />
        <CreatePostModal />
        <ToastContainer />
      </main>
    </>
  );
}
