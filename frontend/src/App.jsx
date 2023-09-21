import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authlayout from "./layout/Authlayout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import VerifyAccount from "./pages/VerifyAccount";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authlayout />}>
              <Route index element={<Login/>}/>
              <Route path="sign-up" element={<SignUp/>}/>
              <Route path="forgot-password"  element={<ForgotPassword/>}/>
              <Route path="verify/:id"  element={<VerifyAccount/>}/>
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
