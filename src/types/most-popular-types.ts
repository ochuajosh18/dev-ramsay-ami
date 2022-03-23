export type MostPopular = {
  index: number;
  id?: string | number;
  title: string;
  fileUrl: string;
  datePosted: Date | null;
  status: "Enable" | "Disable";
};
