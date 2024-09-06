import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import Profile from "./pages/User/Profile.jsx";
import store from "./redux/store.js";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute"; // Đảm bảo bạn đã xuất PrivateRoute đúng cách
// Auth
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// Cấu hình router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Registered users */}
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Route>
  )
);

// Render ứng dụng
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PayPalScriptProvider>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
);
