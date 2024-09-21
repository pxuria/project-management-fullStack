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

export const taskSchema = yup.object().shape({
  name: yup.string().required("نام تسک الزامی است"),
});

export const projectSchema = yup.object().shape({
  name: yup.string().required("نام پروژه الزامی است"),
  description: yup.string().required("توضیحات پروژه الزامی است"),
  technologies: yup
    .array()
    .of(yup.string().required("هر تکنولوژی باید به صورت صحیح وارد شود"))
    .min(1, "حداقل یک تکنولوژی باید وارد شود")
    .required("تکنولوژی‌ها الزامی هستند"),
  deadline: yup.date().required("تاریخ پایان پروژه الزامی است").min(new Date(), "تاریخ پایان پروژه باید در آینده باشد"),
  users: yup.array().min(1, "حداقل یک کاربر باید وارد شود").required("کاربران الزامی هستند"),
  isDone: yup.boolean().notRequired(),
});
