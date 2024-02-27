import * as Yup from 'Yup';
/*===== registerSchema =====*/
export const registerSchema = Yup.object().shape({
  email: Yup.string().trim().min(6).max(100).email().required(),
  username: Yup.string().trim().min(4).max(100).required(),

  password: Yup.string().trim().min(6).max(100).required(),
});
/*=====// registerSchema //=====*/
/*===== loginSchema =====*/
export const loginSchema = Yup.object().shape({
  email: Yup.string().trim().min(6).max(100).email().required(),
  password: Yup.string().trim().min(6).max(100).required(),
});
/*=====// loginSchema //=====*/
