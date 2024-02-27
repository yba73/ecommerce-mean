import * as Yup from 'Yup';
/*===== sendOrderSchema =====*/
export const sendOrderSchema = Yup.object().shape({
  address: Yup.string().trim().min(6).max(100).required(),
  phone: Yup.number()
    .test(
      'len',
      'A phone number that is less than 12 is required',
      (val: any) => val.toString().length <= 12
    )
    .test(
      'len',
      'A phone number that is greater than 8 is required',
      (val: any) => val.toString().length >= 8
    )
    .required(),
  livraison: Yup.boolean().required(),
});
/*=====// sendOrderSchema //=====*/
