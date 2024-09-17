import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("لطفا یک ایمیل معتبر استفاده نمایید.")
    .required("لطفا برای ورود به حساب ایمیل خود را قرار دهید."),
  password: yup
    .string()
    .min(8, "رمز عبور باید حداقل 8 کارکتر باشد.")
    .required("لطفا برای ورود به حساب رمز عبور خود را قرار دهید."),
});

export const signupSchema = yup.object().shape({
  name: yup.string().required("برای ساخت حساب نام کاربری الزامی است."),
  email: yup.string().email("لطفا یک ایمیل معتبر استفاده نمایید.").required("برای ساخت حساب ایمیل خود را قرار دهید."),
  password: yup
    .string()
    .min(8, "رمز عبور باید حداقل 8 کارکتر باشد.")
    .required("لطفا برای ساخت حساب رمز عبور خود را قرار دهید."),
});
