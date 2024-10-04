export interface Link {
  id: string;
  link: string;
  imgUrl?: string;
  title: string;
  publishedDate: Date | null;
  sourceCountry: string;
}

export enum ThemeStatus {
  PENDING = "Pending",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
}
export interface Theme {
  id: string;
  title: string;
  keywords: string;
  status: ThemeStatus;
  links: Link[];
  createdAt: Date;
  updatedAt: Date;
}
