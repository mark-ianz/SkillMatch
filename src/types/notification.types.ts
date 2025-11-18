export type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "application" | "message" | "system";
}