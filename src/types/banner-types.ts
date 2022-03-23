// for table
export type PrimaryBanner = {
  index: number;
  id?: string;
  title: string;
  media: string;
  datePosted: Date | null;
  status: "Enable" | "Disable";
};
