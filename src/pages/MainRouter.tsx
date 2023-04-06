import { Routes, Route, BrowserRouter } from 'react-router-dom';
import {
  FEED_URL,
  REGISTER_URL,
  LOGIN_URL,
  PROFILE_URL,
  MY_PROFILE_URL,
} from '../lib/routes';
import { PublicRoute } from '../components/PublicRoute/PublicRoute';
import { CommonLayout, FeedLayout } from '../components/Layout/Layout';
import { NotFoundPage } from './NotFoundPage/NotFoundPage';
// import { PrivateRoute } from '../components/PrivateRoute/PrivateRoute';
import { FeedPage } from './FeedPage/FeedPage';
import { RegisterPage } from './RegisterPage/RegisterPage';
import { LoginPage } from './LoginPage/LoginPage';
import { ProfilePage } from './ProfilePage/ProfilePage';
import { PrivateRoute } from '../components/PrivateRoute/PrivateRoute';

export function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<CommonLayout />}>
          <Route element={<FeedLayout />}>
            <Route path={FEED_URL} element={<FeedPage />} />
            <Route
              path={MY_PROFILE_URL}
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route path={PROFILE_URL()} element={<ProfilePage />} />
          </Route>

          <Route
            path={REGISTER_URL}
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />

          <Route
            path={LOGIN_URL}
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
        </Route>

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
