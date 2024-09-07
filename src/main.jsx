import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.js";

import {
  Login,
  SignUp,
  AuthLayout,
  PageNotFound,
  Home,
  Feed,
  GuestTweets
} from "./components/index.js";

import FeedVideos from "./pages/FeedVideos.jsx";
import FeedTweets from "./pages/FeedTweets.jsx";






const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />}>
        <Route path="" element={<Feed />}>
          {/* Home Page Feed Videos */}
          <Route path="" element={<FeedVideos />} />
        </Route>

         {/* Home Page Feed Tweets */}
        <Route
            path="tweets"
            element={
              <AuthLayout authentication guestComponent={<GuestTweets />}>
                <FeedTweets />
              </AuthLayout>
            }
          />
      </Route>

      {/* Login  */}
      <Route
        path="/login"
        element={
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        }
      />

      {/* Sign up */}
      <Route
        path="/signup"
        element={
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        }
      />

      {/* 404 */}
      <Route path="*" element={<PageNotFound />} />
    </Route>



  ));

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);