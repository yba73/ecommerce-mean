import * as Yup from 'Yup';

/*===== createProductSchema =====*/
export const createProductSchema = Yup.object().shape({
  title: Yup.string().trim().min(3).max(100).required(),
  description: Yup.string().trim().min(6).max(100).required(),
  image: Yup.string().required(),

  price: Yup.number().required(),
  genre: Yup.string().trim().min(3),
  count: Yup.number().required(),
});
/*=====// createProductSchema //=====*/
