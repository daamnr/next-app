import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Main from "@/components/Dashboard/Main";


export const metadata: Metadata = {
  title:
    "Next.js Dashboard",
  description: "Hello Next",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Main />
      </DefaultLayout>
    </>
  );
}
