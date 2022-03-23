import * as yup from "yup";

export type ArticleInputs = {
  title: string;
  media?: File | string | null;
  content?: string | null;
  datePosted: string | null;
  isEnabled: boolean;
};

export const initialValues: ArticleInputs = {
  title: "",
  media: null,
  content: "",
  datePosted: null,
  isEnabled: false,
};

export const articleSchema = yup
  .object({
    title: yup.string().required("Title is required.").trim(),
    media: yup
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

export const articleUpdateSchema = yup
  .object({
    title: yup.string().required("Title is required.").trim(),
    media: yup.mixed(),
    datePosted: yup
      .string()
      .nullable()
      .required("Date posted is required.")
      .trim(),
    content: yup.string(),
    isEnabled: yup.boolean(),
  })
  .required();
