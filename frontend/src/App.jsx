import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authlayout from "./layout/Authlayout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import VerifyAccount from "./pages/VerifyAccount";
import ForgotPassword from "./pages/ForgotPassword";
import newPassword from "./pages/newPassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authlayout />}>
              <Route index element={<Login/>}/>
              <Route path="sign-up" element={<SignUp/>}/>
              <Route path="forgot-password"  element={<ForgotPassword/>}/>
              <Route path="forgot-password/:token"  element={<newPassword/>}/>
              <Route path="verify/:token"  element={<VerifyAccount/>}/>
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
