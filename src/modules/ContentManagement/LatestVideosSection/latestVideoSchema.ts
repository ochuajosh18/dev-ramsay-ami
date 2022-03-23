import * as yup from "yup";

export type LatestVideoInputs = {
  title: string;
  media: string | null;
  content?: string | null;
  datePosted: string | null;
  isEnabled: boolean;
};

export const initialValues: LatestVideoInputs = {
  title: "",
  media: null,
  content: "",
  datePosted: null,
  isEnabled: false,
};

export const latestVideoSchema = yup
  .object({
    title: yup.string().required("Title is required.").trim(),
    media: yup.string().nullable().required("A video link is required."),
    datePosted: yup
      .string()
      .nullable()
      .required("Date posted is required.")
      .trim(),
    content: yup.string(),
    isEnabled: yup.boolean(),
  })
  .required();

export const latestVideoUpdateSchema = yup
  .object({
    title: yup.string().required("Title is required.").trim(),
    media: yup.string().nullable().required("A video link is required."),
    datePosted: yup
      .string()
      .nullable()
      .required("Date posted is required.")
      .trim(),
    content: yup.string(),
    isEnabled: yup.boolean(),
  })
  .required();
