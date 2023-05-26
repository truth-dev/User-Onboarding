import * as yup from 'yup';

const formSchema = yup.object().shape({
    username: yup
    .string()
    .trim()
    .required('username is a must!')
    .min(6, 'Username must be 6 characters long'),

    email: yup
    .string()
    .email('Must enter a valid email address')
    .required("You've have forgotten an email"),

    password: yup
    .string()
    .required('oops password is required!')
    .min(8, 'password must be 8 charcters long!'),

    tos: yup
    .boolean()
    .oneOf([true], 'must accept the terms and conditions!!')

   



    
})
export default formSchema;