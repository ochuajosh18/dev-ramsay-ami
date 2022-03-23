// for table
export type LatestVideo = {
  index: number;
  id?: string;
  title: string;
  media: string;
  datePosted: Date | null;
  status: "Enable" | "Disable";
};
