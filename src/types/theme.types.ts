export interface Link {
    id: string;
    link: URL;
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