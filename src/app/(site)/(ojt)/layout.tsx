import { ReactNode } from "react";
import Footer from "../../../components/global/Footer";
import HeaderOJT from "@/components/global/header/HeaderOJT";
import MainLayout from "@/components/layout/MainLayout";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <HeaderOJT />
      <MainLayout
        className="items-center"
        wrapperClassName="items-center flex-col w-full p-0"
      >
        {children}
      </MainLayout>
      <Footer />
    </>
  );
}
