import { json } from "express";
import Veterinario from "../models/Veterinario.js";
import { generateJWT } from "../helpers/generateJWT.js";
import { v4 as uuidv4 } from "uuid";
import emailRegister from "../helpers/emailRegister.js";
import recoverPassword from "../helpers/forgotPassword.js";

export const register = async (req, res) => {
  // Agrega la palabra clave async aquí

  const { email,name } = req.body;

  //USUARIOS DUPLICADOS
  const existeUsuario = await Veterinario.findOne({ email });

  if (existeUsuario) {
    const error = new Error("email already in use"); 
    return res.status(400).json({ msg: error.message });
  }
  try {
    const veterinario = new Veterinario(req.body);
    const veterinarioSaved = await veterinario.save();

    //VERIFICAR EMAIL
    emailRegister({
      email,
      name,
      token:veterinarioSaved.token
    })

    res.json(veterinarioSaved);
  } catch (error) {
    console.log(error);
  } 
};

export const profile = (req, res) => {
  const { veterinario } = req;

  res.json(veterinario);
};

export const confirm = async (req, res) => {
  const { token } = req.params;

  const usuarioConfirm = await Veterinario.findOne({ token });
  if (!usuarioConfirm) {
    const error = new Error(`Token not found`);
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuarioConfirm.token = null;
    usuarioConfirm.confirm = true;
    await usuarioConfirm.save();
    res.json({msg:"User verified"});
  } catch (error) {
    console.log(error.message);
  }

  console.log(token);
};

export const authtentication = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Veterinario.findOne({ email });
    if (!user) {
      const error = new Error("User not found");
      return res.status(404).json({ msg: error.message });
    }
    if (!user.confirm) {
      const error = new Error(`your account hasnt been confirmed`);
      return res.status(403).json({ msg: error.message });
    }

    if (await user.checkPassword(password)) {
      return res.json({ token: generateJWT(user.id) });
    } else {
      const error = new Error(`Wrong password`);
      return res.status(403).json({ msg: error.message });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;

  const checkEmail = await Veterinario.findOne({ email });

  if (!checkEmail) {
    const error = new Error("User not found");
    return res.status(404).json({ msg: error.message });
  }
  try {
    checkEmail.token = uuidv4();
    await checkEmail.save();

    //envia email con instrucciones
    recoverPassword({email,name:checkEmail.name,token:checkEmail.token})
    res.json({ msg: `We have sent an email with the instructions` });
  } catch (error) {
    console.log(error.message);
  }
};

export const validatePassword = async (req, res) => {
  const { token } = req.params;

  const checkToken = await Veterinario.findOne({ token });
  console.log(checkToken);
  if (!checkToken) {
    const error = new Error("Token not found");
    return res.status(404).json({ msg: error.message });
  }

  if (checkToken) return res.json({ msg: "Valid token" });
};

export const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const veterinario = await Veterinario.findOne({ token });

  if (!veterinario) {
    const error = new Error(`Vet not found`);
    return res.status(400).json({ msg: error.message });
  }

  try {
    veterinario.token = null;
    veterinario.password = password;
    await veterinario.save();
    res.json({ msg: "Password successfully modified" });
  } catch (error) {
    console.log(error.message);
  }
};


