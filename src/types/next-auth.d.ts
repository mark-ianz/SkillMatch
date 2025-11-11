import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      user_id?: number;
      role_id?: number;
      company_id?: string;
      status_id?: number;
    };
  }

  interface User {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    user_id?: number;
    role_id?: number;
    company_id?: string;
    status_id?: number;
  }
}
