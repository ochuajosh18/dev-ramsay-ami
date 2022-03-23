export type TableColumn = {
  id: string;
  label: string;
  property?: string;
  key?: number | string;
  content?: (item: any, index: number) => void;
  sortable?: boolean;
  width?: number;
  flex?: number;
  minWidth?: number;
};

export type Order = "asc" | "desc";
export type SortColumn = { path: string; order: Order };
export type TableOwnProps = {
  rowsPerPage: number;
  searchKeyword: string;
};
