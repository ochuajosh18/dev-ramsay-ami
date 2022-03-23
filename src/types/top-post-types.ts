// for table
export type TopPostTypes = {
  index: number;
  id?: string;
  title: string;
  media: string;
  datePosted: Date | null;
  status: "Enable" | "Disable";
};
