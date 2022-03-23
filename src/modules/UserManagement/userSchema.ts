import * as yup from "yup";

export type UserFormInputs = {
  firstname: string;
  lastname: string;
  email: string;
};

export const initialValues: UserFormInputs = {
  firstname: "",
  lastname: "",
  email: "",
};

export const userSchema = yup
  .object({
    firstname: yup.string().required("First name is required.").trim(),
    lastname: yup.string().required("Last name is required.").trim(),
    email: yup
      .string()
      .required("Email is required.")
      .email("Invalid email")
      .trim(),
  })
  .required();
