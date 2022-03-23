import * as yup from "yup";

export type MostPopularInputs = {
  title: string;
  file?: string | null; // this is for the future
  body?: string | null;
  datePosted: string | null;
  enabled: boolean;
};

export const initialValues: MostPopularInputs = {
  title: "",
  file: null,
  body: "",
  datePosted: null,
  enabled: false,
};

export const mostPopularSchema = yup
  .object({
    title: yup.string().required("Title is required.").trim(),
    file: yup
      .string()
      .nullable()
      .required("An image or video attachment is required."),
    datePosted: yup.string().nullable().required("Date is required.").trim(),
    body: yup.string(),
    enable: yup.boolean(),
  })
  .required();
