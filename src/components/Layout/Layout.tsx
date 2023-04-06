import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { UserContextProvider } from '../../contexts/UserContext';
import { PostContextProvider, SetupPosts } from '../../contexts/PostContext';
import { AuthContextProvider, SetupUser } from '../../contexts/AuthContext';
import { CreatePostModal } from '../CreatePostModal/CreatePostModal';
import { Navbar } from '../Navbar/Navbar';

import 'react-toastify/dist/ReactToastify.css';

export function CommonLayout() {
  return (
    <UserContextProvider>
      <AuthContextProvider>
        <PostContextProvider>
          <main className='body'>
            <Outlet />
            <SetupUser />
            <SetupPosts />
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
