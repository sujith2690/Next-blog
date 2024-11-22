import * as Yup from 'yup'

export const signUpSchema = Yup.object({
    userName: Yup.string().min(3).max(25).required("Please enter your name"),
    email: Yup.string().email().required("Please enter your Email"),
    password: Yup.string().min(3).required("Please enter your Password"),
    confirmPassword: Yup.string()
    .required("Please confirm your Password")
    .oneOf([Yup.ref('password')], "Passwords must match"),
});
export const loginSchema = Yup.object({
    email: Yup.string().email().required("Please enter your Email"),
    password: Yup.string().min(3).required("Please enter your Password"),
})
