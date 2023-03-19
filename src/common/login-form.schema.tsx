import * as yup from 'yup';

export const LOGIN_SCHEMA = yup
  .object({
    email: yup.string().required().email(),
    password: yup.string().required(),
  })
  .required();