import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import AdminLayout from "./layout/AdminLayout";
import Authlayout from "./layout/Authlayout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import VerifyAccount from "./pages/VerifyAccount";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import ManagePatients from "./pages/ManagePatients";



function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Authlayout />}>
              <Route index element={<Login />} />
              <Route path="sign-up" element={<SignUp />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="forget-password/:token" element={<NewPassword />} />
              <Route path="verify/:token" element={<VerifyAccount />} />
            </Route>
            <Route path="/admin" element={<AdminLayout/>}>
                <Route index element={<ManagePatients/>}/>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
