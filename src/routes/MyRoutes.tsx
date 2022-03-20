import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreatePost from '../pages/CreatePost/CreatePost';
import EditPost from '../pages/EditPost/EditPost';
import Home from '../pages/Home/Home';
import Index from '../pages/Login/Login';
import PostDetailsPage from '../pages/PostDetails/PostDetails';
import Sighup from '../pages/Signup/Sighup';
import UpdateAccount from '../pages/UpdateAccount/UpdateAccount';
import PrivateRoute from './PrivateRoute';

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Index />} />
        <Route path="/signup" element={<Sighup />} />
        <Route path="*" element={<Index />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-post"
          element={
            <PrivateRoute>
              <CreatePost />
            </PrivateRoute>
          }
        />
        <Route
          path="/post-details/:id"
          element={
            <PrivateRoute>
              <PostDetailsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-post/:id"
          element={
            <PrivateRoute>
              <EditPost />
            </PrivateRoute>
          }
        />
        <Route
          path="/update-account"
          element={
            <PrivateRoute>
              <UpdateAccount />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
