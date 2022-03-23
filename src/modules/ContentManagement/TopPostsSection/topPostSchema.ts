import * as yup from "yup";

export type TopPostInputs = {
  title: string;
  file?: File | null;
  content?: string | null;
  datePosted: string | null;
  isEnabled: boolean;
};

export const initialValues: TopPostInputs = {
  title: "",
  file: null,
  content: "",
  datePosted: null,
  isEnabled: false,
};

export const topPostSchema = yup
  .object({
    title: yup.string().required("Title is required.").trim(),
    file: yup
      .mixed()
      .nullable()
      .required("An image or video attachment is required."),
    datePosted: yup
      .string()
      .nullable()
      .required("Date posted is required.")
      .trim(),
    content: yup.string(),
    isEnabled: yup.boolean(),
  })
  .required();

export const topPostUpdateSchema = yup
  .object({
    title: yup.string().required("Title is required.").trim(),
    file: yup.mixed(),
    datePosted: yup
      .string()
      .nullable()
      .required("Date posted is required.")
      .trim(),
    content: yup.string(),
    isEnabled: yup.boolean(),
  })
  .required();
